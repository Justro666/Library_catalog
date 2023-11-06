const Books = require("../model/m_book");
const RentBooks = require("../model/t_student_book");
const ApiResponse = require("../../helper/apiResponse");
const helper = require("../../helper/helper");

/**
 * The function `allBooks` retrieves a list of books based on various search criteria and returns the
 * results along with pagination information.
 * @returns an API response with the following data:
 * - "All Books" as the success message
 * - An object with the following properties:
 *   - "data" property containing the result of the aggregation query on the Books collection
 *   - "pagination" property containing pagination information obtained from the
 * helper.getPaginationInfo() function
 */
const allBooks = async (req, res) => {
  try {
    const { author, categories, catalogue, bookName } = req.body;
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) - 1 || 0;
    const authorQuery = author
      ? { "Author.name": { $regex: new RegExp(author, "i") } }
      : {};
    const bookQuery = bookName
      ? { book_name: { $regex: new RegExp(bookName, "i") } }
      : {};
    const catalogueQuery = catalogue
      ? { "Catalogues.catalogue_name": { $regex: new RegExp(catalogue, "i") } }
      : {};
    const data = await Books.aggregate([
      {
        $match: bookQuery
      },
      {
        $lookup: {
          from: "m_authors",
          localField: "author",
          foreignField: "_id",
          as: "Author"
        }
      },
      { $match: authorQuery },
      {
        $lookup: {
          from: "m_book_categories",
          localField: "categories",
          foreignField: "_id",
          as: "Categories"
        }
      },
      {
        $lookup: {
          from: "m_catalogues",
          localField: "catalogue",
          foreignField: "_id",
          as: "Catalogues"
        }
      },
      {
        $match: catalogueQuery
      },
      {
        $project: {
          _id: 1,
          book_name: 1,
          "Author.name": 1,
          "Categories.name": 1,
          "Catalogues._id": 1,
          "Catalogues.catalogue_name": 1,
          updatedAt: 1
        }
      }
    ]);

    const countDocuments = await Books.countDocuments();
    return ApiResponse.success(res, "All Books", {
      data,
      pagination: helper.getPaginationInfo(page, limit, countDocuments)
    });
  } catch (error) {
    console.log(error);
    return ApiResponse.server(res, "Book Server Error");
  }
};

/**
 * The addBook function is an asynchronous function that creates a new book record in a database, with
 * validation checks for categories and returns an appropriate response.
 * @returns an API response with the status code and message, along with the created book data if
 * successful.
 */
const addBook = async (req, res) => {
  try {
    const { name, author, categories, catalogue } = req.body;
    if (!Array.isArray(categories) || categories.length <= 0)
      return ApiResponse.badrequest(res, "Categories Required");
    const regex = /^[0-9a-fA-F]{24}$/;
    for (let i = 0; i < categories.length; i++) {
      if (!regex.test(categories[i]))
        return ApiResponse.badrequest(res, "Categories Not Found");
    }
    const data = await Books.create({
      book_name: name,
      author: author,
      categories: categories,
      catalogue: catalogue
    });
    return ApiResponse.created(res, "Create Successful", data);
  } catch (error) {
    console.log(error);
    return ApiResponse.server(res, "Book Server Error");
  }
};

/**
 * The rentBook function is an asynchronous function that handles the process of renting a book by
 * creating a new entry in the RentBooks table with the bookId and userId provided in the request body.
 * @returns an ApiResponse with the created data if the book is successfully rented, or an ApiResponse
 * with a forbidden status and a message if the user is not logged in. If there is an error, it returns
 * an ApiResponse with a server error status and a message.
 */
const rentBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!req.user_id) {
      return ApiResponse.forbidden(res, "Please Login");
    }
    const userId = req.user_id;
    const data = await RentBooks.create({
      book_id: bookId,
      student_id: userId
    });
    return ApiResponse.created(res, data);
  } catch (error) {
    return ApiResponse.server(res, "Book Server Error");
  }
};

/**
 * The function retrieves all rented books based on the query parameters and returns the data along
 * with pagination information.
 * @returns an API response with the following parameters:
 * - The response object `res`
 * - A success message string "All Rented Books"
 * - The data retrieved from the database query
 * - Pagination information obtained from the `helper.getPaginationInfo()` function
 */
const allRentedBook = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) - 1 || 0;
    let query = {};
    if (req.query.returned == "yes") {
      query = { returned: true };
    }
    if (req.query.returned == "no") {
      query = { returned: false };
    }
    const count = await RentBooks.countDocuments(query);
    const data = await RentBooks.find(query)
      .populate("student_id", "user_name email")
      .populate("book_id", "book_name")
      .limit(limit)
      .skip(limit * page)
      .sort({ createdAt: -1 })
      .exec();
    return ApiResponse.success(
      res,
      "All Rented Books",
      data,
      helper.getPaginationInfo(page, limit, count)
    );
  } catch (error) {
    return ApiResponse.server(res, "Book Server Error");
  }
};

/**
 * The function updates the "returned" field of a rent book record in a database.
 * @returns an API response with a success status code and a message, along with the updated rent book
 * data.
 */
const updateRentBook = async (req, res) => {
  try {
    const { rentId, returned } = req.body;
    const data = await RentBooks.findById(rentIds);
    if (!data) return ApiResponse.notfound(res, "Data Not Found");
    data.returned = returned;
    await data.save();
    return ApiResponse.created(res, "Add Successful", data);
  } catch (error) {
    return ApiResponse.server(res, "Category Server Error");
  }
};

module.exports = { allBooks, addBook, rentBook, allRentedBook, updateRentBook };
