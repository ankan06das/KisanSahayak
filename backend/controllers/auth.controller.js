import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const {
            name,
            gender,
            dob,
            phoneno,
            password,
            crops
        } = req.body;

        //Validators
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be atleast 6 characters long" });
        }
        if (phoneno.length !== 10) {
            return res.status(400).json({ error: "Enter a valid Phone no." });
        }
        if (name.length < 2) {
            return res.status(400).json({ error: "Name should be atleast 2 characters long" });
        }
        if (crops.length < 1) {
            return res.status(400).json({ error: "Atleast one crop has to be specified" });
        }

        const user = await User.findOne({ phoneno });
        if (user) {
            return res.status(400).json({ error: "A user with this phone no. already exists. Use another phone no., or try logging into your account" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            gender,
            dob,
            phoneno,
            password: passwordHash,
            crops
        })

        if (newUser) {
            console.log(newUser);
            generateTokenAndSetCookie(newUser._id, res);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (err) {
        console.log("Error in Signing up", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        console.log(req.body);
        
        const { phoneno, password } = req.body;
        
        const user = await User.findOne({ phoneno: phoneno });
        console.log(user);
        if (!user) return res.status(400).send({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        console.log(user);
        
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); //Null cookie
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.log("Error in Logging out", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}