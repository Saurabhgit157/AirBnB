const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

// ─── SIGNUP ───────────────────────────────────────────────────────────────────

// GET /signup — show the signup form
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

// POST /signup — register the new user
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });

        // .register() hashes the password and saves the user
        const registeredUser = await User.register(newUser, password);

        // Auto-login after signup
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to WanderLust, ${registeredUser.username}! 🎉`);
            res.redirect("/listings");
        });
    } catch (e) {
        // e.g. username already taken
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

// ─── LOGIN ────────────────────────────────────────────────────────────────────

// GET /login — show the login form
router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

// POST /login — authenticate using passport
router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,     // auto sets req.flash("error", "...") on failure
    }),
    (req, res) => {
        req.flash("success", `Welcome back, ${req.user.username}! 👋`);
        res.redirect("/listings");
    }
);

// ─── LOGOUT ───────────────────────────────────────────────────────────────────

// GET /logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You have been logged out. See you soon!");
        res.redirect("/listings");
    });
});

module.exports = router;
