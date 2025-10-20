import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import User from '../models/user.model.js';

config();

export const signUpUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required!',
        })
    }

    try {
        const exsistingUser = await User.findOne({
            $or: [{
                username,
            }, {
                email,
            }],
        })

        if (exsistingUser) {
            return res.status(409).json({
                message: 'User with same username or email already exsists!',
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save();

        return res.status(201).json({
            message: 'User signed up successfully!',
            user: savedUser,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error!',
        })
    }
}

export const logInUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({
            message: 'All fields are required!',
        });
    }

    try {
        const user = await User.findOne({
            $or: [{ 
                username: usernameOrEmail, 
            }, {
                email: usernameOrEmail,
            }]
        })

        if (!user) {
            return res.status(408).json({
                message: 'Invalid username or email!',
            })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(409).json({
                message: 'Invalid password!',
            })
        }

        const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });

        return res.status(200).json({
            message: 'User logged in successfully!',
            token,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error!',
        })
    }
}