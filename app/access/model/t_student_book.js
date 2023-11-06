const mongoose = require("mongoose");
const { Schema } = mongoose;

const borrowRecordSchema = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "m_user", required: true },
    book_id: { type: Schema.Types.ObjectId, ref: "m_book", required: true },
    returned: { type: Boolean, default: false },
    del_flg: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

borrowRecordSchema.pre("find", function() {
  this.where({ del_flg: false });
});
borrowRecordSchema.pre("findOne", function() {
  this.where({ del_flg: false });
});
borrowRecordSchema.pre("countDocuments", function() {
  this.where({ del_flg: false });
});
borrowRecordSchema.pre("findById", function() {
  this.where({ del_flg: false });
});
const BorrowRecord = mongoose.model("t_student_book", borrowRecordSchema);

module.exports = BorrowRecord;
