// const { faker } = require("@faker-js/faker");x/x
const mongoose = require("mongoose");
const User = require("./device");

async function seedData() {
  // Connection URL
  const uri = `mongodb://localhost:27017/${process.env.DB_NAME}`;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to db");
    })
    .catch(err => {
      console.log("error", err);
    });

  const users = [
    { user_name: "Zaw Phyo Aung", password: "12345678", phone: "959795659575" },
    { user_name: "Yan Yan", password: "12345678", phone: "9595959" }
  ];
  //  const users = Array.from({
  //    length: 10
  //  }).map(() => ({
  //    a_name: faker.person.fullName(),
  //    a_email: faker.internet.email(),
  //    a_password: faker.internet.password(),
  //    a_verify: 1,
  //    a_secret_code: faker.string.alpha({ count: 22, casing: "lower" }),
  //    a_gender: 1,
  //    a_phone: faker.phone.number()
  //  }));

  async function main() {
    await User.insertMany(device);
  }

  main().then(() => {
    mongoose.connection.close();
    console.log("seed success");
  });
}

seedData();
