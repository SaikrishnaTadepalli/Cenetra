import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { React, useEffect, useState } from "react";
// import { StarRating } from "react-native-star-rating";

import CreateResponsiveStyle from "../src/components/CreateResponsiveStyle";
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
  setLogID,
  setIsOldLogSelected,
  setIsStudentNameSelected,
  setIsSaved,
  isSaved,
}) => {
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const { logs, updateLogsPending, updateLogsSuccessful } = useSelector(
    (state) => state.log
  );
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

  const [openEndedQuestionState, setOpenEndedQuestionState] = useState([
    {
      question: "Today's lessons",
      answer: parsedLog ? parsedLog.openEndedQuestions[0].answer : "",
    },
  ]);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const isAddNewLogSelected = getIsNewLogAdded(state);
  const [filledStars, setFilledStars] = useState(rating);
  // const [checkBoxQuestionState, setCheckBoxQuestionState] = useState([
  //   {
  //     question: "Which activities did the children engage in today?",
  //     answer: parsedLog ? parsedLog.checkBoxQuestions[0].answer : [],
  //     options: [
  //       "Outdoor play",
  //       "Art and crafts",
  //       "Storytime",
  //       "Music movement",
  //       "Sensor play",
  //       "Free play",
  //       "Group games",
  //     ],
  //   },
  //   {
  //     question: "Which areas did the child need assistance with today?",
  //     answer: parsedLog ? parsedLog.checkBoxQuestions[1].answer : [],
  //     options: [
  //       "Self-care (e.g., toileting, handwashing)",
  //       "Snack time",
  //       "Putting on coats and shoes",
  //       "Sharing toys",
  //       "Cleaning up after play",
  //       "None",
  //     ],
  //   },
  //   {
  //     question: "Which positive behaviors did the child exhibit today?",
  //     answer: parsedLog ? parsedLog.checkBoxQuestions[2].answer : [],
  //     options: [
  //       "Sharing",
  //       "Taking turns",
  //       "Helping others",
  //       "Listening attentively",
  //       "Following instructions",
  //       "Problem-solving",
  //     ],
  //   },
  //   {
  //     question: "Which materials were used during learning activities?",
  //     answer: parsedLog ? parsedLog.checkBoxQuestions[3].answer : [],
  //     options: [
  //       "Manipulatives (e.g., blocks, puzzles)",
  //       "Writing tools (e.g., crayons, markers)",
  //       "Books and reading materials",
  //       "Math manipulatives",
  //       "Science experiment materials",
  //     ],
  //   },
  //   {
  //     question: "Which behavior management strategies were implemented today?",
  //     answer: parsedLog ? parsedLog.checkBoxQuestions[4].answer : [],
  //     options: [
  //       "Positive reinforcement",
  //       "Time-outs",
  //       "Redirection",
  //       "Verbal reminders",
  //       "Visual cues",
  //     ],
  //   },
  //   // ...more questions
  // ]);
  const [radioQuestionState, setRadioQuestionState] = useState([
    {
      question: "Did they have their snack?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[0].answer : "",
      options: ["Yes", "No", "Partial"],
    },
    {
      question: "How did they use their toilet?",
      answer: parsedLog ? parsedLog.radioButtonQuestions[1].answer : "",
      options: ["Pee in toilet", "Pee/Poo in toilet", "Accident"],
    },
    // {
    //   question: "How would you rate the overall behavior of the child today?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[0].answer : "",
    //   options: ["Excellent", "Good", "Fair", "Poor"],
    // },
    // {
    //   question: "Did the child actively participate in group activities?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[1].answer : "",
    //   options: ["Yes", "No", "Sometimes"],
    // },
    // {
    //   question: "How well did the child follow instructions today?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[2].answer : "",
    //   options: ["Very well", "Well", "Not so well", "Poorly"],
    // },
    // {
    //   question: "Did the child show kindness and respect towards others?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[3].answer : "",
    //   options: ["Yes, always", "Most of the time", "Occasionally", "Rarely"],
    // },
    // {
    //   question:
    //     "Were there any discipline issues that needed addressing today?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[4].answer : "",
    //   options: [
    //     "No issues",
    //     "Minor issues",
    //     "Some moderate issues",
    //     "Significant issues",
    //   ],
    // },
    // {
    //   question: "How engaged was the child during learning activities?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[5].answer : "",
    //   options: [
    //     "Highly engaged",
    //     "Moderately engaged",
    //     "Somewhat engaged",
    //     "Not Engaged",
    //   ],
    // },
    // {
    //   question: "Did the child demonstrate good listening skills?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[6].answer : "",
    //   options: [
    //     "Yes, always",
    //     "Most of the time",
    //     "Mostly well, with occasional lapses",
    //     "Occasionally",
    //     "Rarely",
    //   ],
    // },
    // {
    //   question:
    //     "Were there any notable achievements or milestones reached by the child today?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[7].answer : "",
    //   options: ["Yes, several", "Yes, a few", "None"],
    // },
    // {
    //   question: "How well did the child cooperate with others during playtime?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[8].answer : "",
    //   options: ["Very well", "Well", "Not so well", "Poorly"],
    // },
    // {
    //   question: "How well did the child transition between activities today?",
    //   answer: parsedLog ? parsedLog.radioButtonQuestions[9].answer : "",
    //   options: [
    //     "Smoothly",
    //     "Somewhat smoothly",
    //     "With some difficulty",
    //     "Chaotically",
    //   ],
    // },
    // ...more questions
  ]);

  // Function to check if all answer arrays are filled
  const areAllCheckboxFieldsFilled = () => {
    return checkBoxQuestionState.every(
      (question) => question.answer.length > 0
    );
  };

  // Function to check if all answer properties are filled
  const areAllFieldsFilled = (state) => {
    return state.every((question) => question.answer !== "");
  };

  const handleDispatch = (action) => {
    // console.log(action);
    if (
      // areAllCheckboxFieldsFilled() &&
      // areAllFieldsFilled(radioQuestionState) &&
      // areAllFieldsFilled(openEndedQuestionState) &&
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
            !logID && setLogID(response.payload.data.createLog._id);
            setFilledStars(0);
            setTimeout(() => {
              setIsOldLogSelected(true);
              setIsSaved(false);
              setEditable(true);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Something went wrong please try again");
          setTimeout(() => {
            setError("");
          }, 2000);
        });
    } else {
      setError("Please fill in all fields");
    }
  };
  const onSave = () => {
    // console.log(inputs);
    const adminID = localStorage.getItem("adminID");
    const adminName = localStorage.getItem("adminName");
    const data = {
      radioButtonQuestions: radioQuestionState,
      //checkBoxQuestions: checkBoxQuestionState,
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
      console.log(data);
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
    if (logID) {
      setIsOldLogSelected(true);
    } else {
      setIsStudentNameSelected(true);
    }
    dispatch(setIsNewLogAdded(false));
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

    for (let i = 1; i <= 7; i++) {
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
      {isSaved ? (
        <View style={styles("container")}>
          <Text>Your logs have been saved successfully!</Text>
        </View>
      ) : null}
      {isAddNewLogSelected ? (
        <>
          <ScrollView
            style={styles("container")}
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles("headerText")}>{name}'s Logs</Text>
            <View style={{ flexDirection: "row" }}>
              <View>
                <View style={styles("dateContainer")}>
                  <Text
                    style={[
                      styles("dateText"),
                      { fontFamily: "InterSemiBold" },
                    ]}
                  >
                    Date
                  </Text>
                  <Text style={[styles("dateText"), { marginLeft: -30 }]}>
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
                  {/* <View style={styles("ratingContainer}>
                  <Text style={styles("ratingText}>Fill in a rating</Text>
                  <View style={{ flexDirection: "row" }}>{renderStars()}</View>
                </View> */}
                </View>
                <View style={styles("listView")}>
                  <View style={{ marginBottom: 20, width: "100%" }}>
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
                  <View style={styles("ratingContainer")}>
                    <Text style={styles("ratingText")}>Mood on arrival</Text>
                    <View style={styles("starsContainer")}>
                      {renderStars()}
                    </View>
                  </View>
                  {/* <View style={{ marginBottom: 40 }}>
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
                </View> */}
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
                    <Text style={styles("errorText")}>
                      Could not save logs. Please answer all questions.
                    </Text>
                  ) : null}
                  {updateLogsPending ? <Text>Saving your changes.</Text> : null}
                  {error !== "" && (
                    <Text style={{ color: "red" }}>{error}</Text>
                  )}
                  <View style={styles("buttonsContainer")}>
                    <TouchableOpacity
                      style={styles("saveButtonContainer")}
                      onPress={onSave}
                    >
                      <Text style={styles("saveButtonText")}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles("cancelButtonContainer")}
                      onPress={onCancel}
                    >
                      <Text style={styles("cancelButtonText")}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      ) : null}
    </>
  );
};

export default CreateLogScreen;

const responsiveStyle = CreateResponsiveStyle(
  {
    container: {
      //backgroundColor: "red",
      //width: "100%",
      paddingLeft: 20,
    },
    headerText: {
      marginBottom: 40,
      fontSize: 24,
      fontFamily: "InterMedium",
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    dateText: {
      fontFamily: "InterBold",
      fontSize: 16,
      width: "40%",
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
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 20,
    },
    ratingText: {
      fontFamily: "InterMedium",
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
    starsContainer: {
      flexDirection: "row",
    },
  },
  {
    starsContainer: {
      width: "40%",
      flexWrap: "wrap",
    },
    container: {
      width: "100%",
    },
  }
);

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    // width: "100%",
    paddingLeft: 20,
  },
  headerText: {
    marginBottom: 40,
    fontSize: 24,
    fontFamily: "InterMedium",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontFamily: "InterBold",
    fontSize: 16,
    width: "40%",
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
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  ratingText: {
    fontFamily: "InterMedium",
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
