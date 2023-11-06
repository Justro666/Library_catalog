const mongoose = require("mongoose");
const { Schema } = mongoose;

const CatalogueSchema = new Schema(
  {
    catalogue_name: { type: String, max: 40, min: 5 },
    del_flg: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

CatalogueSchema.pre("find", function() {
  this.where({ del_flg: false });
});
CatalogueSchema.pre("findOne", function() {
  this.where({ del_flg: false });
});
CatalogueSchema.pre("countDocuments", function() {
  this.where({ del_flg: false });
});
CatalogueSchema.pre("findById", function() {
  this.where({ del_flg: false });
});
const Catalogue = mongoose.model("m_catalogue", CatalogueSchema);

module.exports = Catalogue;
