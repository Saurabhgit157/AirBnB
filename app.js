const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").MongoStore;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const mongose_url = "mongodb://127.0.0.1:27017/majorproject";

main().then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log(err));

async function main(){
   await mongoose.connect(mongose_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// ─── Session & Cookie Configuration ───────────────────────────────────────────
const store = MongoStore.create({
    mongoUrl: mongose_url,
    crypto: {
        secret: "wanderlust_secret_key",
    },
    touchAfter: 24 * 3600, // only update session in DB once per day unless data changes
});

store.on("error", (err) => {
    console.log("Session store error:", err);
});

const sessionOptions = {
    store,
    secret: "wanderlust_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,          // prevents JS access to the cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    },
};

app.use(session(sessionOptions));

// ─── Flash Messages ────────────────────────────────────────────────────────────
app.use(flash());

// ─── Passport Initialization ──────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());  // must come AFTER app.use(session(...))

// Tell passport which strategy to use and which model to authenticate against
passport.use(new LocalStrategy(User.authenticate()));

// How to store user in session (serialize = save to session)
passport.serializeUser(User.serializeUser());

// How to retrieve user from session (deserialize = load from session)
passport.deserializeUser(User.deserializeUser());

// Make flash messages & current user available in all EJS templates
app.use((req, res, next) => {
    res.locals.success     = req.flash("success");
    res.locals.error       = req.flash("error");
    res.locals.currentUser = req.user;  // req.user is set by passport after login
    next();
});

// ──────────────────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
    res.send("Hi, i am root");
});

// Listing routes
app.use("/listings", listingRouter);

// Review routes (nested under listings)
app.use("/listings/:id/reviews", reviewRouter);

// User auth routes (signup, login, logout)
app.use("/", userRouter);

// 404 - Page not found
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Custom error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { statusCode, message });
});

app.listen(3000, () => {
    console.log("server is listening to port 3000");
});

