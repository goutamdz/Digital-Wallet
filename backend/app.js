const express = require("express");
const router = express.Router();
const cors=require('cors');
const mainRouter = require("./routes/index");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", mainRouter); 


app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});