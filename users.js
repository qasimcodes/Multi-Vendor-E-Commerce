import express from "express";
const authRoute = express.Router();

import * as auth from "../controllers/users.js";
import { requiredLoggedIn } from "../middlewares/authMiddleware.js"

authRoute.post("/pre-signup", auth.preSignup);
authRoute.post("/login", auth.login);
authRoute.post("/signup", auth.signup);

authRoute.post("/forgot-password", auth.forgotPassword);
authRoute.post("/acccess-account", auth.accessAccount);
authRoute.get("/profile/:username", auth.userProfile);

/* Authorized/protected Routes ==> must be loggedin */
authRoute.route("/current-logged-user").get(requiredLoggedIn, auth.loggedInUser);
authRoute.route("/update-password").put(requiredLoggedIn, auth.updatePassword);
authRoute.route("/update-profile").put(requiredLoggedIn, auth.updateProfile);
authRoute.route("/upload-image").post(requiredLoggedIn, auth.uploadImage);
authRoute.route("/delete-image").post(requiredLoggedIn, auth.deleteImage);

export default authRoute;