const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    book_name: { type: String, max: 64, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "m_author" },
    categories: [
      { type: Schema.Types.ObjectId, ref: "m_book_categories", required: true }
    ],
    catalogue: {
      type: Schema.Types.ObjectId,
      ref: "m_catalogue",
      required: true
    },
    del_flg: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

bookSchema.pre("find", function() {
  this.where({ del_flg: false });
});
bookSchema.pre("findOne", function() {
  this.where({ del_flg: false });
});
bookSchema.pre("countDocuments", function() {
  this.where({ del_flg: false });
});
bookSchema.pre("findById", function() {
  this.where({ del_flg: false });
});
const Book = mongoose.model("m_book", bookSchema);

module.exports = Book;
