const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
// const Redis = require("async-redis").createClient();

module.exports = {
  encode: password => bcrypt.hashSync(password, 10),
  comparePass: (plain, hash) => bcrypt.compareSync(plain, hash),
  token: payload =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" }),
  refreshToken: payload =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" }),
  joi_error: errors =>
    Object.assign(
      {},
      ...errors.map(err => {
        return { [err.path[0]]: err.message };
      })
    ),
  getPaginationInfo: (page, limit, count) => {
    return {
      page: +page,
      limit: +limit,
      totalCount: count,
      totalPages: Math.ceil(count / limit)
    };
  },
  generate_password: (passLength = 10) => {
    let chars =
      "0123456789~!@#$%^&*()_+}{[]|abcdefghikjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    for (let i = 0; i < passLength; i++) {
      let randPass = Math.floor(Math.random() * chars.length);
      pass += chars.substring(randPass, randPass + 1);
    }
    return pass;
  },
  date_format: date => moment(date).format("YYYY-MM-D h:mm:ss")
  // setRedis: async (id, value) =>
  //   await Redis.set(id.toString(), JSON.stringify(value)),
  // getRedis: async id => JSON.parse(await Redis.get(id.toString())),
  // dropRedis: async id => await Redis.del(id.toString())
};
