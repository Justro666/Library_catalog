const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema(
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

adminSchema.pre("find", function() {
  this.where({ del_flg: false });
});
adminSchema.pre("findOne", function() {
  this.where({ del_flg: false });
});
adminSchema.pre("countDocuments", function() {
  this.where({ del_flg: false });
});
adminSchema.pre("findById", function() {
  this.where({ del_flg: false });
});
const Admin = mongoose.model("m_admin", adminSchema);

module.exports = Admin;
