const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Ensure you have this import

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const professionalSchema = new mongoose.Schema({
  company: String,
  title: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String, // A short bio for the user profile
    maxlength: 500,
  },
  address: addressSchema,
  refreshTokens: [
    {
      token: String,
      expires: Date,
    },
  ],
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "organisation-admin", "admin"],
    default: "user",
  },
  education: [educationSchema],
  professional: [professionalSchema],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  organizations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  batch: {
    type: String,
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET);
  this.refreshTokens.push({ token, expires: null }); // No expiration
  return token;
};

// Method to generate OTP
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  return otp;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
