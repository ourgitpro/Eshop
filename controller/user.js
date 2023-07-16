const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const upload = require("../multer");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const avatar = fileUrl;
  const user = {
    name: name,
    email: email,
    password: password,
    avatar: avatar,
  };
  console.log(user);
});
module.exports = router;