import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { React, useEffect, useState } from "react";

import colors from "../src/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  createNotices,
  getIsNewNoticeAdded,
  setIsNewNoticeAdded,
} from "../src/redux/noticeSlice";

const CreateNoticeScreen = ({ date }) => {
  const [isEditable, setEditable] = useState(true);
  const dispatch = useDispatch();
  const { createNoticesError, createNoticesPending } = useSelector(
    (state) => state.notices
  );
  const state = useSelector((state) => state);
  const { teacherID, students } = useSelector((state) => state.auth);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const isAddNewNoticeSelected = getIsNewNoticeAdded(state);

  const onSave = () => {
    if (subject && details) {
      const newNotice = {
        subject: subject,
        details: details,
      };
      const studentIDs = students.map(({ _id }) => `"${_id}"`);
      dispatch(
        createNotices({
          teacherID: teacherID,
          studentIDs: studentIDs,
          details: newNotice,
        })
      )
        .then(() => {
          setEditable(false);
          setIsInputEmpty(false);
          setIsSaved(true);
          dispatch(setIsNewNoticeAdded(false));
          setTimeout(() => {
            setIsSaved(false);
            setEditable(true);
            setSubject("");
            setDetails("");
          }, 2000);
        })
        .catch((error) => console.log(error));
    } else {
      setIsInputEmpty(true);
    }
  };

  const onCancel = () => {
    setIsCancelled(true);
    setEditable(false);
    dispatch(setIsNewNoticeAdded(false));
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
  return (
    <>
      {createNoticesPending ? <Text>Saving your changes.</Text> : null}
      {isAddNewNoticeSelected && !createNoticesPending ? (
        <View style={styles.container}>
          <Text style={styles.header}>{date}</Text>
          <View>
            <View style={styles.listView}>
              <Text style={{ marginBottom: 10 }}>Subject</Text>
              <TextInput
                style={styles.cardContainer}
                multiline
                editable={isEditable}
                numberOfLines={4}
                maxLength={200}
                value={subject}
                onChangeText={setSubject}
              />
              <Text style={{ marginBottom: 10 }}>Details</Text>
              <TextInput
                style={styles.cardContainer}
                multiline
                editable={isEditable}
                numberOfLines={4}
                maxLength={200}
                value={details}
                onChangeText={setDetails}
              />
            </View>
            {isInputEmpty && (!subject || !details) ? (
              <Text style={styles.errorText}>
                Could not save new notice. Please fill in at least one text box.
              </Text>
            ) : null}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity>
                <Text style={styles.cancelText} onPress={onCancel}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
      {isSaved ? <Text>Your notice has been successfully saved!</Text> : null}
      {isError ? (
        <View>
          <Text>There was an error in creating the log. Please try again.</Text>
          <TouchableOpacity onPress={handleRefresh}>
            <Text>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

export default CreateNoticeScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "80%",
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 30,
  },
  listView: {
    width: "80%",
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
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 30,
    alignSelf: "center",
    marginRight: 100,
  },
  errorText: {
    color: colors.red,
    marginTop: 20,
    fontSize: 14,
    //alignSelf: "center",
  },
});
