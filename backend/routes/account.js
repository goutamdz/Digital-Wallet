// backend/routes/account.js
const express = require('express');
const router = express.Router();
const { Account } = require('../db')
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose');

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        console.log(account);

        res.json({
            balance: account.balance
        })
    }
    catch (err) {
        res.send(err.message)
    }
});

router.post("/transfer",authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    console.log(req.body);

    // Fetch the accounts within the transaction
    console.log(req.userId);
    const account = await Account.findOne({ userId: req.userId }).session(session);
    console.log(to);

    if (!account) {
        await session.abortTransaction();
        return res.status(404).json({
            message: "Account not found"
        });
    }

    if (account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: `Insufficient balance. Current balance: ${account.balance}, requested: ${amount}`
        });
    }

    
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;