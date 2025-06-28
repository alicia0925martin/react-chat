const express = require("express");
const { signup, login, logout } = require("../controllers/auth.controller");
const { auth } = require("../middlewares/auth");

const router =express.Router();


router.post("/signup" , signup);

router.post("/login" , login);

router.post("/logout" , logout)

router.post("/checkAuth" , auth , (req, res)=>{
    res.send(req.user);
})


module.exports = router