const execRequest = async (query) => {
  try {
    const endpoint = "http://18.206.57.12:8080/graphql";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    //console.log(info);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default execRequest;
