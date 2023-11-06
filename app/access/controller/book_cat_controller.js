const Catalogue = require("../model/m_catalogue");
const Books = require("../model/m_book");
const ApiResponse = require("../../helper/apiResponse");

/**
 * The function `getCatalogue` retrieves all items from the Catalogue collection and returns a success
 * response with the data, or a server error response if there is an error.
 * @returns an API response with the success status, a message of "All Catalogue", and the data
 * retrieved from the Catalogue collection.
 */
const getCatalogue = async (req, res) => {
  try {
    const data = await Catalogue.find().exec();
    return ApiResponse.success(res, "All Catalogue", data);
  } catch (error) {
    return ApiResponse.server(res, "Catalog Server Error");
  }
};

/**
 * The function `singleCatalogue` retrieves a single catalogue item by its ID and returns it as a
 * response.
 * @returns a response object with the appropriate status code and message. If the data is found, it
 * will return a success response with the data. If the data is not found, it will return a not found
 * response with the message "Data Not Found". If there is an error, it will return a server error
 * response with the message "Catalog Server Error".
 */
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

/**
 * The function `addCatalogue` is an asynchronous function that creates a new catalogue with the given
 * name and returns a success response with the created data, or an error response if there is an
 * error.
 * @returns an API response with the status code 201 (created) and a message "Add Successful", along
 * with the data that was created.
 */
const addCatalogue = async (req, res) => {
  try {
    const { catalogue_name } = req.body;
    const data = await Catalogue.create({ catalogue_name });
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Catalog Server Error");
  }
};

/**
 * The function updates the catalogue name in the database based on the provided ID.
 * @returns an ApiResponse with the appropriate status code and message, along with the updated data if
 * the update was successful.
 */
const updateCatalogue = async (req, res) => {
  try {
    const { id, catalogue_name } = req.body;
    const data = await Catalogue.findById(id);
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    data.catalogue_name = catalogue_name;
    await data.save();
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Catalog Server Error");
  }
};
/**
 * The function `deleteCatalogue` is an asynchronous function that deletes a catalogue and sets its
 * `del_flg` property to true, but only if there are no associated books with the catalogue.
 * @returns an API response with the following parameters:
 * - res: The response object
 * - A status code indicating the success or failure of the operation
 * - A message indicating the result of the operation
 * - The data object that was deleted
 */
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
