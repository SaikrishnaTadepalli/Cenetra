import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { editProfile, updateProfile } from "../redux/studentProfileSlice";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const EditProfileScreen = ({ navigation, route }) => {
  const { editProfileLoading, editProfileError } = useSelector(
    (state) => state.studentProfile
  );
  const [picture, setPicture] = useState("");
  const studentData = JSON.parse(JSON.stringify(route.params.studentData));

  const [primaryContacts, setPrimaryContacts] = useState(
    studentData.information[0].section
  );
  const [emergencyContacts, setEmergencyContacts] = useState(
    studentData.information[1].section
  );

  const [allergies, setAllergies] = useState(
    studentData.information[2].section
  );

  const [medications, setMedications] = useState(
    studentData.information[3].section
  );

  const [bloodGroup, setBloodGroup] = useState(
    studentData.information[4].section
  );

  const renderText = (infoType, state, setState, idx, property) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" ? (
          <Text style={styles.infoTypeText}>{infoType}</Text>
        ) : null}
        <TextInput
          editable={true}
          style={styles.infoInputText}
          value={state[idx][property]}
          onChangeText={(value) =>
            updateItem(state, setState, idx, property, value)
          }
        ></TextInput>
      </View>
    );
  };

  const dispatch = useDispatch();

  const onCancel = () => {
    navigation.goBack();
  };

  const onSave = async () => {
    const updatedInfo = {
      name: studentData.name,
      uri: route.params.profilePic,
      student_number: studentData.student_number,
      information: [
        { sectionHeader: "PRIMARY CONTACTS", section: primaryContacts },
        { sectionHeader: "EMERGENCY CONTACTS", section: emergencyContacts },
        { sectionHeader: "ALLERGIES", section: allergies },
        { sectionHeader: "MEDICATIONS", section: medications },
        { sectionHeader: "BLOOD GROUP", section: bloodGroup },
      ],
    };
    //console.log("------updated info-----", updatedInfo);
    const studentID = await AsyncStorage.getItem("studentID");
    //console.log(JSON.stringify({ updatedInfo2 }));
    dispatch(
      editProfile({
        studentID: studentID,
        details: updatedInfo,
      })
    )
      .then((response) => {
        // console.log(response);
        if (!response.error) {
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        }
      })
      .catch((error) => console.log(error));
  };

  const formatObject = (type) => {
    if (type === "ALLERGIES") {
      return { item: "", severity: "" };
    } else if (type === "MEDICATIONS") {
      return { name: "", dosage: "", frequency: "" };
    }
  };

  const updateItem = (state, setState, idx, property, newData) => {
    setState((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[idx][property] = newData;
      return updatedInputs;
    });
  };

  const addItem = (setState, type) => {
    const newObject = formatObject(type);
    setState((prevInputs) => {
      const updatedInputs = [...prevInputs, newObject];
      return updatedInputs;
    });
  };

  const deleteItem = (setState, idx) => {
    setState((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(idx, 1);
      return updatedInputs;
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageAndChildInfoContainer}>
          <Image
            source={{ uri: route.params.profilePic }}
            width={60}
            height={60}
            style={styles.image}
          />
          <View style={styles.studentDetailsContainer}>
            <Text style={styles.studentName}>{studentData.name}</Text>
            <Text style={styles.studentId}>
              Student ID: {studentData.student_number}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>PRIMARY CONTACTS</Text>
            </View>
            {primaryContacts.map((item, idx) => (
              <View key={`profile-info${idx}`}>
                <Text style={styles.headerText}>{item.title}</Text>
                {renderText(
                  "Name:",
                  primaryContacts,
                  setPrimaryContacts,
                  idx,
                  "name"
                )}
                {renderText(
                  "Relationship:",
                  primaryContacts,
                  setPrimaryContacts,
                  idx,
                  "relationship"
                )}
                {renderText(
                  "Phone number:",
                  primaryContacts,
                  setPrimaryContacts,
                  idx,
                  "phoneNumber"
                )}
                {renderText(
                  "Email:",
                  primaryContacts,
                  setPrimaryContacts,
                  idx,
                  "email"
                )}
                {renderText(
                  "Address:",
                  primaryContacts,
                  setPrimaryContacts,
                  idx,
                  "address"
                )}
                {primaryContacts.indexOf(item) !==
                primaryContacts.length - 1 ? (
                  <View style={styles.divider} />
                ) : null}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>EMERGENCY CONTACTS</Text>
            </View>
            {emergencyContacts.map((item, idx) => (
              <View key={`profile-info${idx}`}>
                <Text style={styles.headerText}>{item.title}</Text>
                {renderText(
                  "Name:",
                  emergencyContacts,
                  setEmergencyContacts,
                  idx,
                  "name"
                )}
                {renderText(
                  "Relationship:",
                  emergencyContacts,
                  setEmergencyContacts,
                  idx,
                  "relationship"
                )}
                {renderText(
                  "Phone number:",
                  emergencyContacts,
                  setEmergencyContacts,
                  idx,
                  "phoneNumber"
                )}
                {renderText(
                  "Email:",
                  emergencyContacts,
                  setEmergencyContacts,
                  idx,
                  "email"
                )}
                {renderText(
                  "Address:",
                  emergencyContacts,
                  setEmergencyContacts,
                  idx,
                  "address"
                )}
                {emergencyContacts.indexOf(item) !==
                emergencyContacts.length - 1 ? (
                  <View style={styles.divider} />
                ) : null}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>ALLERGIES</Text>
              <TouchableOpacity
                onPress={() => addItem(setAllergies, "ALLERGIES")}
              >
                <Ionicons size={24} color={colors.navyBlue} name="add-sharp" />
              </TouchableOpacity>
            </View>
            {allergies.map((item, idx) => (
              <View key={`profile-info${idx}`}>
                {renderText("Item:", allergies, setAllergies, idx, "name")}
                <View
                  style={{
                    flexDirection: "row",
                    width: "85%",
                  }}
                >
                  {renderText(
                    "Severity:",
                    allergies,
                    setAllergies,
                    idx,
                    "severity"
                  )}
                  <TouchableOpacity
                    onPress={() => deleteItem(setAllergies, idx)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                {allergies.indexOf(item) !== allergies.length - 1 ? (
                  <View style={styles.divider} />
                ) : null}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>MEDICATIONS</Text>
              <TouchableOpacity
                onPress={() => addItem(setMedications, "MEDICATIONS")}
              >
                <Ionicons size={28} color={colors.navyBlue} name="add-sharp" />
              </TouchableOpacity>
            </View>
            {medications.map((item, idx) => (
              <View key={`profile-info${idx}`}>
                {renderText("Name:", medications, setMedications, idx, "name")}
                {renderText(
                  "Dosage:",
                  medications,
                  setMedications,
                  idx,
                  "dosage"
                )}
                <View style={{ flexDirection: "row", width: "85%" }}>
                  {renderText(
                    "Frequency:",
                    medications,
                    setMedications,
                    idx,
                    "frequency"
                  )}
                  <TouchableOpacity
                    onPress={() => deleteItem(setMedications, idx)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                {medications.indexOf(item) !== medications.length - 1 ? (
                  <View style={styles.divider} />
                ) : null}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>BLOOD GROUP</Text>
            </View>
            {bloodGroup.map((item, idx) => (
              <View key={`profile-info${idx}`}>
                {renderText("", bloodGroup, setBloodGroup, idx, "name")}
              </View>
            ))}
          </View>
        </View>
      </View>
      {editProfileLoading ? (
        <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 16 }}>
          Sending for approval....
        </Text>
      ) : null}
      {editProfileError ? (
        <Text style={styles.errorText}>Error while saving changes.</Text>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          marginRight: 10,
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity>
          <Text style={styles.cancelText} onPress={onCancel}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveText}>Send for approval</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

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
  cardContainer: {
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "white",
    paddingVertical: 16,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: colors.lightGrey,
    shadowOffset: { height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginBottom: 10,
  },
  infoContainer: {
    // marginLeft: 10,
  },
  sectionHeaderText: {
    color: colors.navyBlue,
    fontFamily: "InterSemiBold",
    fontSize: 16,
  },
  headerText: {
    color: "black",
    fontFamily: "InterSemiBold",
    fontSize: 16,
    marginBottom: 5,
  },
  infoLineContainer: {
    flexDirection: "row",
    marginBottom: 8,
    width: "100%",
  },
  infoTypeText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginRight: 10,
  },
  infoInputText: {
    fontSize: 16,
    fontFamily: "InterRegular",
    width: "70%",
    flexWrap: "wrap",
  },
  healthInfoContainer: {
    flexDirection: "row",
  },
  divider: {
    borderColor: colors.lightGrey,
    width: "95%",
    marginRight: 10,
    marginVertical: 10,
    alignSelf: "center",
    borderWidth: 0.5,
  },
  errorText: {
    color: colors.red,
    fontFamily: "InterMedium",
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
    marginRight: 10,
  },
  deleteText: {
    color: colors.red,
    fontSize: 16,
    fontFamily: "InterRegular",
  },
});
