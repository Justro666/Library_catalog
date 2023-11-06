const Authors = require("../model/m_authors");
const ApiResponse = require("../../helper/apiResponse");

const getAuthor = async (req, res) => {
  try {
    const { name, age } = req.body;
    let query = {};
    if (name) {
      query = { ...query, name: { $regex: ".*" + name + ".*" } };
    }
    if (age) {
      query = { ...query, age: age };
    }
    const data = await Authors.find(query).exec();
    return ApiResponse.success(res, "All Categorie", data);
  } catch (error) {
    return ApiResponse.server(res, "Author Server Error");
  }
};

const singleAuthor = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Authors.findById(id).exec();
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    return ApiResponse.success(res, "All Categorie", data);
  } catch (error) {
    console.log(error);
    return ApiResponse.server(res, "Author Server Error");
  }
};

const addAuthor = async (req, res) => {
  try {
    const { name, age } = req.body;
    const data = await Authors.create({ name, age });
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    console.log(error);
    return ApiResponse.server(res, "Author Server Error");
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { id, name } = req.body;
    const data = await Authors.findById(id);
    console.log(data);
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    data.name = name;
    await data.save();
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Author Server Error");
  }
};
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Authors.findById(id);
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    data.del_flg = true;
    await data.save();
    return ApiResponse.created(res, "Delete Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Author Server Error");
  }
};
module.exports = {
  getAuthor,
  singleAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor
};
