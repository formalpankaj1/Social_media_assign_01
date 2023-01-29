import mongoose from "mongoose";
import UserModal from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
import auth from "../middleware/auth.js";

dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ name: oldUser.name, email: oldUser.email, id: oldUser._id }, process.env.SECRET_KEY);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}


export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });


    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserModal({
      email, password: hashedPassword, name: `${firstName} ${lastName}`
    });

    const result = await user.save();

    const token = jwt.sign({ name: result.name, email: result.email, id: result._id }, process.env.SECRET_KEY);

    res.status(201).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
}

export const getuserInfo = async (req, res) => {
  const user = await UserModal.find({ name: req.params.user });
  // console.log("user", user);
  res.send(user);
}

export const follow = async (req, res) => {

  try {
    const usertofollow = req.params.username;
    const userwantstofollow = req.username;

    const user = await UserModal.find({ name: userwantstofollow });
    const user2 = await UserModal.find({ name: usertofollow });

    const x = user[0].followings.find((x) => x == usertofollow);

    if (user2.length == 0) {
      res.send('user not exist');
    } else if (usertofollow == userwantstofollow) {
      res.send('user you cannot follow yourself');
    } else if (!x && user2.length != 0) {
      //change the followings: 

      user[0].followings = [...user[0].followings, usertofollow];
      const Updateuser = new UserModal(user[0]);
      const updatedUser = await Updateuser.save();

      //change the followers: 
      user2[0].followers = [...user2[0].followers, userwantstofollow];
      const Updateuser2 = new UserModal(user2[0]);
      const updatedUser2 = await Updateuser2.save();
      // res.send('sucessfully followed');
      // console.log('sucessfully followed');
      res.send(user2[0]);
    } else {
      res.send('your are already following this user');
    }
    // res.send(user[0].followings);
    // res.send('hi');
  } catch (err) {
    console.log("err : ", err);
    res.send(err);
  }

}
export const unfollow = async (req, res) => {

  try {
    const usertounfollow = req.params.username;
    const userwantstounfollow = req.username;

    const user = await UserModal.find({ name: userwantstounfollow });
    const user2 = await UserModal.find({ name: usertounfollow });

    const x = user[0].followings.find((x) => x == usertounfollow);

    if (x) {
      //change the followings: 
      user[0].followings = user[0].followings.filter((x) => x != usertounfollow);
      const Updateuser = new UserModal(user[0]);
      const updatedUser = await Updateuser.save();

      //change the followers: 
      user2[0].followers = user2[0].followers.filter((x) => x != userwantstounfollow);
      const Updateuser2 = new UserModal(user2[0]);
      const updatedUser2 = await Updateuser2.save();
      res.send(user2[0]);
    } else {
      res.send('your are already Unfollowing this user');
    }
    // res.send(user[0].followings);
    // res.send('hi');
  } catch (err) {
    console.log("err : ", err);
    res.send(err);
  }

}
