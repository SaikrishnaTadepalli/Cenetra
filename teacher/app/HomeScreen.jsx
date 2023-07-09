import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import colors from "../src/constants/Colors";
import ProfileScreen from "./ProfileScreen";
import { fetchProfile } from "../src/redux/studentProfileSlice";
import { getViewUrl } from "../src/redux/mediaSlice";

const HomeScreen = () => {
  const { loginLoading } = useSelector((state) => state.auth);
  const [studentID, setStudentID] = useState("");
  const s = localStorage.getItem("students");
  const s2 = JSON.parse(s);
  const [error, setError] = useState("");
  const students = s2 && JSON.parse(s2).students;
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (studentID) => {
    // console.log(studentID);
    setStudentID(studentID);
    setError("");
    dispatch(fetchProfile(studentID))
      .then((response) => {
        if (response.error) {
          if (
            response.payload ===
            "Response status 500: Error while fetching student profile for teacher"
          ) {
            // console.log("-----response-------");
            setError("500");
          }
        } else {
          console.log(response.payload.profilePic);
          dispatch(getViewUrl(response.payload.profilePic)).then((response) => {
            if (response.error) {
              setError("Error while retrieving image.");
            } else {
              console.log(response);
              setImageUrl(response.payload.data.getS3ViewUrl);
            }
          });
        }
      })
      .catch((error) => console.error("Error in Profile Screen screen", error));
  };

  // useEffect(() => {
  //   if (!loginLoading && !isLoggedIn) {
  //     router.push("/LoginScreen");
  //   }
  // }, [router, loginLoading, isLoggedIn]);
  // console.log(localStorage.getItem("students"));
  return (
    <View style={styles.container}>
      {loginLoading ? (
        <Text style={styles.text}>Loading details...</Text>
      ) : (
        <>
          <Text style={styles.headerText}>My Class</Text>
          <View style={{ flexDirection: "row", height: "100%" }}>
            <ScrollView
              contentContainerStyle={styles.listView}
              nestedScrollEnabled={true}
            >
              {students &&
                students.map((student, idx) => (
                  <TouchableOpacity
                    style={[
                      styles.cardContainer,
                      {
                        backgroundColor:
                          student._id === studentID
                            ? "rgba(187, 157, 191, 0.4)"
                            : "rgba(217, 217, 217, 0.3)",
                      },
                    ]}
                    key={`name-${idx}`}
                    onPress={() => handleClick(student._id)}
                  >
                    <Text
                      style={[
                        styles.nameText,
                        {
                          color:
                            student._id === studentID ? "#4F0059" : "#5E5E5E",
                        },
                      ]}
                    >
                      {student.firstName + " " + student.lastName}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                // height: "100%",
                width: "50%",
                marginTop: -45,
                // backgroundColor: "green",
              }}
            >
              <View style={styles.verticalDivider} />
              {error === "500" ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.emptyText}>
                    No profile exists for this student
                  </Text>
                </View>
              ) : (
                <ProfileScreen curStudentID={studentID} imageUrl={imageUrl} />
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // width: "80%",
    height: "100%",
    // backgroundColor: "red",
  },
  headerText: {
    fontSize: 30,
    marginLeft: 30,
    marginTop: 60,
    fontFamily: "InterBold",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  listView: {
    width: "30%",
    marginLeft: 30,
    //flex: 1,
  },
  cardContainer: {
    width: 300,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    marginBottom: 10,
    paddingLeft: 10,
  },
  nameText: {
    fontFamily: "InterMedium",
    fontSize: 16,
  },
  verticalDivider: {
    borderLeftColor: "#D9D9D980",
    borderLeftWidth: 1,
    marginRight: 50,
    marginLeft: "-45%",
  },
  emptyText: {
    fontFamily: "InterSemiBold",
    fontSize: 20,
    color: "#99B8BE",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 300,
    alignItems: "center",
  },
});
