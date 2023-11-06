const Joi = require("joi");

module.exports = {
  Schema: {
    addUser: Joi.object({
      username: Joi.string().required().max(15),
      email: Joi.string().required().max(30).email(),
      password: Joi.string().required().min(8).max(20)
    }),
    userLogin: Joi.object({
      email: Joi.string().required().max(30).email(),
      password: Joi.string().required().min(8).max(20)
    }),
    addCatalogue: Joi.object({
      catalogue_name: Joi.string().required().max(20)
    }),
    updateCatalogue: Joi.object({
      catalogue_name: Joi.string().required().max(20),
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    idParams: Joi.object({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    addCategory: Joi.object({
      category_name: Joi.string().required().max(20)
    }),
    updateCategory: Joi.object({
      category_name: Joi.string().required().max(20),
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    addAuthor: Joi.object({
      name: Joi.string().required().max(20),
      age: Joi.number().max(100).required()
    }),
    updateAuthor: Joi.object({
      name: Joi.string().required().max(20),
      age: Joi.number().max(100).required(),
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    singleAuthor: Joi.object({
      name: Joi.string().max(20),
      age: Joi.number().max(100)
    }),
    addBook: Joi.object({
      name: Joi.string().max(30).required(),
      author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      catalogue: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      categories: Joi.allow()
    }),
    allBook: Joi.object({
      bookName: Joi.string().max(20),
      author: Joi.string().max(20),
      catalogue: Joi.string().max(20),
      categories: Joi.allow()
    }),
    rentBook: Joi.object({
      bookId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    returnRentBook: Joi.object({
      rentId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      returned: Joi.boolean().required()
    })
  }
};
