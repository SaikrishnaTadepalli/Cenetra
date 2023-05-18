module.exports = {
  // Queries
  test: async (args) => {
    try {
      return args.input;
    } catch (err) {
      throw err;
    }
  },
};

/*
query {
    test(input: "teststring")
}


*/
