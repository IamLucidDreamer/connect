const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const educationSchema = new mongoose.Schema({
  qualification: { type: String, required: true },
  program: { type: String, required: true },
  specialization: { type: String, required: true },
  programType: { type: String, required: true, enum: ["Regular", "Parttime"] },
  university: { type: String, required: true },
  institute: { type: String, required: true },
  startYear: { type: Date, required: true },
  completionYear: { type: Date},
  percentageOrCGPA: { type: Number },
});

const professionalSchema = new mongoose.Schema({
  currentEmployment: { type: String, required: true },
  employmentType: {
    type: String,
    required: true,
    enum: ["Regular", "Freelancer", "Contract", "Parttime"],
  },
  companyName: { type: String, required: true },
  designation: { type: String, required: true },
  location: { type: String, required: true },
  startYear: { type: Date, required: true },
  completionYear: { type: Date },
  salaryBand: { type: String },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  introLine: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Other", "Prefer not to say"],
  },
  dateOfBirth: { type: Date },
  mobileNumber: { type: String, unique: true, sparse: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: { type: String },
  bio: { type: String, maxlength: 500 },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
  refreshTokens: [
    {
      token: String,
      expires: Date,
    },
  ],
  otp: { type: String },
  otpExpires: { type: Date },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["user", "organisation-admin", "admin"],
    default: "user",
  },
  education: [educationSchema], // Educational Info
  professional: [professionalSchema], // Professional Info
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  organizations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  ],
  batch: { type: String },
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
  },
  createdAt: { type: Date, default: Date.now },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
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
  this.refreshTokens.push({ token, expires: null });
  return token;
};

// Method to generate OTP
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000;
  return otp;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
