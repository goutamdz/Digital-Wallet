const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const {authMiddleware} = require('../middleware')

router.get("/",(req,res)=>{res.send("Tesing user route")})

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
});

//signup & sigin route
router.post('/signup', async (req, res) => {
    const body = req.body;
    console.log(body);
    const { success, error } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({ message: "Client side validation failed", error: error.errors });
    }

    if (!success) {
        return res.json({ message: "Client side validation failed" });
    }
    const user = await User.findOne({
        username: body.username
    })
    if (user) {
        return res.json({ message: "Email already taken or invalid input" });
    }
    

    const dbUser = await User.create(body);
    const token = jwt.sign({
        id: dbUser._id
    }, JWT_SECRET);

    const userId=dbUser._id;
    //creating Account
    await Account.create({userId,balance:1+Math.random()*1000})

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    console.log(req.body);
    const result = signinSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Validation failed", errors: result.error.errors });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({ token: token });
    }

    res.status(401).json({ message: "Invalid username or password" });
});

const updateSchema=zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})

router.put('/',authMiddleware,async(req,res)=>{
    let result=updateSchema.safeParse(req.body);
    if(!result.success)
        return res.json({message:result.error.message})
    let x=await User.updateOne({_id:req.userId},req.body);
    if(x)
        return res.json({message:"User Updated successfully"})
    res.json({message:"errror occured while updating"});
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    console.log(filter);
    const users = await User.find({
        $or: [
          { firstname: { "$regex": filter, "$options": "i" } },
          { lastname: { "$regex": filter, "$options": "i" } }, 
          { username: { "$regex": filter, "$options": "i" } } 
        ]
      });
      console.log(users)

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})


module.exports = router;
//api/v1/user
//api/v1/transaction
