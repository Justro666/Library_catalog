const Authors = require("../model/m_authors");
const ApiResponse = require("../../helper/apiResponse");

/**
 * The function `getAuthor` is an asynchronous function that retrieves authors based on the provided
 * name and age parameters, and returns a success response with the retrieved data or a server error
 * response if an error occurs.
 * @returns an API response with the data retrieved from the database query. The response includes a
 * success message and the data of the authors that match the given query parameters.
 */
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

/**
 * The function `singleAuthor` retrieves a single author from the database based on the provided ID and
 * returns a success response with the author data, or a not found response if the author is not found,
 * @returns an API response with the following properties:
 * - If the data is found, it returns a success response with the message "All Categorie" and the data.
 * - If the data is not found, it returns a not found response with the message "Data Not Found".
 * - If there is an error, it returns a server error response with the message "Author Server Error".
 */
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

/**
 * The function `addAuthor` is an asynchronous function that creates a new author with the provided
 * name and age, and returns a success response with the created author data or an error response if
 * there is any issue.
 * @returns an ApiResponse with the status code 201 (created) and a message "Add Successful", along
 * with the data of the newly created author.
 */
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

/**
 * The function updates the name of an author in a database based on the provided ID.
 * @returns an API response with a success status code and a message indicating that the update was
 * successful, along with the updated author data.
 */
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
/**
 * The deleteAuthor function deletes an author from the database by setting the del_flg property to
 * true.
 * deleted, it returns a 201 status code with the message "Delete Successful" and the deleted data. If
 * the data is not found, it returns a 404 status code with the message "Data Not Found". If there is a
 * server error, it returns a 500 status code with the
 */
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
