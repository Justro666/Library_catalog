const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookCategoriesSchema = new Schema(
  {
    name: { type: String, max: 64, required: true },
    del_flg: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

bookCategoriesSchema.pre("find", function() {
  this.where({ del_flg: false });
});
bookCategoriesSchema.pre("findOne", function() {
  this.where({ del_flg: false });
});
bookCategoriesSchema.pre("countDocuments", function() {
  this.where({ del_flg: false });
});
bookCategoriesSchema.pre("findById", function() {
  this.where({ del_flg: false });
});
const BookCategories = mongoose.model(
  "m_book_categories",
  bookCategoriesSchema
);

module.exports = BookCategories;
