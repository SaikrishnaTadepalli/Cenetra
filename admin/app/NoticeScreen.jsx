import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import CreateResponsiveStyle from "../src/components/CreateResponsiveStyle";
import { getNoticeByID, setIsNewNoticeAdded } from "../src/redux/noticeSlice";

const NoticeScreen = ({
  noticeID,
  setNoticeID,
  setIsOldNoticeSelected,
  setIsNoticeListSelected,
}) => {
  const { notices } = useSelector((state) => state.notices);
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const dispatch = useDispatch();
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
  const notice = notices && findNoticeById(noticeID);

  const details = notice ? JSON.parse(notice.details) : "";

  const onPressEdit = () => {
    dispatch(setIsNewNoticeAdded(true));
    setNoticeID(noticeID);
    setIsOldNoticeSelected(false);
  };
  const onPressBack = () => {
    setIsOldNoticeSelected(false);
    setIsNoticeListSelected(true);
  };

  const renderFlag = (type) => {
    return (
      <View
        style={[
          styles("noticeTypeContainer"),
          {
            borderColor: typeColorMapping[type].dotColor,
            backgroundColor: typeColorMapping[type].backgroundColor,
          },
        ]}
      >
        <View
          style={[
            styles("dotContainer"),
            { backgroundColor: typeColorMapping[type].dotColor },
          ]}
        />
        <Text>{type}</Text>
      </View>
    );
  };

  return (
    <View style={styles("container")}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {layout.width < 768 && (
          <TouchableOpacity onPress={onPressBack}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        )}
        <Text style={styles("date")}>
          {notice
            ? moment(notice.createdAt).utc().format("MMMM D, YYYY")
            : null}
        </Text>
        <TouchableOpacity
          onPress={onPressEdit}
          style={styles("editButtonContainer")}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={20}
            color="#024552"
          />
          <Text style={styles("editButtonText")}>Edit Notice</Text>
        </TouchableOpacity>
      </View>
      <View style={styles("cardContainer")}>
        <Text style={styles("subjectText")}>{details.subject}</Text>
        <Text style={styles("detailsText")}>{details.details}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {notice && renderFlag(notice.noticeType)}
          <Text style={styles("timeText")}>
            {notice && moment(notice.createdAt).utc().format("h:mm a")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NoticeScreen;

const responsiveStyle = CreateResponsiveStyle(
  {
    container: {
      width: "50%",
      marginTop: 40,
    },
    cardContainer: {
      marginTop: 20,
      borderRadius: 8,
      minWidth: 500,
      width: "60%",
    },
    date: {
      fontSize: 20,
      fontFamily: "InterSemiBold",
    },
    subjectText: {
      fontSize: 24,
      fontFamily: "InterRegular",
      flexWrap: "wrap",
      maxWidth: "85%",
    },
    timeText: {
      color: "black",
      fontSize: 16,
      fontFamily: "InterRegular",
    },
    detailsText: {
      fontSize: 16,
      // marginLeft: 10,
      fontFamily: "InterRegular",
      maxWidth: "95%",
      color: "black",
      marginVertical: 24,
    },
    noticeTypeContainer: {
      flexDirection: "row",
      borderWidth: 1,
      width: 100,
      height: 30,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 80,
    },
    dotContainer: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
    },
    editButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 5,
      backgroundColor: "#99B8BE99",
      width: 120,
      height: 40,
      borderRadius: 5,
    },
    editButtonText: {
      color: "#024552",
      fontSize: 14,
      fontFamily: "InterMedium",
      textAlign: "right",
    },
  },
  { container: { width: "100%" } }
);

const styles = StyleSheet.create({
  container: {
    width: "50%",
    marginTop: 40,
  },
  cardContainer: {
    marginTop: 20,
    borderRadius: 8,
    minWidth: 500,
    width: "60%",
  },
  date: {
    fontSize: 20,
    fontFamily: "InterSemiBold",
  },
  subjectText: {
    fontSize: 24,
    fontFamily: "InterRegular",
    flexWrap: "wrap",
    maxWidth: "85%",
  },
  timeText: {
    color: "black",
    fontSize: 16,
    fontFamily: "InterRegular",
  },
  detailsText: {
    fontSize: 16,
    // marginLeft: 10,
    fontFamily: "InterRegular",
    maxWidth: "95%",
    color: "black",
    marginVertical: 24,
  },
  noticeTypeContainer: {
    flexDirection: "row",
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 80,
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  editButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    backgroundColor: "#99B8BE99",
    width: 120,
    height: 40,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#024552",
    fontSize: 14,
    fontFamily: "InterMedium",
    textAlign: "right",
  },
});
