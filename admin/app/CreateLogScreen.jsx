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
  editLogs,
  getIsNewLogAdded,
  setIsNewLogAdded,
  updateLogs,
} from "../src/redux/logsSlice";
import MultiSelectQuestion from "../src/components/MultiSelectQuestion";
import MultipleChoiceQuestion from "../src/components/MultipleChoiceQuestion";
import OpenEndedQuestion from "../src/components/OpenEndedQuestion";
import { IconButton } from "react-native-paper";

const CreateLogScreen = ({
  date,
  studentID,
  name,
  logID,
  setIsStudentNameSelected,
  setIsOldLogSelected,
}) => {
  const { logs } = useSelector((state) => state.log);
  const findLogById = (id) => {
    let foundLog = null;

    logs.forEach((segment) => {
      const log = segment.data && segment.data.find((item) => item._id === id);
      if (log) {
        foundLog = log;
      }
    });

    return foundLog;
  };
  const log = findLogById(logID);
  const parsedLog = log ? JSON.parse(log.details) : null;
  const rating = log ? parseInt(log.rating) : 0;
  const [isEditable, setEditable] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.log);
  const { updateLogsPending, updateLogsSuccessful } = state;

  const [openEndedQuestionState, setOpenEndedQuestionState] = useState([
    {
      question: "Additional Comments",
      answer: parsedLog ? parsedLog.openEndedQuestions[0].answer : "",
    },
  ]);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const isAddNewLogSelected = getIsNewLogAdded(state);
  const [filledStars, setFilledStars] = useState(rating);
  const [checkBoxQuestionState, setCheckBoxQuestionState] = useState([
    {
      question: "Which activities did the children engage in today?",
      answer: parsedLog ? parsedLog.checkBoxQuestions[0].answer : [],
      options: [
        "Outdoor play",
        "Art and crafts",
        "Storytime",
        "Music movement",
        "Sensor play",
        "Free play",
        "Group games",
      ],
    },
    {
      question: "Which areas did the child need assistance with today?",
      answer: parsedLog ? parsedLog.checkBoxQuestions[1].answer : [],
      options: [
        "Self-care (e.g., toileting, handwashing)",
        "Snack time",
        "Putting on coats and shoes",
        "Sharing toys",
        "Cleaning up after play",
      ],
    },
    {
      question: "Which positive behaviors did the child exhibit today?",
      answer: parsedLog ? parsedLog.checkBoxQuestions[2].answer : [],
      options: [
        "Sharing",
        "Taking turns",
        "Helping others",
        "Listening attentively",
        "Following instructions",
        "Problem-solving",
      ],
    },
    {
      question: "Which materials were used during learning activities?",
      answer: parsedLog ? parsedLog.checkBoxQuestions[3].answer : [],
      options: [
        "Manipulatives (e.g., blocks, puzzles)",
        "Writing tools (e.g., crayons, markers)",
        "Books and reading materials",
        "Math manipulatives",
        "Science experiment materials",
      ],
    },
    {
      question: "Which behavior management strategies were implemented today?",
      answer: parsedLog ? parsedLog.checkBoxQuestions[4].answer : [],
      options: [
        "Positive reinforcement",
        "Time-outs",
        "Redirection",
        "Verbal reminders",
        "Visual cues",
      ],
    },
    // ...more questions
  ]);
  const [radioQuestionState, setRadioQuestionState] = useState([
    {
      question: "How would you rate the overall behavior of the child today?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[0].answer : "",
      options: ["Excellent", "Good", "Fair", "Poor"],
    },
    {
      question: "Did the child actively participate in group activities?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[1].answer : "",
      options: ["Yes", "No", "Sometimes"],
    },
    {
      question: "How well did the child follow instructions today?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[2].answer : "",
      options: ["Very well", "Well", "Not so well", "Poorly"],
    },
    {
      question: "Did the child show kindness and respect towards others?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[3].answer : "",
      options: ["Yes, always", "Most of the time", "Occasionally", "Rarely"],
    },
    {
      question:
        "Were there any discipline issues that needed addressing today?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[4].answer : "",
      options: [
        "No issues",
        "Minor issues",
        "Some moderate issues",
        "Significant issues",
      ],
    },
    {
      question: "How engaged was the child during learning activities?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[5].answer : "",
      options: [
        "Highly engaged",
        "Moderately engaged",
        "Somewhat engaged",
        "Not Engaged",
      ],
    },
    {
      question: "Did the child demonstrate good listening skills?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[6].answer : "",
      options: [
        "Yes, always",
        "Most of the time",
        "Mostly well, with occasional lapses",
        "Occasionally",
        "Rarely",
      ],
    },
    {
      question:
        "Were there any notable achievements or milestones reached by the child today?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[7].answer : "",
      options: ["Yes, several", "Yes, a few", "None"],
    },
    {
      question: "How well did the child cooperate with others during playtime?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[8].answer : "",
      options: ["Very well", "Well", "Not so well", "Poorly"],
    },
    {
      question: "How well did the child transition between activities today?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[9].answer : "",
      options: [
        "Smoothly",
        "Somewhat smoothly",
        "With some difficulty",
        "Chaotically",
      ],
    },
    // ...more questions
  ]);

  const handleDispatch = (action) => {
    // console.log(action);
    if (
      radioQuestionState &&
      checkBoxQuestionState &&
      openEndedQuestionState &&
      filledStars
    ) {
      dispatch(action)
        .then((response) => {
          // console.log("dispatching");
          if (response.error) {
            setError(response.payload.message);
            setTimeout(() => setError(""), 2000);
          } else {
            setEditable(false);
            setIsInputEmpty(false);
            setIsSaved(true);
            setIsCancelled(false);

            setFilledStars(0);
            setTimeout(() => {
              setIsSaved(false);
              setEditable(true);
              setIsOldLogSelected(true);
            }, 2000);
          }
        })
        .catch((error) => {
          setTimeout(() => setError(""));
          console.error(error);
        });
    } else {
      setIsInputEmpty(true);
      setIsCancelled(false);
      setIsSaved(false);
    }
  };

  const onSave = () => {
    // console.log(inputs);
    const adminID = localStorage.getItem("adminID");
    const adminName = localStorage.getItem("adminName");
    const data = {
      radioButtonQuestions: radioQuestionState,
      checkBoxQuestions: checkBoxQuestionState,
      openEndedQuestions: openEndedQuestionState,
    };
    var action = "";
    if (logID) {
      action = editLogs({
        logID: logID,
        details: data,
        rating: filledStars,
        adminName: adminName,
      });
    } else {
      action = updateLogs({
        adminID: adminID,
        studentID: studentID,
        details: data,
        rating: filledStars,
      });
    }
    handleDispatch(action);
    // console.log(data);
  };

  const onCancel = () => {
    setIsCancelled(true);
    setEditable(false);
    dispatch(setIsNewLogAdded(false));
    if (logID) {
      setIsOldLogSelected(true);
    } else {
      setIsStudentNameSelected(true);
    }
    setTimeout(() => {
      setIsCancelled(false);
      setEditable(true);
      setFilledStars(0);
    }, 2000);
  };

  const handleInputChange = (index, value) => {
    setOpenEndedQuestionState((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index].answer = value;
      return updatedInputs;
    });
  };

  // Handle radio button selection
  const handleRadioSelection = (index, optionValue) => {
    setRadioQuestionState((prevState) => {
      const updatedState = [...prevState];
      updatedState[index].answer = optionValue;
      return updatedState;
    });
  };

  const handleCheckboxSelection = (index, optionValue) => {
    setCheckBoxQuestionState((prevState) => {
      const updatedState = [...prevState];
      const { answer } = updatedState[index];
      const answerIndex = answer.indexOf(optionValue);

      if (answerIndex === -1) {
        updatedState[index].answer = [...answer, optionValue];
      } else {
        updatedState[index].answer = [
          ...answer.slice(0, answerIndex),
          ...answer.slice(answerIndex + 1),
        ];
      }

      return updatedState;
    });
  };

  const handleSelectAll = (index) => {
    setCheckBoxQuestionState((prevState) => {
      const updatedState = [...prevState];
      const { options } = updatedState[index];
      const { answer } = updatedState[index];

      if (answer.length === options.length) {
        // Deselect all options
        updatedState[index].answer = [];
      } else {
        // Select all options
        updatedState[index].answer = [...options];
      }

      return updatedState;
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
          style={{ marginRight: -10 }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      {isSaved ? <Text>Your logs have been saved successfully!</Text> : null}
      {isAddNewLogSelected ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <Text style={styles.headerText}>{name}'s Logs</Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <View style={styles.dateContainer}>
                <Text
                  style={[styles.dateText, { fontFamily: "InterSemiBold" }]}
                >
                  Date
                </Text>
                <Text style={[styles.dateText, { marginLeft: -30 }]}>
                  {date}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Fill in a rating</Text>
                  <View style={{ flexDirection: "row" }}>{renderStars()}</View>
                </View>
              </View>
              {/* <View style={styles.dragAndDropContainer}>
                <DragAndDrop studentID={studentID} />
              </View> */}
              <View style={styles.listView}>
                <View style={{ marginBottom: 20 }}>
                  {radioQuestionState.map((question, idx) => (
                    <MultipleChoiceQuestion
                      key={`radio-question-${idx}`}
                      question={question.question}
                      answers={question.options}
                      selectedValue={question.answer}
                      disabled={false}
                      setSelectedValue={(option) =>
                        handleRadioSelection(idx, option)
                      }
                    />
                  ))}
                </View>
                <View style={{ marginBottom: 30 }}>
                  {checkBoxQuestionState.map((question, idx) => (
                    <MultiSelectQuestion
                      key={`multi-question-${idx}`}
                      question={question.question}
                      answers={question.options}
                      checkedItems={question.answer}
                      disabled={false}
                      isDropdown={false}
                      setCheckedItems={(option) =>
                        handleCheckboxSelection(idx, option)
                      }
                      onSelectAll={() => handleSelectAll(idx)}
                    />
                  ))}
                </View>
                <View style={{ marginBottom: 20 }}>
                  {openEndedQuestionState.map((question, idx) => (
                    <OpenEndedQuestion
                      key={`open-question-${idx}`}
                      question={question.question}
                      answer={question.answer}
                      handleInputChange={(answer) =>
                        handleInputChange(idx, answer)
                      }
                    />
                  ))}
                </View>
                {isInputEmpty && !filledStars ? (
                  <Text style={styles.errorText}>
                    Could not save logs. Please answer all questions.
                  </Text>
                ) : null}
                {updateLogsPending ? <Text>Saving your changes.</Text> : null}
                {error !== "" && <Text>{error}</Text>}
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
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
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
    // backgroundColor: "red",
    width: "100%",
  },
  headerText: {
    marginBottom: 40,
    fontSize: 24,
    fontFamily: "InterMedium",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontFamily: "InterBold",
    fontSize: 16,
    width: "20%",
  },
  listView: {
    width: "100%",
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
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    marginRight: 40,
  },
  buttonContainer: {
    // marginVertical: 20,
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
  cancelButtonText: {
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
    //alignSelf: "center",
  },
  dragAndDropContainer: {
    alignSelf: "flex-start",
    marginBottom: 40,
  },
});
