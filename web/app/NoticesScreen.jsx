import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SectionList,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Ionicons } from "@expo/vector-icons";

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
  // const router = useRouter();
  const state = useSelector((state) => state);
  const { fetchNoticesPending } = state.notices;
  const { isLoggedIn } = state.auth;
  const curDate = moment().format("DD MMMM YYYY");
  const [date, setDate] = useState("");
  const [isOldNoticeSelected, setisOldNoticeSelected] = useState(false);
  const [noticeID, setNoticeID] = useState("");
  const isDisabled = false;
  const [notices, setNotices] = useState([]);
  const types = ["Urgent", "Serious", "Casual"];
  const [isExpanded, setIsExpanded] = useState({});

  const handleButtonPress = (buttonId) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [buttonId]: !prevState[buttonId],
    }));
  };

  const handleClick = () => {
    setDate(curDate);
    setisOldNoticeSelected(false);
    dispatch(setIsNewNoticeAdded(true));
  };

  const onClickNotice = (id) => {
    console.log(id);
    setisOldNoticeSelected(true);
    setNoticeID(id);
  };
  const formatDate = (date) => {
    return moment(date).format("DD MMMM YYYY");
  };

  const retrieveData = () => {
    const teacherID = localStorage.getItem("teacherID");
    dispatch(fetchNotices(teacherID)).then((response) => {
      //console.log(response);
      const mainData = response.payload.data.noticesByTeacher;
      var curDate = formatDate(mainData[0].createdAt);
      var data = [];
      const newNotices = [];
      mainData.forEach((notice, idx) => {
        // console.log(formatDate(notice.createdAt), curDate);
        if (formatDate(notice.createdAt) === curDate) {
          data.push({
            _id: notice._id,
            createdAt: notice.createdAt,
            updatedAt: notice.updatedAt,
            details: notice.details,
            type: types[idx % 3],
          });
        } else {
          console.log("add to new notice");
          newNotices.push({
            date: curDate,
            data: data,
            type: types[idx % 3],
          });
          data = [];
          curDate = formatDate(notice.createdAt);
          data.push({
            _id: notice._id,
            createdAt: notice.createdAt,
            updatedAt: notice.updatedAt,
            details: notice.details,
            type: types[idx % 3],
          });
        }
      });
      setNotices(newNotices);
    });
  };
  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      // router.push("/LoginScreen");
    }
  }, [isLoggedIn]);

  const renderItem = ({ item }) => {
    const details = JSON.parse(item.details);
    const subject = details.subject;
    const date = formatDate(item.createdAt);
    const dotColor = typeColorMapping[item.type];
    return (
      <>
        {isExpanded[date] ? (
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
                  {moment(item.createdAt).format("DD MMMM YYYY, HH:mm")}
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
        <View style={{ flexDirection: "row" }}>
          <>
            {fetchNoticesPending ? (
              <Text>Retrieving data...</Text>
            ) : notices && notices.length > 0 ? (
              <>
                <SectionList
                  sections={notices}
                  stickySectionHeadersEnabled={false}
                  keyExtractor={(notice) => notice._id}
                  ListFooterComponent={<View />}
                  ListFooterComponentStyle={{ height: 20 }}
                  contentContainerStyle={styles.listView}
                  renderItem={renderItem}
                  renderSectionHeader={renderSectionHeader}
                />
              </>
            ) : (
              <View>
                <Text>No notices are available.</Text>
              </View>
            )}
            <View
              style={{
                flex: 3,
                marginLeft: "-15%",
                marginTop: "-5%",
                flexDirection: "row",
              }}
            >
              <View style={styles.verticalDivider} />
              {isOldNoticeSelected ? (
                <View style={{ flexDirection: "column" }}>
                  <TouchableOpacity
                    style={
                      isDisabled
                        ? [styles.buttonContainer, styles.disabled]
                        : styles.buttonContainer
                    }
                    onPress={handleClick}
                    disabled={isDisabled}
                  >
                    <Text style={styles.buttonText}>Create notice</Text>
                  </TouchableOpacity>
                  <NoticeScreen id={noticeID} />
                </View>
              ) : date !== "" ? (
                <CreateNoticeScreen date={date} />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <EmptyState />
                  <Text style={styles.emptyStateMessage}>
                    Select a notice to view.
                  </Text>
                </View>
              )}
            </View>
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
    backgroundColor: "#23342C",
    height: 40,
    width: 150,
    borderRadius: 10,
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    alignSelf: "center",
    color: "#99B8BE",
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
