const BookCategories = require("../model/m_book_categories");
const ApiResponse = require("../../helper/apiResponse");

/**
 * The function `getCategory` retrieves all book categories and returns a success response with the
 * data, or a server error response if an error occurs.
 * @returns a promise.
 */
const getCategory = async (req, res) => {
  try {
    const data = await BookCategories.find().exec();
    return ApiResponse.success(res, "All Categorie", data);
  } catch (error) {
    return ApiResponse.server(res, "Category Server Error");
  }
};

/**
 * The function `singleCategory` retrieves a single book category based on the provided ID and returns
 * a success response with the category data, or a not found response if the category does not exist,
 * or a server error response if an error occurs.
 * @returns a response object with the success status and the data of a single book category.
 */
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

/**
 * The function `addCategory` is an asynchronous function that creates a new book category and returns
 * a response with the created data if successful, or an error response if there is an error.
 * @returns an API response with the status code 201 (created) and a message "Add Successful", along
 * with the data of the newly created book category.
 */
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

/**
 * The function updates the name of a book category based on the provided ID.
 * @returns an ApiResponse with a success status code and a message of "Add Successful", along with the
 * updated data object.
 */
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
/**
 * The deleteCategory function deletes a book category by setting its del_flg property to true.
 * @returns an ApiResponse with the appropriate status code and message, along with the deleted data if
 * successful.
 */
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
