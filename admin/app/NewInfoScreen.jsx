import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import colors from "../src/constants/Colors";
import ProfileCard from "../src/components/ProfileCard";
import { approvePendingProfile } from "../src/redux/studentProfileSlice";
import { useDispatch } from "react-redux";

const NewInfoScreen = ({ differences, studentName, profileID }) => {
  const dispatch = useDispatch();
  const [isApproved, setIsApproved] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [isPageShown, setIsPageShown] = useState(true);
  const onSave = () => {
    const adminID = localStorage.getItem("adminID");

    dispatch(
      approvePendingProfile({
        adminID: adminID,
        profileID: profileID,
      })
    )
      .then(() => {
        setIsApproved(true), setIsPageShown(false);
        setTimeout(() => {
          setIsApproved(false);
        }, 2000);
      })
      .catch((error) => console.log(error));
  };

  const onCancel = () => {
    setIsDenied(true);
    setIsPageShown(false);
    setTimeout(() => {
      setIsDenied(false);
    }, 2000);
  };

  const printSectionHeader = (sectionHeader) => {
    if (sectionHeader === "ALLERGIES") {
      return "Allergen";
    } else if (sectionHeader === "MEDICATIONS") {
      return "Medication";
    }
    if (
      sectionHeader === "PRIMARY CONTACTS" ||
      sectionHeader === "EMERGENCY CONTACTS"
    ) {
      return "Contact";
    }
    if (sectionHeader === "BLOOD GROUP") {
      return "Blood Group";
    }
  };

  return (
    <>
      {isDenied ? <Text>The change has been denied.</Text> : null}
      {isApproved ? <Text>The change has been approved!</Text> : null}
      {isPageShown && (
        <>
          {differences &&
            differences.map((difference, idx) => (
              <View key={`difference-header-${idx}`}>
                <Text style={styles.headerText}>
                  {printSectionHeader(difference.sectionHeader)} change
                </Text>
                <Text style={[styles.subHeaderText, { marginBottom: 20 }]}>
                  Student Name: {studentName}{" "}
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 24 }}>
                  <Text style={styles.subHeaderText}>
                    Previous Information:
                  </Text>
                  <ProfileCard
                    sectionHeader={difference.sectionHeader}
                    data={difference.oldData}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.subHeaderText}>New Information:</Text>
                  <ProfileCard
                    sectionHeader={difference.sectionHeader}
                    data={difference.newData}
                  />
                </View>
              </View>
            ))}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.saveButtonContainer}
              onPress={onSave}
            >
              <Text style={styles.saveButtonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButtonContainer}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Deny</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default NewInfoScreen;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontFamily: "InterMedium",
    marginBottom: 24,
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  buttonText: {
    alignSelf: "center",
    color: colors.primaryText,
    fontWeight: 600,
  },
  saveButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    backgroundColor: "#23342C",
    borderRadius: 100,
    marginRight: 10,
  },
  cancelButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    backgroundColor: "white",
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
  },
  saveButtonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  cancelText: {
    color: "black",
    fontSize: 14,
    fontFamily: "InterMedium",
    fontFamily: "InterBold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 100,
  },
});
