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

const HomeScreen = () => {
  const { pending, isLoggedIn, students } = useSelector((state) => state.auth);
  const [studentID, setStudentID] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (studentID) => {
    setStudentID(studentID);
    dispatch(fetchProfile(studentID))
      .then((response) => {})
      .catch((error) => console.log("Error in Profile Screen screen", error));
  };

  // useEffect(() => {
  //   if (!pending && !isLoggedIn) {
  //     router.push("/LoginScreen");
  //   }
  // }, [router, pending, isLoggedIn]);

  return (
    <View style={styles.container}>
      {pending ? (
        <Text style={styles.text}>Loading details...</Text>
      ) : (
        <>
          <Text style={styles.header}>My Class</Text>
          <View style={{ flexDirection: "row" }}>
            <ScrollView contentContainerStyle={styles.listView}>
              {students.map((student, idx) => (
                <TouchableOpacity
                  style={styles.buttonContainer}
                  key={`name-${idx}`}
                  onPress={() => handleClick(student._id)}
                >
                  <Text>{student.firstName + " " + student.lastName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ProfileScreen curStudentID={studentID} />
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  header: {
    fontSize: 20,
    marginLeft: 30,
    marginTop: 60,
    fontWeight: 600,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  listView: {
    width: "30%",
    marginLeft: 30,
    //flex: 1,
  },
  buttonContainer: {
    width: "100%",
    minHeight: 40,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
});
