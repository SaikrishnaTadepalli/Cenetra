// require("dotenv").config();

// const PORT = process.env.PORT;

// const BACKEND_URI =
//   process.env.NODE_ENV === "test"
//     ? process.env.TEST_BACKEND_URI
//     : process.env.BACKEND_URI;

// module.exports = {
//   BACKEND_URI,
// };
import { BACKEND_URI, TEST_BACKEND_URI } from "@env";

const dev = {
  BACKEND_URI,
};

const prod = {
  TEST_BACKEND_URI,
};

export default __DEV__ ? dev : prod;
