import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SectionList,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../src/constants/Colors";
import CreateNoticeScreen from "./CreateNoticeScreen";
import NoticeScreen from "./NoticeScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices, setIsNewNoticeAdded } from "../src/redux/noticeSlice";
import typeColorMapping from "../api/typeColorMapping";
import { Image, Svg, SvgUri } from "react-native-svg";
import EmptyState from "../assets/icons/emptyState.svg";
import DropDown from "../src/components/DropDown";
import { fetchTeachers } from "../src/redux/teacherSlice";

const NoticesScreen = () => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  // const router = useRouter();
  const state = useSelector((state) => state.notices);
  const {
    fetchNoticesPending,
    isNewNoticeAdded,
    createNoticesSuccessful,
    editNoticesSuccessful,
  } = state;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const curDate = moment().utc().format("DD MMMM YYYY");
  const [date, setDate] = useState("");
  const [isOldNoticeSelected, setIsOldNoticeSelected] = useState(false);
  const [isNoticeListSelected, setIsNoticeListSelected] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [noticeID, setNoticeID] = useState("");
  const isDisabled = false;
  const [notices, setNotices] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [error, setError] = useState("");
  const [teacherInfo, setTeacherInfo] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const handleButtonPress = (buttonId) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [buttonId]: !prevState[buttonId],
    }));
  };

  const handleClick = () => {
    setDate(curDate);
    setIsOldNoticeSelected(false);
    dispatch(setIsNewNoticeAdded(true));
  };

  const onClickNotice = (id) => {
    setIsOldNoticeSelected(true);
    setNoticeID(id);
    if (layout.width < 768) {
      setIsNoticeListSelected(false);
    }
  };

  const formatDate = (date) => {
    return moment(date).utc().format("DD MMMM YYYY");
  };

  const retrieveData = () => {
    const adminID = localStorage.getItem("adminID");
    dispatch(fetchNotices(adminID)).then((response) => {
      if (response.error) {
        setError("Something went wrong, please try again.");
      } else {
        const newNotices = [];
        const teachers = [];
        const mainData = response.payload.data.noticesForAdmin;
        // console.log(mainData);
        mainData.forEach((data, idx) => {
          // console.log(mainData);
          teachers.push({
            key: data.teacher._id,
            value: data.teacher.firstName + " " + data.teacher.lastName,
            notices: data.data,
          });
          // data.forEach((item, idx) => {
          //   console.log(item);
          //   data.push({
          //     _id: item._id,
          //     createdAt: item.createdAt,
          //     details: item.details,
          //     type: item.noticeType,
          //   });
          // });
          // newNotices.push({
          //   date: curDate,
          //   data: data,
          // });
        });
        //  console.log(newNotices);
        setTeacherInfo(teachers);
        // setNotices(data);
      }
    });
  };

  useEffect(() => {
    // getTeachers();
    setSelectedTeachers([]);
    retrieveData();
  }, [createNoticesSuccessful, editNoticesSuccessful]);

  useEffect(() => {
    if (!isLoggedIn) {
      // router.push("/LoginScreen");
    }
  }, [isLoggedIn]);

  const handleCheckboxSelectionForTeachers = (input) => {
    // console.log(input, selectedTeachers);
    const idx = selectedTeachers.findIndex((cls) => cls.key === input.key);
    // console.log(idx);
    const selected = [...selectedTeachers];
    if (idx !== -1) {
      selected.splice(idx, 1);
      setSelectedTeachers(selected);
      //setStudentID("");
    } else {
      selected.push(input);
      setSelectedTeachers(selected);
    }
  };

  const handleSelectAllForTeachers = () => {
    if (teacherInfo.length === selectedTeachers.length) {
      // Deselect all options
      setSelectedTeachers([]);
    } else {
      // Select all options
      setSelectedTeachers(teacherInfo);
    }
  };

  const onPressDelete = (idx) => {
    const updatedItems = [...selectedTeachers];
    updatedItems.splice(idx, 1);
    setSelectedTeachers(updatedItems);
  };

  const renderItem = (item) => {
    const details = JSON.parse(item.details);
    const subject = details.subject;
    const date = formatDate(item.createdAt);
    const dotColor = typeColorMapping[item.noticeType].dotColor;
    return (
      <>
        {/* {isExpanded[date] ?  */}
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => onClickNotice(item._id)}
        >
          {item ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View
                  style={[styles.dotContainer, { backgroundColor: dotColor }]}
                />
                <Text
                  style={styles.subject}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {subject}
                </Text>
              </View>
              <Text style={styles.date}>
                {moment(item.createdAt).utc().format("DD MMMM YYYY, h:mm a")}
              </Text>
            </>
          ) : null}
        </TouchableOpacity>
        {/* : null} */}
      </>
    );
  };

  const renderSectionHeader = ({ section: { date } }) => {
    const style = () => {
      return !isExpanded[date]
        ? { borderBottomColor: "black", borderBottomWidth: 1, marginBottom: 20 }
        : null;
    };

    return (
      <TouchableOpacity
        style={[styles.sectionHeader, style()]}
        onPress={() => handleButtonPress(date)}
      >
        <Text style={styles.sectionHeaderText}>{date}</Text>
        <Ionicons
          name={
            isExpanded[date]
              ? "chevron-up-circle-outline"
              : "chevron-down-circle-outline"
          }
          size={20}
          color="black"
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>Notices</Text>
        <Text style={styles.subHeaderText}>
          All notices you posted will be shown here.
        </Text>
        <View
          style={{
            flexDirection: layout.width >= 768 && "row",
            height: "100%",
          }}
        >
          <>
            {fetchNoticesPending ? (
              <View
                style={{
                  //flex: 3,
                  // width: "50%",
                  // marginLeft: 100,
                  // marginLeft: "-15%",
                  // marginTop: "-5%",
                  flexDirection: "row",
                }}
              >
                <Text>Retrieving data...</Text>
              </View>
            ) : error === "" ? (
              <View>
                <DropDown
                  options={teacherInfo}
                  selectedOptions={selectedTeachers}
                  setSelectedOptions={handleCheckboxSelectionForTeachers}
                  onSelectAll={handleSelectAllForTeachers}
                  onPressDelete={onPressDelete}
                  dropdownText="Select class to view"
                />
                {isNoticeListSelected && (
                  <View style={{ height: "100%" }}>
                    <ScrollView
                      contentContainerStyle={styles.listView}
                      nestedScrollEnabled={true}
                    >
                      {selectedTeachers &&
                        selectedTeachers.map((teacher, idx) => (
                          <View key={`class-list=${idx}`}>
                            <Text style={styles.teacherName}>
                              {teacher.value}
                            </Text>
                            {teacher.notices.map((notice, idx) => (
                              <View key={`notice-id-${idx}`}>
                                {renderItem(notice)}
                              </View>
                            ))}
                          </View>
                        ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            ) : (
              error !== "" && (
                <View>
                  <Text>{error}</Text>
                </View>
              )
            )}
            {layout.width >= 768 ? (
              <View
                style={{
                  // flex: 3,
                  width: "50%",
                  marginLeft: fetchNoticesPending ? "20%" : "8%",
                  height: "100%",
                  marginTop: "-5%",
                  flexDirection: "row",
                  //backgroundColor: "pink",
                }}
              >
                <View style={styles.verticalDivider} />
                <View style={{ flexDirection: "column", width: "100%" }}>
                  {isOldNoticeSelected ? (
                    <NoticeScreen
                      noticeID={noticeID}
                      setNoticeID={setNoticeID}
                      setIsOldNoticeSelected={setIsOldNoticeSelected}
                    />
                  ) : true ? (
                    <CreateNoticeScreen
                      date={date}
                      noticeID={noticeID}
                      setIsOldNoticeSelected={setIsOldNoticeSelected}
                      setIsSaved={setIsSaved}
                      isSaved={isSaved}
                    />
                  ) : (
                    notices && (
                      <View
                        style={{
                          // flex: 1,
                          width: "100%",
                          height: "100%",
                          alignSelf: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <Text style={styles.emptyStateMessage}>
                          Select a class to view a notice.
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            ) : (
              <>
                {isOldNoticeSelected ? (
                  <View style={{ width: isOldNoticeSelected ? "100%" : "0%" }}>
                    <NoticeScreen
                      noticeID={noticeID}
                      setNoticeID={setNoticeID}
                      setIsOldNoticeSelected={setIsOldNoticeSelected}
                      setIsNoticeListSelected={setIsNoticeListSelected}
                    />
                  </View>
                ) : true ? (
                  <View
                    style={{
                      width: isNewNoticeAdded || isSaved ? "100%" : "0%",
                    }}
                  >
                    <CreateNoticeScreen
                      date={date}
                      noticeID={noticeID}
                      setIsOldNoticeSelected={setIsOldNoticeSelected}
                      setIsSaved={setIsSaved}
                      isSaved={isSaved}
                    />
                  </View>
                ) : null}
              </>
            )}
          </>
        </View>
      </View>
    </>
  );
};

export default NoticesScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "pink",
    // width: "100%",
    // flexDirection: "column",
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    height: "100%",
  },
  teacherName: {
    fontFamily: "InterSemiBold",
    fontSize: 18,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "InterBold",
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginBottom: 20,
  },
  listView: {
    // width: "50%",
    paddingBottom: 60,
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontFamily: "InterSemiBold",
    fontSize: 18,
    marginBottom: 8,
  },
  cardContainer: {
    // width: "100%",
    minHeight: 45,
    borderColor: "#A0B2AF",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "#D9D9D933",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: "#99B8BE99",
    height: 40,
    width: 150,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    alignSelf: "center",
    color: "#024552",
    fontFamily: "InterMedium",
  },
  subject: {
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: colors.darkGrey,
  },
  verticalDivider: {
    height: "100%",
    borderLeftColor: "#D9D9D980",
    borderLeftWidth: 1,
    marginRight: 50,
    //marginLeft: "-60%",
  },
  emptyStateMessage: {
    color: "#99B8BE",
    fontFamily: "InterMedium",
    fontSize: 16,
  },
});
