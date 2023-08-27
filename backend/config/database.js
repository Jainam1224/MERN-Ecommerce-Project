const mongoose = require("mongoose");

// .connect(process.env.DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// })

// In the above code the object having useNewUrlParser, useUnifiedTopology and useCreateIndex
// is not needed after mongoose vesion 6

// This is how we create the mongodb connection
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

module.exports = connectDatabase;
