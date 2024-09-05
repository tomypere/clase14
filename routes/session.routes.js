import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";
import { isValidPassword } from "../utils/hashPassword.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { userLoginValidator } from "../validator/userLogin.validator.js";

const router = Router();



router.post("/register", passportCall("register") , async (req, res) => {
    try {
        
        res.status(201).json({status: "success", payload: "Usuario creado"})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Internal Server Error"})
    }
})

router.post("/login", passport.authenticate("login"), async (req, res) => {
    try {


        return res.status(200).json({status: "success", payload: req.user})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Internal Server Error"})
    }
})

router.post("/jwt", userLoginValidator, passport.authenticate("login"), async (req, res) => {
    try {
        const { email, password} = req.body
        const user = await userDao.getByEmail(email)
        if(!user || !isValidPassword(user, password)) return res.status(401).json({ status: "error", msg: "usuario o contrasena no valido"}) 

        const token = createToken(user)
        res.cookie("token", token, { httpOnly: true })
        return res.status(200).json({status: "success", payload: user, token})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Internal Server Error"})
    }
})

router.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
    try{



        return res.status(200).json({ status: "success", payload: req.user })

    } catch (error){
        console.log(error)
        res.status(500).json({ status: "error", msg: "Internal server error" })
    }
})

router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false
}), async (req, res) => {
    try {


        return res.status(200).json({status: "success", payload: req.user})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Internal Server Error"})
    }
})

router.get("/logout", async (req, res) => {
    try{
        req.session.destroy()
        res.status(200).json({status: "success", msg:"Sesión cerrada con éxito"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "Error", msg: "Internal Server Error"})
    }
})



export default router