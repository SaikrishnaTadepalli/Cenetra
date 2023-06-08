import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { React, useEffect, useState } from "react";
// import { StarRating } from "react-native-star-rating";

import colors from "../src/constants/Colors";
import DragAndDrop from "../src/components/DragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsNewLogAdded,
  setIsNewLogAdded,
  updateLogs,
} from "../src/redux/logsSlice";
import MultiSelectQuestion from "../src/components/MultiSelectQuestion";
import MultipleChoiceQuestion from "../src/components/MultipleChoiceQuestion";
import OpenEndedQuestion from "../src/components/OpenEndedQuestion";
import { IconButton } from "react-native-paper";

const inputTexts = [
  "What food did they eat",
  "What work did they do",
  "What games did they play",
  // "Additional Comments",
];

const CreateLogScreen = ({ date, studentID }) => {
  const [isEditable, setEditable] = useState(true);
  const dispatch = useDispatch();
  const { updateLogsPending, updateLogsSuccessful } = useSelector(
    (state) => state.log
  );
  const state = useSelector((state) => state);
  const initialState = [
    { name: inputTexts[0], value: "" },
    { name: inputTexts[1], value: "" },
    { name: inputTexts[2], value: "" },
  ];
  const [inputs, setInputs] = useState(initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const isAddNewLogSelected = getIsNewLogAdded(state);
  const answers = ["Answer 1", "Answer 2", "Answer 3"];
  const choices = ["Choice 1", "Choice 2", "Choice 3"];
  const [checkedItems, setCheckedItems] = useState([]);
  const [filledStars, setFilledStars] = useState(0);
  const [selectedValue, setSelectedValue] = useState([
    { name: choices[0], value: "" },
    { name: choices[1], value: "" },
    { name: choices[2], value: "" },
  ]);

  const onSave = () => {
    // console.log(inputs);
    const teacherID = localStorage.getItem("teacherID");
    const sectionActivities = [];
    inputs.map((input) => {
      sectionActivities.push({
        title: input.name,
        description: input.value,
      });
    });
    const data = {
      activities: [
        {
          sectionHeader: "Morning",
          sectionActivities: sectionActivities,
        },
      ],
    };
    // console.log(data);
    if (inputs && filledStars) {
      dispatch(
        updateLogs({
          teacherID: teacherID,
          studentID: studentID,
          details: data,
          rating: filledStars,
        })
      )
        .then(() => {
          setEditable(false);
          setIsInputEmpty(false);
          setIsSaved(true);
          setIsCancelled(false);
          setInputs(initialState);
          setFilledStars(0);
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
      setInputs(initialState);
      setFilledStars(0);
    }, 2000);
  };

  const handleInputChange = (index, value) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index].value = value;
      return updatedInputs;
    });
  };

  const handleRadioButton = (index, value) => {
    console.log(index, value);
    setSelectedValue((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index].value = value;
      return updatedInputs;
    });
  };

  const handleStarPress = (num) => {
    setFilledStars(num);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= filledStars;
      const starIconName = isFilled ? "star" : "star-outline";

      stars.push(
        <IconButton
          key={i}
          icon={starIconName}
          iconColor={isFilled ? colors.yellow : colors.yellow}
          onPress={() => handleStarPress(i)}
          style={{ marginRight: -15 }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      {isSaved ? <Text>Your logs have been saved successfully!</Text> : null}
      {updateLogsPending ? <Text>Saving your changes.</Text> : null}
      {isAddNewLogSelected ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <Text style={styles.header}>{date}</Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text>Fill in a rating</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {renderStars()}
              </View>
            </View>
            <View style={styles.listView}>
              <OpenEndedQuestion
                inputs={inputs}
                handleInputChange={handleInputChange}
              />
              <MultiSelectQuestion
                question="Question 1"
                answers={answers}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
              <MultipleChoiceQuestion
                headerText="Question 1"
                choices={choices}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
              <DragAndDrop studentID={studentID} />

              {isInputEmpty && !filledStars ? (
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
        </ScrollView>
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
    marginBottom: 10,
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
