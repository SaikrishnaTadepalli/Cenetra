import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { React, useState } from "react";

import colors from "../src/constants/Colors";
import DragAndDrop from "../src/components/DragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs, updateLogs } from "../src/redux/logsSlice";

const inputs = [
  "What food did they eat",
  // "What work did they do",
  // "What games did they play",
  // "Additional Comments",
];

const Input = (inputVal, state, setState, isEditable) => {
  return (
    <View key={`input-${idx}`}>
      <Text style={{ marginBottom: 10 }}>{inputVal}</Text>
      <TextInput
        style={styles.cardContainer}
        multiline
        editable={isEditable}
        numberOfLines={4}
        maxLength={200}
        value={state}
        onChangeText={setState}
      />
    </View>
  );
};

const CreateLogScreen = ({ date, id }) => {
  const [isEditable, setEditable] = useState(true);
  const dispatch = useDispatch();
  const { userId, updateLogsError } = useSelector((state) => state.auth);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const onSave = () => {
    if (input1) {
      setEditable(false);
      setIsInputEmpty(false);
      dispatch(
        updateLogs({
          teacherID: userId,
          studentID: id,
          details: input1,
        })
      );
    } else {
      setIsInputEmpty(true);
    }
  };

  const onCancel = () => {
    setIsCancelled(true);
    setEditable(false);
  };
  //console.log(error);
  return (
    <>
      {!isCancelled ? (
        <View style={styles.container}>
          <Text style={styles.header}>{date}</Text>
          <View>
            <ScrollView contentContainerStyle={styles.listView}>
              {inputs.map((input, idx) => (
                <View key={`input-${idx}`}>
                  <Text style={{ marginBottom: 10 }}>{input}</Text>
                  <TextInput
                    style={styles.cardContainer}
                    multiline
                    editable={isEditable}
                    numberOfLines={4}
                    maxLength={200}
                    value={input1}
                    onChangeText={setInput1}
                  />
                </View>
              ))}
            </ScrollView>
            <DragAndDrop />
            {isInputEmpty && !input1 ? (
              <Text style={styles.errorText}>
                Could not save logs. Please fill in at least one text box.
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
    </>
  );
};

export default CreateLogScreen;

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
