import User from '../models/user.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import createError from '../utils/createError.js';

export const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5)

        const newUser = new User({
            ...req.body,
            password: hash
        })
        await newUser.save();
        res.status(201).send('User bna dia hai')
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) return next(createError(404, "password ghalat hai bhai, username b check kr le ..."))

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        },
        process.env.JWT_KEY);

        const { password, ...otherInfo } = user._doc
        res.cookie("access_token", token,{
                httpOnly: true,
            })
            .status(200).send(otherInfo)

    } catch (error) {
        next(error)
    }   
}

export const logout = async (req, res) => {

}

