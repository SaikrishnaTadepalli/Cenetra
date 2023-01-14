const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/injex");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

const DN_Name = "cenetra-dev";
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://Cenetra:<Password>@cluster0.5eznkpa.mongodb.net/${DN_Name}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB. App running on port 3000");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
