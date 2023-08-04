const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const jwtSecret="MyNameisNarutoUzamakiIamAToadSag"
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
         //function of bcrypt are asynchronous so we have to use await
        const salt= await bcrypt.genSalt(10);
        let secPassword=await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success: true }));
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

router.post("/loginuser",[
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            //when email is wrong
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            //hashed password
            const pwdCompare= await bcrypt.compare(req.body.password,userData.password);
            //when password is wrong
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            const data={
                user:{
                    //mongodb se data leke yaha pe store kara rahe hain
                    //id is an object so dont put semicolon
                    id:userData.id
                }
            }
            //generate auth token
            const authToken=jwt.sign(data,jwtSecret)
            //when both credentials are correct
            return res.json({ success: true ,authToken:authToken});
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })
module.exports = router;