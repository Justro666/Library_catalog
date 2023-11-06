const ApiResponse = require("../../helper/apiResponse");
const helper = require("../../helper/helper");

module.exports = {
  validateBody: schema => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return ApiResponse.badrequest(res, helper.joi_error(error.details));
    } else {
      next();
    }
  },
  validateParams: (schema, params) => {
    return (req, res, next) => {
      let data = {};
      if (Array.isArray(params)) {
        for (let i = 0; i < params.length; i++) {
          data[`${params[i]}`] = req.params[`${params[i]}`];
        }
      } else {
        data[`${params}`] = req.params[`${params}`];
      }
      let result = schema.validate(data);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  }
};
