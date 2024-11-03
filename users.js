import User from "../models/users.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import * as config from "../config/config.js";
import userAndTokenResponse from "../helpers/userAndTokenResponse.js";
import { nanoid } from "nanoid";
import validator from "email-validator";
import emailTemplate from "../helpers/email.js";

/* Create New User Account = POST /api/v1/users/signup */
export const preSignup = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Email validation
  if (!validator.validate(email)) {
    return res.json({ error: "A valid email address is required" });
  }

  // Password validations
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{5,30}$/;
  if (!password) {
    return res.json({ error: "Password is required" });
  }
  if (password.length < 5 || password.length > 30) {
    return res.json({ error: "Password should be between 5 and 30 characters long" });
  }
  if (!passwordRegex.test(password)) {
    return res.json({
      error:
        "Password must contain at least one capital letter, one number, and one special character (excluding comma and period)",
    });
  }

  // Check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      error: "This email is already taken, please choose a different email address",
    });
  }

  // Generate a token
  const token = jwt.sign({ email, password }, config.JWT_SECRET, {
    expiresIn: "4h",
  });

  // Send activation email
  config.AWSSES.sendEmail(
    emailTemplate(
      email,
      `
      <h3>Pre Sign Up Verification Code</h3>
      <p>Please click the link below to activate your account.</p>
      <a style='color: orange; font-weight: bold' href="${config.CLIENT_URL}/auth/activation/${token}">Activate my Account!!</a>`,
      config.REPLY_TO,
      "Activation Account Link"
    ),
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ ok: false, error: "Email sending failed due to a mailer issue" });
      } else {
        console.log(data);
        res.status(200).json({ ok: true, success: "Please check your email to activate your account" });
      }
    }
  );
});

/* Signup decode credentails & save user = POST /api/v1/users/signup */
export const signup = asyncHandler(async (req, res, next) => {
  try {
    const user_token = req.body.token;
    const { email, password } = jwt.verify(user_token, config.JWT_SECRET);

    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        error: "This Email is already taken please chose different email address",
      });
    }

    const newUser = await new User({
      email,
      password,
      username: nanoid(8),
    }).save();

    /* Generate the Token & send the token, refresh token & user object */
    userAndTokenResponse(req, res, newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong... Try again",
    });
  }
});

/* Login with Credentials = POST /api/v1/users/login */
export const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    /* Both fields must be provided */
    if (!email || !password) {
      return res.json({ error: "Both feilds are required" });
    }

    /* Find the user by email */
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found with provided email" });
    }

    /* Compare password  */
    const checkPassword = await user.matchPasswords(password);
    if (!checkPassword) {
      return res.json({ error: "Password is incorrect" });
    }
  
    /* If the account is blocked means status is false */
    if (!user.status) {
      return res.json({ error: "Account is blocked, contact admin!" });
    }

    /* Generate the Token & send the token, refresh token & user object */
    userAndTokenResponse(req, res, user);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong... Try again",
    });
  }
});

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    /* 1. Email is required */
    if (!email) {
      return res.json({ error: "Email is required" });
    }

    /* 2. find user with provided email */
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        error: `Could not find user with that email:${email}`,
      });
    } else {
      /* 3. Generate a random reset code and save it to the database */
      const resetCode = nanoid();
      user.resetCode = resetCode;
      user.save();
      /* 4. Generate a token based on reset code */
      const token = jwt.sign({ resetCode }, config.JWT_SECRET, {
        expiresIn: "1h",
      });
      /* 5. Send clickable link this token based on reset code to email address */
      config.AWSSES.sendEmail(
        emailTemplate(
          email,
          `
      <h3> Reset Password Link </h3> 
      <p> Please click the link below to Access your account. </p>
      <a style='color: orange; font-weight: bold' href='${config.CLIENT_URL}/User/access-account/${token}'> Access my account </a> 
      `,
          config.REPLY_TO,
          "Using this Reset link to Access your Account"
        ),
        (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({ ok: false });
          } else {
            console.log(data);
            res.status(200).json({ ok: true });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong... Try again",
    });
  }
};

