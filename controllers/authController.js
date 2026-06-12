import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { comparepassword, hashPassword } from "../helpers/authHelper.js";
export const registercontroller = async (req, res) => {
  try {
    const { name, email, password, answer, address, phone } = req.body;
    //validation
    if (!email) {
      return res.send({ message: `Email is required` });
    }

    //check user
    const existuser = await userModel.findOne({ email });
    //existing user
    if (existuser) {
      return res.status(200).send({
        success: false,
        message: `Already Register ..Login required!!!!!`,
      });
    }

    //register user
    const hashedpassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      answer,
      address,
      password: hashedpassword,
    }).save();
    res.status(201).send({
      success: true,
      message: `User registered successfully!!!!`,
      user,
    });
  } catch (error) {
    console.log(error);
    {
      res.status(500).send({
        success: false,
        message: `Error in registeration`,
        error,
      });
    }
  }
};

//post login
export const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: `Invalid Credentials`,
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `Email is not registered`,
      });
    }
    //decrypt password
    const match = await comparepassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: `Invalid password`,
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: `LOGIN SUCCESSFULLY!!`,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in login`,
      error,
    });
  }
};
//forgetPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Validation
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!answer)
      return res.status(400).send({ message: "Security answer is required" });
    if (!newPassword)
      return res.status(400).send({ message: "New password is required" });

    // Check if user exists
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect email or security answer",
      });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//test controller
export const testcontroller = (req, res) => {
  console.log(`protected routes`);
  res.send({
    message: `protected route`,
  });
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password"); // Exclude passwords
    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};
