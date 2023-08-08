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

import { useDispatch } from "react-redux";
import {
  addNewProfile,
  editProfile,
  setIsNewProfileAdded,
} from "../src/redux/studentProfileSlice";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const CreateProfileScreen = ({
  studentName,
  studentNumber,
  studentID,
  setStudentID,
  setStudentName,
  setStudentNumber,
  isEdit,
  imageUrl,
}) => {
  const { addNewProfileLoading, addNewProfileError, studentInfo } = useSelector(
    (state) => state.studentProfile
  );
  const [picture, setPicture] = useState("");
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  //const studentData = JSON.parse(JSON.stringify(route.params.studentData));

  const primaryContact1InitialState = {
    title: "Primary Contact 1 information",
    name: "",
    relationship: "",
    phoneNumber: "",
    email: "",
    address: "",
  };
  const primaryContact2InitialState = {
    title: "Primary Contact 2 information",
    name: "",
    relationship: "",
    phoneNumber: "",
    email: "",
    address: "",
  };

  const emergencyContact1InitialState = {
    title: "Emergency Contact 1 information",
    name: "",
    relationship: "",
    phoneNumber: "",
    email: "",
    address: "",
  };
  const emergencyContact2InitialState = {
    title: "Emergency Contact 2 information",
    name: "",
    relationship: "",
    phoneNumber: "",
    email: "",
    address: "",
  };

  const allergiesInitialState = {
    name: "",
    severity: "",
  };

  const medicationsInitialState = {
    name: "",
    dosage: "",
    frequency: "",
  };

  const bloodGroupInitialState = {
    name: "",
  };
  const areAllFieldsFilled = (array) => {
    let allFieldsFilled = true;

    array.forEach((obj) => {
      console.log(obj);
      for (const key in obj) {
        if (!obj[key]) {
          allFieldsFilled = false;
          return; // Found an empty field, exit the loop
        }
      }
    });

    return allFieldsFilled;
  };

  const copyOfObject = () => {};

  const [primaryContacts, setPrimaryContacts] = useState(
    isEdit
      ? studentInfo.information[0].section.slice()
      : [primaryContact1InitialState]
  );
  const [emergencyContacts, setEmergencyContacts] = useState(
    isEdit
      ? studentInfo.information[1].section
      : [emergencyContact1InitialState]
  );

  const [allergies, setAllergies] = useState(
    isEdit ? studentInfo.information[2].section : [allergiesInitialState]
  );

  const [medications, setMedications] = useState(
    isEdit ? studentInfo.information[3].section : [medicationsInitialState]
  );

  const [bloodGroup, setBloodGroup] = useState(
    isEdit ? studentInfo.information[4].section : [bloodGroupInitialState]
  );

  const renderText = (infoType, state, setState, idx, property) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" && <Text style={styles.infoTypeText}>{infoType}</Text>}
        <TextInput
          editable={isEditable}
          style={styles.infoInputText}
          value={isEditable ? state[idx][property] : ""}
          onChangeText={(value) =>
            updateItem(state, setState, idx, property, value)
          }
        ></TextInput>
      </View>
    );
  };

  const dispatch = useDispatch();
  const handleDispatch = (action) => {
    dispatch(action)
      .then((response) => {
        if (response.error) {
          setError("Something went wrong please try again.");
          setTimeout(() => setError(""), 2000);
        } else {
          if (!addNewProfileLoading) {
            setIsSaved(true);
            setIsButtonDisabled(true);
            setIsEditable(false);
            setTimeout(() => {
              setIsSaved(false);
              setIsButtonDisabled(false);
              dispatch(setIsNewProfileAdded(false));
              setPrimaryContacts([
                primaryContact1InitialState,
                primaryContact2InitialState,
              ]);
              setEmergencyContacts([
                emergencyContact1InitialState,
                emergencyContact2InitialState,
              ]);
              setAllergies([allergiesInitialState]);
              setMedications([medicationsInitialState]);
              setBloodGroup([bloodGroupInitialState]);
              // setStudentName("");
              setStudentNumber("");
              setIsEditable(true);
            }, 2000);
          }
        }
      })
      .catch((error) => {
        setError("Something went wrong please try again");
        console.error("Catch: Error while creating student profile", error);
      });
  };
  // else {
  //   setError("Please fill in all the fields.");
  //   setTimeout(() => setError(""), 2000);
  // }

  const onSave = () => {
    var action = "";
    const adminID = localStorage.getItem("adminID");
    const updatedInfo = {
      name: studentName,
      // uri: studentData.uri,
      student_number: studentNumber,
      information: [
        { sectionHeader: "PRIMARY CONTACTS", section: primaryContacts },
        { sectionHeader: "EMERGENCY CONTACTS", section: emergencyContacts },
        { sectionHeader: "ALLERGIES", section: allergies },
        { sectionHeader: "MEDICATIONS", section: medications },
        { sectionHeader: "BLOOD GROUP", section: bloodGroup },
      ],
    };
    if (
      areAllFieldsFilled(primaryContacts) &&
      areAllFieldsFilled(emergencyContacts) &&
      areAllFieldsFilled(bloodGroup)
    ) {
      if (!isEdit) {
        action = addNewProfile({ studentID: studentID, details: updatedInfo });
      } else {
        action = editProfile({
          studentID: studentID,
          details: updatedInfo,
          adminID: adminID,
        });
      }
      handleDispatch(action);
    } else {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 2000);
    }
  };

  const onCancel = () => {
    setIsCancelled(true);
    dispatch(setIsNewProfileAdded(false));
    //dispatch(setIsNewClassAdded(false));
    setTimeout(() => {
      setIsCancelled(false);
    }, 2000);
  };

  const formatObject = (type) => {
    if (type === "ALLERGIES") {
      return { item: "", severity: "" };
    } else if (type === "MEDICATIONS") {
      return { name: "", dosage: "", frequency: "" };
    } else if (type === "PRIMARY CONTACTS") {
      return {
        title: "Primary Contact 2 information",
        name: "",
        relationship: "",
        phoneNumber: "",
        email: "",
        address: "",
      };
    } else if (type === "EMERGENCY CONTACTS") {
      return {
        title: "Emergency Contact 2 information",
        name: "",
        relationship: "",
        phoneNumber: "",
        email: "",
        address: "",
      };
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
  //console.log(error);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageAndChildInfoContainer}>
          <Image
            source={{ uri: imageUrl }}
            width={60}
            height={60}
            style={styles.image}
          />
          <View style={styles.studentDetailsContainer}>
            <Text style={styles.studentName}>Name: {studentName}</Text>
            <Text style={styles.studentId}>Student ID: {studentNumber}</Text>
          </View>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>
                Primary Contact information
              </Text>
              {primaryContacts.length < 2 && (
                <TouchableOpacity
                  onPress={() =>
                    addItem(setPrimaryContacts, "PRIMARY CONTACTS")
                  }
                  style={styles.addButtonContainer}
                >
                  <Ionicons size={20} color={"#024552"} name="add-sharp" />
                </TouchableOpacity>
              )}
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
                {idx === 1 && (
                  <TouchableOpacity
                    onPress={() => deleteItem(setPrimaryContacts, idx)}
                    style={styles.deleteButtonContainer}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        </View>
        <View>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>
                Emergency Contact information
              </Text>
              {emergencyContacts.length < 2 && (
                <TouchableOpacity
                  onPress={() =>
                    addItem(setEmergencyContacts, "EMERGENCY CONTACTS")
                  }
                  style={styles.addButtonContainer}
                >
                  <Ionicons size={20} color={"#024552"} name="add-sharp" />
                </TouchableOpacity>
              )}
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
                {idx === 1 && (
                  <TouchableOpacity
                    onPress={() => deleteItem(setEmergencyContacts, idx)}
                    style={styles.deleteButtonContainer}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        </View>
        <View>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>Allergen information</Text>
              <TouchableOpacity
                onPress={() => addItem(setAllergies, "ALLERGIES")}
                style={styles.addButtonContainer}
              >
                <Ionicons size={20} color={"#024552"} name="add-sharp" />
              </TouchableOpacity>
            </View>
            {allergies.map((item, idx) => (
              <View key={`profile-info${idx}`}>
                {renderText("Item:", allergies, setAllergies, idx, "name")}
                {renderText(
                  "Severity:",
                  allergies,
                  setAllergies,
                  idx,
                  "severity"
                )}
                <TouchableOpacity
                  onPress={() => deleteItem(setAllergies, idx)}
                  style={styles.deleteButtonContainer}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        </View>
        <View>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>Medications</Text>
              <TouchableOpacity
                onPress={() => addItem(setMedications, "MEDICATIONS")}
                style={styles.addButtonContainer}
              >
                <Ionicons size={20} color={"#024552"} name="add-sharp" />
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
                {renderText(
                  "Frequency:",
                  medications,
                  setMedications,
                  idx,
                  "frequency"
                )}
                <TouchableOpacity
                  onPress={() => deleteItem(setMedications, idx)}
                  style={styles.deleteButtonContainer}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        </View>
        <View>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionHeaderText}>Blood Group</Text>
            </View>
            {bloodGroup.map((item, idx) => (
              <View key={`profile-info${idx}`}>
                {renderText("", bloodGroup, setBloodGroup, idx, "name")}
              </View>
            ))}
          </View>
        </View>
      </View>
      {addNewProfileLoading ? (
        <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 16 }}>
          Adding profile....
        </Text>
      ) : null}
      {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
      {isSaved && (
        <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 16 }}>
          Successfully added profile!
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            { opacity: isButtonDisabled ? 0.5 : 1 },
          ]}
          onPress={onSave}
          disabled={isButtonDisabled}
        >
          <Text style={styles.saveButtonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButtonContainer}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderColor: "#D9D9D980",
    borderWidth: 1,
  },
  buttonText: {
    color: "pink",
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
    fontSize: 20,
    color: "#23342C",
    marginBottom: 10,
  },
  studentId: {
    fontFamily: "InterMedium",
    fontSize: 16,
    color: "#23342C",
  },
  section: {
    fontFamily: "InterMedium",
    fontSize: 14,
    color: "pink",
  },
  footerText: {
    alignSelf: "center",
    color: "pink",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 100,
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
  addButtonContainer: {
    backgroundColor: "#99B8BE99",
    padding: 1,
    borderRadius: 5,
  },
  deleteButtonContainer: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: -20,
  },
  saveButtonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 14,
    fontFamily: "InterMedium",
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
    borderColor: "pink",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "pink",
    shadowOffset: { height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginBottom: 10,
  },
  infoContainer: {
    // marginLeft: 10,
  },
  sectionHeaderText: {
    color: "#23342C",
    fontFamily: "InterSemiBold",
    fontSize: 18,
    marginRight: 15,
  },
  headerText: {
    color: "black",
    fontFamily: "InterSemiBold",
    fontSize: 16,
    marginBottom: 15,
  },
  infoLineContainer: {
    flexDirection: "row",
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  infoTypeText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    width: "20%",
    // marginRight: 40,
  },
  infoInputText: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 40,
    width: 230,
    paddingVertical: 10,
    borderColor: "rgba(217, 217, 217, 0.50)",
    borderBottomColor: "#D9D9D9",
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  healthInfoContainer: {
    flexDirection: "row",
  },
  divider: {
    borderColor: "#D9D9D9",
    width: "95%",
    marginRight: 10,
    marginVertical: 20,
    alignSelf: "center",
    borderWidth: 0.5,
  },
  errorText: {
    color: "red",
    fontFamily: "InterMedium",
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // justifyContent: "space-between",
    marginRight: 10,
  },
  deleteText: {
    color: "red",
    fontSize: 16,
    fontFamily: "InterRegular",
  },
});