/* Access Account after forgetting pasword */
export const accessAccount = async (req, res) => {
  try {
    /* 1. grab the token (resetCode) & verify with jwt */
    const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);
    /* 2. query database to find the user matching resetCode & udpate it */
    const user = await User.findOneAndUpdate({ resetCode }, { resetCode: "" });
    /* 3.generate the token & refresh token & send user */
    console.log(user);

    userAndTokenResponse(req, res, user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong... Try again",
    });
  }
};

export const loggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({ error: "UnUserorized User" });
  }
};

/* Public Profile  */
export const userProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    user.password = undefined;
    user.resetCode = undefined;
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: `This User ${req.params.username} not found` });
  }
};

/* Update User Password (logged user only)  */
export const updatePassword = async (req, res) => {
  try {
    /* 1. Take User Old and New password */
    const { oldPassword, newPassword } = req.body;

    //2. Password validations
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{5,30}$/;

    if (!oldPassword || !newPassword) {
      return res.json({ error: "Both old and new passwords are required" });
    }

    if (newPassword.length < 5 || newPassword.length > 30) {
      return res.json({ error: "Password should be between 5 and 30 characters long" });
    }

    if (oldPassword == newPassword) {
      return res.json({ error: "Old and New Password should not be same" });
    }

    // 3. Find the user by ID
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.json({ error: "User not found" });
    }

    // 3. Check if the old password matches with stored db password
    const isMatch = await user.matchPasswords(oldPassword);

    if (!isMatch) {
      return res.json({ error: "Old password is incorrect" });
    }

    if (!passwordRegex.test(newPassword)) {
      return res.json({
        error:
          "Password must contain at least one capital letter, one number, and one special character (excluding comma and period)",
      });
    }

    // 4. Hash the new password and save it
    // This will trigger the 'pre-save' middleware for hashing
    user.password = newPassword;
    await user.save();

    res.json({ ok: true, message: "Your password has been changed" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.json({ error: "An error occurred while updating the password" });
  }
};

/* Update User Porfile (logged user only)  */
export const updateProfile = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {new: true});
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);

  } catch (err) {
    console.log(err);
    if(err.codeName === "DuplicateKey"){
     return res.json({error: `Username is already taken please chose different`})
    } else {
      return res.json({error:"Unauthorized"})
    }
  }
};

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body; // Assuming userId is sent in the request
    if (!image) {
      return res.json({ message: "Image is required" });
    }

    // Convert base64 image string to buffer
    const base64Image = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const type = image.split(";")[0].split("/")[1];

    // Image upload parameters
    const params = {
      Bucket: config.BUCKET_NAME,
      Key: `${nanoid()}.${type}`, // Generate unique file name
      Body: base64Image,
      ACL: "public-read", // Make image publicly accessible
      ContentEncoding: "base64", // Specify base64 encoding
      ContentType: `image/${type}`, // Define image type (e.g., image/png)
    };

    // Upload image to AWS S3
    config.AWSS3.upload(params, async (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        return res.json({ message: "Image upload failed" });
      }

      // Successfully uploaded, save S3 URL to user's profileImage
      const s3ImageUrl = data.Location;

      try {
        // Find user by userId and update profileImage
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.json({ message: "User not found" });
        }

        user.profileImage = s3ImageUrl; // Update profile image URL
        await user.save(); 

        // updated user and S3 URL
        return res.json({
          message: "Profile image updated successfully",
          profileImage: s3ImageUrl,
          user,
        });
      } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Error updating user profile" });
      }
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


/* Delete Profile Image from AWS S3 */
export const deleteImage = async (req, res) => {
  try {
    const { Key, Bucket } = res.body;
    config.AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send({ ok: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
