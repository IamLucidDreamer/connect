const mongoose = require("mongoose");
const { Schema } = mongoose;

const userOrganizationRelation = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  isApproved: { type: Boolean, default: false },
  role: { type: String, enum: ["member", "admin"], required: true },
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "UserOrganizationRelation",
  userOrganizationRelation
);
