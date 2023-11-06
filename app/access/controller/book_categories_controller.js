const BookCategories = require("../model/m_book_categories");
const ApiResponse = require("../../helper/apiResponse");

const getCategory = async (req, res) => {
  try {
    const data = await BookCategories.find().exec();
    return ApiResponse.success(res, "All Categorie", data);
  } catch (error) {
    return ApiResponse.server(res, "Category Server Error");
  }
};

const singleCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await BookCategories.findById(id).exec();
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    return ApiResponse.success(res, "All Categorie", data);
  } catch (error) {
    console.log(error);
    return ApiResponse.server(res, "Category Server Error");
  }
};

const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const data = await BookCategories.create({ name: category_name });
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    console.log(error);
    return ApiResponse.server(res, "Category Server Error");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, category_name } = req.body;
    const data = await BookCategories.findById(id);
    console.log(data);
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    data.name = category_name;
    await data.save();
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Category Server Error");
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await BookCategories.findById(id);
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    data.del_flg = true;
    await data.save();
    return ApiResponse.created(res, "Delete Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Category Server Error");
  }
};
module.exports = {
  getCategory,
  singleCategory,
  addCategory,
  updateCategory,
  deleteCategory
};
