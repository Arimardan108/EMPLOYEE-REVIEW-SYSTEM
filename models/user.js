const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  permission: {
    type: String
  },
  assignedReviews:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignedReview',
    }
  ],
  myReviews:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MyReview',
    }
  ]
}, {
  timestamps: true
}
)

const User = mongoose.model('User', userSchema);

module.exports = User;