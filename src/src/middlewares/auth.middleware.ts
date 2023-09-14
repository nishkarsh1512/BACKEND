import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { UserModel } from "../modules/user/user.model"
import { NextFunction } from "express"

const protect = asyncHandler(async (req, res, next: NextFunction) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]

            // Verify token
            const decoded = jwt.verify(token, "Batfleck")

            // Get user from the token
            //@ts-ignore
            req.user = await UserModel.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

module.exports = { protect }
