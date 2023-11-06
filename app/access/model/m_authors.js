const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    name: { type: String, max: 64, required: true },
    age: { type: Number, max: 100, required: true },
    del_flg: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

authorSchema.pre("find", function() {
  this.where({ del_flg: false });
});
authorSchema.pre("findOne", function() {
  this.where({ del_flg: false });
});
authorSchema.pre("countDocuments", function() {
  this.where({ del_flg: false });
});
authorSchema.pre("findById", function() {
  this.where({ del_flg: false });
});
const Author = mongoose.model("m_author", authorSchema);

module.exports = Author;
