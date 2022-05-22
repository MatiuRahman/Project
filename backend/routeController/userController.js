import asyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import { tokenGenerator } from "../utilities/tokenGenerator.js";

// description: Authurize user & get token
// route: POST /api/users/login

const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid e-mail or Password");
  }
});
// description: Register user
// route: POST /api/users

const userRegisteration = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const availUser = await User.findOne({ email });

  if (availUser) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: tokenGenerator(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @description: get user profile
// @route: get /api/users/profile

const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @description: update user profile
// @route: put /api/users/profile

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedProfile = await user.save();

    res.json({
      _id: updatedProfile._id,
      name: updatedProfile.name,
      email: updatedProfile.email,
      isAdmin: updatedProfile.isAdmin,
      token: tokenGenerator(updatedProfile._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @description: get users
// @route: get /api/users Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
// @description: DELETE users
// @route: get /api/users/:ID ADMIN

const deleteUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @description: get users
// @route: get /api/users Admin

const getUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
//================================================================

// @description: update users
//@route: PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  userAuth,
  userRegisteration,
  userProfile,
  updateProfile,
  getUsers,
  deleteUsers,
  getUsersById,
  updateUser,
};
