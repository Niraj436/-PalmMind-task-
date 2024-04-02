import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenandSetCookie from "../utils/generateToken.js";
import generateTokenandSetStorage from "../utils/generateToken.js";


// SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullName, username,email, gender, password} = req.body;
    let userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      return res.status(400).json({ error: "Username not available" });
    }
    userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // profile picture
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User ({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });
    if(newUser){
      generateTokenandSetCookie(newUser._id,res);

        await newUser.save();
        res.send(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};


// LOGIN
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ""
      );
  
      if (!user || !isPasswordCorrect) {
        return res
          .status(400)
          .json({ error: "Username or password is incorrect" });
      }
      generateTokenandSetCookie(user._id,res);
      res.status(201).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic,
      })
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };

//   LOGOUT
export const logout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.send({ message: "User logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };





// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

     // Check if the new password is the same as the current password
     const isNewPasswordSameAsCurrent = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (isNewPasswordSameAsCurrent) {
      return res.status(400).json({ error: "New password must be different from the current password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

  
