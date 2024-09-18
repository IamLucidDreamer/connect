const mongoose = require('mongoose');
const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Academic', 'Research', 'Corporate'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  website: {
    type: String,
    match: [/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, 'Please use a valid URL.'],
  },
  location: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  contactNumber: {
    type: String,
  },
  establishmentYear: {
    type: Number,
  },
  registeredGovtId: {
    type: String,
  },
  industry: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

organizationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Organization', organizationSchema);