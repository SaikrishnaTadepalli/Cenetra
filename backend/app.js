const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql").graphqlHTTP;

const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./utils/config");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

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
