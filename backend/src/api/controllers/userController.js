import User from "../models/userModel.js";
import logger from "../../utils/logger.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import joi from "joi";
import { token } from "morgan";

// User signin
const userRegisterValidation = joi.object({
  name: joi.string().required(),
  nic: joi.string().required(),
  contact: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string(),
});

const signup = async (req, res) => {
  try {
    const validation = userRegisterValidation.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.message });
    }
    const existingUser = await User.findOne({ email: validation.value.email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(validation.value.password, 10);

    const result = await User.create({
      name: validation.value.name,
      nic: validation.value.nic,
      contact: validation.value.contact,
      email: validation.value.email,
      password: hashedPassword,
      role: validation.value.role
        ? validation.value.role
        : "66680565f16f71292041bb2b",
    });

    const userData = {
      name: result.name,
      email: result.email,
      role: result.role,
    };

    const payload = {
      token: token,
      result: userData,
    };
    res
      .status(201)
      .json({ message: "User created successfully", data: payload });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// User Login

const userLoginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const signin = async (req, res) => {
  try {
    const validation = userLoginValidation.validate(req.body);
    const existingUser = await User.findOne({
      email: validation.value.email,
    }).populate("role", "roleName");

    const userData = {
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role.roleName,
    };

    if (!existingUser) {
      return res.status(403).json({ message: "Password doesn't match" });
    }
    const matchPassword = await bcrypt.compare(
      validation.value.password,
      existingUser.password
    );

    if (!matchPassword) {
      return res.status(400).json({ message: "User name or Password Invalid" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role.roleName,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result: userData, token: token });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Unable to log out");
    } else {
      res.clearCookie("connect.sid");
      res.send("Logout successful");
    }
  });
};

module.exports = { signup, signin, logout };
