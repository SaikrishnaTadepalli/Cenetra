const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const { graphqlUploadExpress } = require("graphql-upload");

const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./utils/config");
const cors = require("cors");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  cors(),
  graphqlUploadExpress({
    maxFileSize: 10 * 1024 * 1024 * 1024, // 10GB in bytes
    maxFiles: 10, // Maximum number of files allowed
  }),
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

// app.get("/products/:id", function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for all origins!" });
// });

// app.listen(3000, function () {
//   console.log("CORS-enabled web server listening on port 3000");
// });

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB. App running on port: ${config.PORT}.`);
    app.listen(config.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
//app.listen(config.PORT);
