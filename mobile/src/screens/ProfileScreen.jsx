import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../constants/Colors";
import ProfileCard from "../components/ProfileCard";
import {
  fetchPendingProfile,
  fetchProfile,
} from "../redux/studentProfileSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getViewUrl } from "../redux/mediaSlice";
import EmptyState from "../components/EmptyState";

const ProfileScreen = ({ navigation }) => {
  //const [isEditable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const {
    fetchProfileLoading,
    fetchProfileError,
    isEditDisabled,
    studentInfo,
    lastUpdated,
  } = useSelector((state) => state.studentProfile);
  const { viewUrlLoading } = useSelector((state) => state.media);
  const onPressEdit = () => {
    navigation.navigate("EditProfile", {
      studentData: studentInfo,
      profilePic: imageUrl,
    });
  };

  const retrieveData = async () => {
    const studentID = await AsyncStorage.getItem("studentID");
    dispatch(fetchProfile(studentID))
      .then((response) => {
        if (response.error) {
          if (response.payload === "500") {
            setError("500");
          } else {
            setError("Something went wrong please try again.");
          }
        } else {
          dispatch(getViewUrl(response.payload.profilePic)).then((response) => {
            if (response.error) {
              setError("Error while retrieving image.");
            } else {
              setImageUrl(response.payload.data.getS3ViewUrl);
            }
          });
        }
      })

      .catch((error) => console.error("Error in Profile Screen screen", error));
  };

  const getPendingProfile = async () => {
    const studentID = await AsyncStorage.getItem("studentID");
    dispatch(fetchPendingProfile(studentID))
      .then((response) => {
        if (response.error) {
        } else {
        }
      })
      .catch((error) =>
        console.error("Error in fetching pending Profile Screen screen", error)
      );
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
      getPendingProfile();
      return () => {
        // Clean up any resources if needed
      };
    }, [])
  );
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    retrieveData();
    getPendingProfile();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);
  //console.log(studentInfo);
  return (
    <>
      {error !== "" && error !== "500" ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error while retrieving data</Text>
          <TouchableOpacity
            onPress={retrieveData}
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text style={styles.reloadButtonText}>Reload Data</Text>
          </TouchableOpacity>
        </View>
      ) : error === "500" ? (
        <View style={{ height: "100%", justifyContent: "center" }}>
          <EmptyState emptyStateText="No profile exists for this student" />
        </View>
      ) : null}
      {(fetchProfileLoading || viewUrlLoading) && !refreshing ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.indicator}
        />
      ) : (
        !fetchProfileError && (
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 50 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.profileContainer}>
              {/* <TouchableOpacity onPress={onPressEdit} disabled={isEditDisabled}>
                <Text
                  style={[
                    styles.buttonText,
                    { opacity: isEditDisabled ? 0.5 : 1 },
                  ]}
                >
                  Edit
                </Text>
              </TouchableOpacity> */}
              <View style={styles.imageAndChildInfoContainer}>
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    width={60}
                    height={60}
                    style={styles.image}
                  />
                ) : null}
                <View style={styles.studentDetailsContainer}>
                  <Text style={styles.studentName}>{studentInfo.name}</Text>
                  <Text style={styles.studentId}>
                    Student ID: {studentInfo.student_number}
                  </Text>
                </View>
              </View>
            </View>
            {/* {isEditDisabled ? (
              <Text>Your changes have been sent for approval</Text>
            ) : null} */}
            <View style={styles.profileContainer}>
              {studentInfo.information
                ? studentInfo.information.map((item, idx) => (
                    <ProfileCard
                      sectionHeader={item.sectionHeader}
                      data={item.section}
                      key={idx}
                      title={item.title}
                    />
                  ))
                : null}
            </View>
            <Text style={styles.footerText}>Last Updated {lastUpdated}</Text>
          </ScrollView>
        )
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 15,
    fontFamily: "InterBold",
    textAlign: "right",
    marginBottom: 8,
  },
  profileContainer: {
    paddingVertical: 16,
    width: "100%",
  },
  imageAndChildInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  studentDetailsContainer: {
    marginLeft: 10,
  },
  studentName: {
    fontFamily: "InterBold",
    fontSize: 16,
    color: colors.navyBlue,
  },
  studentId: {
    fontFamily: "InterMedium",
    fontSize: 14,
    color: colors.navyBlue,
  },
  section: {
    fontFamily: "InterMedium",
    fontSize: 14,
    color: colors.navyBlue,
  },
  footerText: {
    alignSelf: "center",
    color: colors.darkGrey,
  },
  saveButton: {
    marginLeft: 18,
  },
  saveText: {
    color: colors.buttonText,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "InterBold",
  },
  cancelText: {
    color: colors.red,
    fontSize: 18,
    fontFamily: "InterBold",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },

  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 999,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  errorText: {
    color: colors.red,
    fontFamily: "InterMedium",
    fontSize: 20,
  },
  reloadButtonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "InterMedium",
  },
});
