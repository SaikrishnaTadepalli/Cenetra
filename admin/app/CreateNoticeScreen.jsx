import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { React, useEffect, useState } from "react";

import colors from "../src/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  createNotices,
  editNotices,
  getIsNewNoticeAdded,
  setIsNewNoticeAdded,
} from "../src/redux/noticeSlice";
import typeColorMapping from "../api/typeColorMapping";
import Dropdown from "../src/components/DropDown";

const CreateNoticeScreen = ({ date, noticeID, setIsOldNoticeSelected }) => {
  const [isEditable, setEditable] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.notices);
  const { createNoticesError, createNoticesPending, notices } = state;
  const findNoticeById = (id) => {
    let foundNotice = null;

    notices.forEach((segment) => {
      const notice = segment.data.find((item) => item._id === id);
      if (notice) {
        foundNotice = notice;
      }
    });

    return foundNotice;
  };

  const notice = findNoticeById(noticeID);

  const students = notice && notice.students;
  const noticeDetails = notice && JSON.parse(notice.details);
  const [subject, setSubject] = useState(
    noticeDetails ? noticeDetails.subject : ""
  );
  const [details, setDetails] = useState(
    noticeDetails ? noticeDetails.details : ""
  );
  const [isCancelled, setIsCancelled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const isAddNewNoticeSelected = getIsNewNoticeAdded(state);
  const types = ["Urgent", "Serious", "Casual"];
  const [selectedType, setSelectedType] = useState(
    notice ? notice.noticeType : types[0]
  );
  const studentInfo =
    students &&
    students.map((student) => ({
      key: `"${student._id}"`,
      value: student.firstName + " " + student.lastName,
    }));
  const [selectedStudents, setSelectedStudents] = useState(studentInfo);
  const getInputValue = (input) => {
    // console.log("-----------------------------");
    // console.log(
    //   (input.key.charAt(0) === '"' ? input.key.slice(1, -1) : input.key) ===
    //     (item.key.charAt(0) === '"' ? item.key.slice(1, -1) : item.key)
    // );
    return input.key.charAt(0) === '"' ? input.key.slice(1, -1) : input.key;
  };
  const handleCheckboxSelection = (input) => {
    console.log(input, selectedStudents);
    const idx = selectedStudents.findIndex(
      (item) => getInputValue(item) === getInputValue(input)
    );
    const selected = [...selectedStudents];
    if (idx !== -1) {
      selected.splice(idx, 1);
      setSelectedStudents(selected);
    } else {
      selected.push(input);
      setSelectedStudents(selected);
    }
  };

  const onPressDelete = (idx) => {
    const updatedItems = [...selectedStudents];
    updatedItems.splice(idx, 1);
    setSelectedStudents(updatedItems);
  };

  const handleSelectAll = () => {
    if (studentInfo.length === selectedStudents.length) {
      // Deselect all options
      setSelectedStudents([]);
    } else {
      // Select all options
      setSelectedStudents(studentInfo);
    }
  };

  const onSave = () => {
    // console.log(selectedType);
    const adminName = localStorage.getItem("adminName");
    if (subject && details) {
      const newNotice = {
        subject: subject,
        details: details,
      };
      const studentIDs = selectedStudents.map((student) => student.key);
      //console.log(studentIDs);
      dispatch(
        editNotices({
          noticeID: noticeID,
          studentIDs: studentIDs,
          details: newNotice,
          noticeType: selectedType,
          adminName: adminName,
        })
      )
        .then((response) => {
          if (response.error) {
            setError(response.payload.message);
            setTimeout(() => setError(""), 2000);
          } else {
            setEditable(false);
            setIsInputEmpty(false);
            setIsSaved(true);
            dispatch(setIsNewNoticeAdded(false));
            setTimeout(() => {
              setIsSaved(false);
              setEditable(true);
              setSubject("");
              setDetails("");
              setIsOldNoticeSelected(true);
            }, 2000);
          }
        })
        .catch((error) => {
          setTimeout(() => setError(""));
          console.error(error);
        });
    } else {
      setIsInputEmpty(true);
    }
  };

  const onCancel = () => {
    setIsCancelled(true);
    setEditable(false);
    dispatch(setIsNewNoticeAdded(false));
    setIsOldNoticeSelected(true);
    setTimeout(() => {
      setIsCancelled(false);
      setEditable(true);
      setSubject("");
      setDetails("");
    }, 2000);
  };

  const handleRefresh = () => {
    setIsCancelled(false);
    setEditable(false);
  };

  const renderFlag = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {types.map((type, idx) => (
          <TouchableOpacity
            style={[
              styles.noticeTypeContainer,
              {
                borderColor: typeColorMapping[type].dotColor,
                backgroundColor:
                  selectedType === type
                    ? typeColorMapping[type].backgroundColor
                    : "white",
              },
            ]}
            onPress={() => setSelectedType(type)}
            key={`notice-type-${idx}`}
          >
            <View
              style={[
                styles.dotContainer,
                { backgroundColor: typeColorMapping[type].dotColor },
              ]}
            />
            <Text>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <>
      {isSaved ? <Text>Your notice has been successfully saved!</Text> : null}
      {error ? (
        <View>
          <Text>
            There was an error in creating the notice. Please try again.
          </Text>
          <TouchableOpacity onPress={handleRefresh}>
            <Text>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {isAddNewNoticeSelected ? (
        <ScrollView contentContainerStyle={styles.listView}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Create a new notice</Text>
            <Text style={styles.date}>{date}</Text>
            <View style={{ marginBottom: 20 }}>
              <Dropdown
                options={studentInfo}
                selectedOptions={selectedStudents}
                setSelectedOptions={handleCheckboxSelection}
                onSelectAll={handleSelectAll}
                onPressDelete={onPressDelete}
                dropdownText="Select from dropdown"
              />
            </View>
            <View>
              <Text style={styles.inputHeaderText}>Subject</Text>
              <TextInput
                style={styles.cardContainer}
                editable={isEditable}
                maxLength={200}
                value={subject}
                onChangeText={setSubject}
              />
              <Text style={styles.inputHeaderText}>Details</Text>
              <TextInput
                style={styles.cardContainer}
                multiline
                editable={isEditable}
                numberOfLines={4}
                maxLength={200}
                value={details}
                onChangeText={setDetails}
              />
              {renderFlag()}
              {createNoticesPending ? <Text>Saving your changes.</Text> : null}
              {isInputEmpty && (!subject || !details) ? (
                <Text style={styles.errorText}>
                  Could not save new notice. Please fill in both text boxes.
                </Text>
              ) : null}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.saveButtonContainer}
                  onPress={onSave}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButtonContainer}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </>
  );
};

export default CreateNoticeScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "80%",
    height: "100%",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "InterBold",
    marginBottom: 12,
  },
  date: {
    fontSize: 20,
    fontFamily: "InterSemiBold",
    marginBottom: 30,
  },
  listView: {
    width: "80%",
    paddingBottom: 60,
  },
  cardContainer: {
    minHeight: 60,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: colors.lightPurple,
    height: 40,
    width: "30%",
    borderRadius: 10,
    justifyContent: "center",
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
  errorText: {
    color: colors.red,
    marginTop: 20,
    fontSize: 14,
  },
  studentCardContainer: {
    width: "20%",
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
    marginRight: 10,
  },
  checkBoxContainer: {
    marginLeft: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  noticeTypeContainer: {
    flexDirection: "row",
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  inputHeaderText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    marginBottom: 10,
  },
});
