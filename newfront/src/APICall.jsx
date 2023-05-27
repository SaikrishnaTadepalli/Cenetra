import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const APICall = () => {
  // -------------------------
  // Generic Make Request
  // -------------------------

  // This is just a helper function. All the way at the bottom of the code
  // I have a commented out version without the MakeRequest function. I
  // am using this here because the focus is on the JSON strinfigy/parse.
  const MakeRequest = async (reqBody) => {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    });

    const res = await response.json();
    return res;
  };

  // -------------------------
  // Get Latest Profile Info
  // -------------------------

  // This function handles getting the info and parsing the stringified JSON
  const handlePress1 = async (studentId) => {
    try {
      // Do whatever you need here

      // Standard API Call
      const res = await MakeRequest(
        JSON.stringify({
          query: `
            query {
                getLatestProfileInfo(studentId: "${studentId}") {
                    _id
                    details
                }   
            }
        `,
        })
      );

      // Extracting JSON here
      const detailsJSON = JSON.parse(res.data.getLatestProfileInfo.details); // anoter way to do it: res.data["getLatestProfileInfo"]["details"]
      console.log(detailsJSON);

      // Do whatever you need with the detailsJSON
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // -------------------------
  // Add Profile Info
  // -------------------------

  // Random Test Data for Uploading, in JSON format
  const data = {
    one: "one",
    two: ["t", "w", "o"],
    three: {
      t: "t",
      h: "h",
      r: "r",
      e: ["e", "e"],
    },
    four: {
      f: {
        o: {
          u: {
            r: [["f", ["o", ["u"], ["r"]]], 4],
          },
        },
      },
    },
    five: [{ f: "f" }, { i: "i" }, { v: "v" }, { e: "e" }],
  };

  // This function handles stringifying JSON data and uploading the string
  const handlePress2 = async (studentId, data) => {
    try {
      // Do whatever you need here, for ex. preprocessing/input verification

      // Creating JSON string here
      const details = JSON.stringify(data)
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"');

      // Standard API call
      const res = await MakeRequest(
        JSON.stringify({
          query: `
            mutation {
                addProfileInfo(studentId: "${studentId}", details: "${details}") {
                    _id
                    details
                }
            }
        `,
        })
      );

      console.log(res);

      // Do whatever you need with 'res'
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <View style={{ marginVertical: "40px" }}>
      <TouchableOpacity
        onPress={() => handlePress1("6462cf2be55c98895096ea49")}
        style={{ borderColor: "white", borderWidth: 1, padding: "20px" }}
      >
        <Text style={{ color: "white" }}>Get Latest Profile Info</Text>
      </TouchableOpacity>
      <View style={{ marginVertical: "20px" }}></View>
      <TouchableOpacity
        onPress={() => handlePress2("6462cf2be55c98895096ea49", data)}
        style={{ borderColor: "white", borderWidth: 1, padding: "20px" }}
      >
        <Text style={{ color: "white" }}>Add New Profile Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default APICall;

const styles = StyleSheet.create({});

// THE BELOW IS THE SAME THING BUT WITHOUT A 'MakeRequest' HELPER FUNCTION

/*


// -------------------------
  // Get Latest Profile Info
  // -------------------------
  const handlePress1 = async (studentId) => {
    try {
      // Standard API Call
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
                getLatestProfileInfo(studentId: "${studentId}") {
                    _id
                    details
                }
            }
        `,
        }),
      });

      const res = await response.json();

      // Extracting JSON here
      const detailsJSON = JSON.parse(res.data.getLatestProfileInfo.details);
      // const detailsJSON = JSON.parse(res.data["getLatestProfileInfo"]["details"]);
      console.log(detailsJSON);

      // Do whatever you need with the detailsJSON
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // -------------------------
  // Add Profile Info
  // -------------------------

  // Random Test Data
  const data = {
    one: "one",
    two: ["t", "w", "o"],
    three: {
      t: "t",
      h: "h",
      r: "r",
      e: ["e", "e"],
    },
    four: {
      f: {
        o: {
          u: {
            r: [["f", ["o", ["u"], ["r"]]], 4],
          },
        },
      },
    },
  };

  const handlePress2 = async (studentId, data) => {
    try {
      // Creating JSON string here
      const details = JSON.stringify(data)
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"');

      // Standard API call
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
                addProfileInfo(studentId: "${studentId}", details: "${details}") {
                    _id
                    details
                }
            }
        `,
        }),
      });
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log("error: ", error);
    }
  };


*/
