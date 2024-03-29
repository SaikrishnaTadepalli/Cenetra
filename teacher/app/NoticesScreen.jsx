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

import CreateResponsiveStyle from "../src/components/CreateResponsiveStyle";
import colors from "../src/constants/Colors";
import CreateNoticeScreen from "./CreateNoticeScreen";
import NoticeScreen from "./NoticeScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices, setIsNewNoticeAdded } from "../src/redux/noticeSlice";
import typeColorMapping from "../api/typeColorMapping";
import { Image, Svg, SvgUri } from "react-native-svg";
import EmptyState from "../assets/icons/emptyState.svg";

const NoticesScreen = () => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
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
  const [noticeID, setNoticeID] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const isDisabled = false;
  const [notices, setNotices] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [error, setError] = useState("");

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
    setNoticeID("");
  };

  const onClickNotice = (id) => {
    setIsOldNoticeSelected(true);
    setNoticeID(id);
  };

  const formatDate = (date) => {
    return moment(date).utc().format("DD MMMM YYYY");
  };

  const retrieveData = () => {
    const teacherID = localStorage.getItem("teacherID");
    dispatch(fetchNotices(teacherID)).then((response) => {
      if (response.error) {
        setError("Something went wrong, please try again.");
      } else {
        const newNotices = [];
        const mainData = response.payload.data.noticesByTeacher;
        mainData.forEach((notice, idx) => {
          const curDate = formatDate(notice[0].createdAt);
          const data = [];
          notice.forEach((item, idx) => {
            data.push({
              _id: item._id,
              createdAt: item.createdAt,
              details: item.details,
              type: item.noticeType,
            });
          });
          newNotices.push({
            date: curDate,
            data: data,
          });
        });
        setNotices(newNotices);
      }
    });
  };

  useEffect(() => {
    retrieveData();
  }, [createNoticesSuccessful, editNoticesSuccessful]);

  useEffect(() => {
    if (!isLoggedIn) {
      // router.push("/LoginScreen");
    }
  }, [isLoggedIn]);

  const renderItem = ({ item }) => {
    const details = JSON.parse(item.details);
    const subject = details.subject;
    const date = formatDate(item.createdAt);
    const dotColor = typeColorMapping[item.type].dotColor;
    return (
      <>
        {isExpanded[date] ? (
          <TouchableOpacity
            style={styles("cardContainer")}
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
                    style={[
                      styles("dotContainer"),
                      { backgroundColor: dotColor },
                    ]}
                  />
                  <Text
                    style={styles("subject")}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {subject}
                  </Text>
                </View>
                <Text style={styles("date")}>
                  {moment(item.createdAt).utc().format("DD MMMM YYYY, h:mm a")}
                </Text>
              </>
            ) : null}
          </TouchableOpacity>
        ) : null}
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
        style={[styles("sectionHeader"), style()]}
        onPress={() => handleButtonPress(date)}
      >
        <Text style={styles("sectionHeaderText")}>{date}</Text>
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
  //console.log(notices);
  return (
    <>
      <View style={styles("container")}>
        <Text style={styles("headerText")}>Notices</Text>
        <Text style={styles("subHeaderText")}>
          All notices you posted will be shown here.
        </Text>
        {(!isNewNoticeAdded || isOldNoticeSelected) && layout.width < 768 ? (
          <TouchableOpacity
            style={
              isDisabled
                ? [styles("buttonContainer"), styles("disabled")]
                : styles("buttonContainer")
            }
            onPress={handleClick}
            disabled={isDisabled}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color="#024552"
            />
            <Text style={styles("buttonText")}>Create notice</Text>
          </TouchableOpacity>
        ) : null}
        <View style={{ flexDirection: "row" }}>
          <>
            {fetchNoticesPending ? (
              <View
                style={
                  {
                    // flex: 3,
                    // width: "50%",
                    // marginLeft: notices.length > 0 ? "-15%" : 500,
                    // marginTop: "-5%",
                    //flexDirection: "row",
                  }
                }
              >
                <Text>Retrieving data...</Text>
              </View>
            ) : notices && notices.length > 0 ? (
              <>
                <SectionList
                  sections={notices}
                  stickySectionHeadersEnabled={false}
                  keyExtractor={(notice) => notice._id}
                  ListFooterComponent={<View />}
                  ListFooterComponentStyle={{ height: 20 }}
                  contentContainerStyle={styles("listView")}
                  renderItem={renderItem}
                  renderSectionHeader={renderSectionHeader}
                />
              </>
            ) : error !== "" ? (
              <View>
                <Text>{error}</Text>
              </View>
            ) : null}
            {layout.width >= 768 ? (
              <View
                style={[
                  styles("rightContent"),
                  { marginLeft: notices.length > 0 ? "-15%" : 500 },
                ]}
              >
                <View style={styles("verticalDivider")} />
                <View style={{ flexDirection: "column", width: "100%" }}>
                  {!isNewNoticeAdded || isOldNoticeSelected ? (
                    <TouchableOpacity
                      style={
                        isDisabled
                          ? [styles("buttonContainer"), styles("disabled")]
                          : styles("buttonContainer")
                      }
                      onPress={handleClick}
                      disabled={isDisabled}
                    >
                      <MaterialCommunityIcons
                        name="pencil-outline"
                        size={20}
                        color="#024552"
                      />
                      <Text style={styles("buttonText")}>Create notice</Text>
                    </TouchableOpacity>
                  ) : null}
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
                      setNoticeID={setNoticeID}
                      setIsOldNoticeSelected={setIsOldNoticeSelected}
                      isSaved={isSaved}
                      setIsSaved={setIsSaved}
                    />
                  ) : (
                    notices &&
                    notices.length > 0 && (
                      <View
                        style={{
                          flex: 1,
                          alignSelf: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles("emptyStateMessage")}>
                          Select a notice to view.
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
                      setNoticeID={setNoticeID}
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

const responsiveStyle = CreateResponsiveStyle(
  {
    container: {
      // backgroundColor: "pink",
      // width: "100%",
      marginLeft: 20,
      marginTop: 20,
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
      width: "50%",
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
      width: "100%",
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
      height: "150%",
      borderLeftColor: "#D9D9D980",
      borderLeftWidth: 1,
      marginRight: 50,
      marginLeft: -60,
    },
    emptyStateMessage: {
      color: "#99B8BE",
      fontFamily: "InterMedium",
      fontSize: 16,
    },
    rightContent: {
      flex: 3,
      width: "50%",
      marginTop: "-5%",
      flexDirection: "row",
    },
  },
  {
    container: {
      width: "100%",
      flexDirection: "column",
    },
    listView: {
      width: "60%",
      paddingHorizontal: 0,
    },
  }
);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "pink",
    // width: "100%",
    marginLeft: 20,
    marginTop: 20,
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
    width: "50%",
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
    height: "150%",
    borderLeftColor: "#D9D9D980",
    borderLeftWidth: 1,
    marginRight: 50,
    marginLeft: -60,
  },
  emptyStateMessage: {
    color: "#99B8BE",
    fontFamily: "InterMedium",
    fontSize: 16,
  },
});
