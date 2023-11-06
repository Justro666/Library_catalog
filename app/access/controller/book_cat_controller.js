const Catalogue = require("../model/m_catalogue");
const Books = require("../model/m_book");
const ApiResponse = require("../../helper/apiResponse");

const getCatalogue = async (req, res) => {
  try {
    const data = await Catalogue.find().exec();
    return ApiResponse.success(res, "All Catalogue", data);
  } catch (error) {
    return ApiResponse.server(res, "Catalog Server Error");
  }
};

const singleCatalogue = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Catalogue.findById(id).exec();
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    return ApiResponse.success(res, "All Catalogue", data);
  } catch (error) {
    console.log(error);
    return ApiResponse.server(res, "Catalog Server Error");
  }
};

const addCatalogue = async (req, res) => {
  try {
    const { catalogue_name } = req.body;
    const data = await Catalogue.create({ catalogue_name });
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Catalog Server Error");
  }
};

const updateCatalogue = async (req, res) => {
  try {
    const { id, catalogue_name } = req.body;
    const data = await Catalogue.findById(id);
    console.log(data);
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    data.catalogue_name = catalogue_name;
    await data.save();
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Catalog Server Error");
  }
};
const deleteCatalogue = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const data = await Catalogue.findById(id);
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    const bookData = await Books.find({ catalogue: id });
    if (bookData)
      return ApiResponse.badrequest(
        res,
        "Data Cannot be deleted.Books with Catalogue are found"
      );
    data.del_flg = true;
    await data.save();
    return ApiResponse.created(res, "Delete Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Catalog Server Error");
  }
};
module.exports = {
  getCatalogue,
  singleCatalogue,
  addCatalogue,
  updateCatalogue,
  deleteCatalogue
};
