const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_name: { type: String, max: 64, required: true },
    email: { type: String, max: 64, required: true },
    password: { type: String, max: 64, required: true },
    del_flg: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

userSchema.pre("find", function() {
  this.where({ del_flg: false });
});
userSchema.pre("findOne", function() {
  this.where({ del_flg: false });
});
userSchema.pre("countDocuments", function() {
  this.where({ del_flg: false });
});
userSchema.pre("findById", function() {
  this.where({ del_flg: false });
});
const User = mongoose.model("m_user", userSchema);

module.exports = User;
