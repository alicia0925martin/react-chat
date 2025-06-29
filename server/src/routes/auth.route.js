const express = require("express");
const { signup, login, logout, checkUsername } = require("../controllers/auth.controller");
const { auth } = require("../middlewares/auth");

const router =express.Router();


router.post("/signup" , signup);

router.post("/login" , login);

router.post("/logout" , logout)

router.get("/checkAuth" , auth , (req, res)=>{
    res.send(req.user);
})

router.post("/checkUsername" , checkUsername);



module.exports = router