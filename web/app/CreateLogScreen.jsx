import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { React, useEffect, useState } from "react";

import colors from "../src/constants/Colors";
import DragAndDrop from "../src/components/DragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsNewLogAdded,
  setIsNewLogAdded,
  updateLogs,
} from "../src/redux/logsSlice";

const inputTexts = [
  "What food did they eat",
  "What work did they do",
  "What games did they play",
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
  const { teacherID } = useSelector((state) => state.auth);
  const { updateLogsPending, updateLogsSuccessful } = useSelector(
    (state) => state.log
  );
  const state = useSelector((state) => state);
  const [inputs, setInputs] = useState([
    { name: inputTexts[0], value: "" },
    { name: inputTexts[1], value: "" },
    { name: inputTexts[2], value: "" },
  ]);
  const [rating, setRating] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const isAddNewLogSelected = getIsNewLogAdded(state);

  const onSave = () => {
    console.log(inputs);
    const data = {
      data: inputs,
    };
    if (inputs && rating) {
      dispatch(
        updateLogs({
          teacherID: teacherID,
          studentID: id,
          details: data,
          rating: rating,
        })
      )
        .then(() => {
          setEditable(false);
          setIsInputEmpty(false);
          setIsSaved(true);
          setIsCancelled(false);
          setInputs("");
          setTimeout(() => {
            setIsSaved(false);
            setEditable(true);
          }, 2000);
        })
        .catch((error) => console.log(error));
    } else {
      setIsInputEmpty(true);
      setIsCancelled(false);
      setIsSaved(false);
    }
  };

  const onCancel = () => {
    setIsCancelled(true);
    setEditable(false);
    dispatch(setIsNewLogAdded(false));
    setTimeout(() => {
      setIsCancelled(false);
      setEditable(true);
      setInputs("");
    }, 2000);
  };

  const handleInputChange = (index, value) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index].value = value;
      return updatedInputs;
    });
  };

  return (
    <>
      {isSaved ? <Text>Your logs have been saved successfully!</Text> : null}
      {updateLogsPending ? <Text>Saving your changes.</Text> : null}
      {isAddNewLogSelected ? (
        <View style={styles.container}>
          <Text style={styles.header}>{date}</Text>
          <View>
            <Text>Rating from 1-5</Text>
            <TextInput
              style={styles.ratingContainer}
              editable={isEditable}
              value={rating}
              onChangeText={setRating}
            />
            <ScrollView contentContainerStyle={styles.listView}>
              {inputs.map((input, idx) => (
                <View key={`input-${idx}`}>
                  <Text>{input.name}</Text>
                  <TextInput
                    style={styles.cardContainer}
                    multiline
                    editable={isEditable}
                    numberOfLines={4}
                    maxLength={200}
                    key={input.name}
                    value={input.value}
                    onChangeText={(value) => handleInputChange(idx, value)}
                  />
                </View>
              ))}
            </ScrollView>

            <DragAndDrop studentID={id} />
            
            {isInputEmpty && !inputs && !rating ? (
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  ratingContainer: {
    minHeight: 30,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    width: 70,
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
