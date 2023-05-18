import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import colors from "../src/constants/Colors";
import CreateNoticeScreen from "./CreateNoticeScreen";
import NoticeScreen from "./NoticeScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../src/redux/noticeSlice";

const NoticesScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { notices, fetchNoticesPending } = state.notices;
  const curDate = moment().format("DD MMMM YYYY");
  const [date, setDate] = useState("");
  const [isOldNoticeSelected, setisOldNoticeSelected] = useState(false);
  const [noticeID, setNoticeID] = useState("");
  const isDisabled = false;
  // notices.length > 0 &&
  // notices[0] &&
  // curDate === moment(notices[0].createdAt).format("DD MMMM YYYY");

  const handleClick = () => {
    setDate(curDate);
    setisOldNoticeSelected(false);
  };

  const onClickNotice = (id) => {
    setisOldNoticeSelected(true);
    setNoticeID(id);
  };
  useEffect(() => {
    dispatch(fetchNotices("6462cf2be55c98895096ea49"));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notices</Text>
      <View>
        <TouchableOpacity
          style={
            isDisabled
              ? [styles.buttonContainer, styles.disabled]
              : styles.buttonContainer
          }
          onPress={handleClick}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Add new notice</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <ScrollView contentContainerStyle={styles.listView}>
          {fetchNoticesPending ? (
            <Text>Retrieving data...</Text>
          ) : notices.length > 0 ? (
            notices.map((notice, idx) => (
              <TouchableOpacity
                style={styles.cardContainer}
                key={`date-${idx}`}
                onPress={() => onClickNotice(notice._id)}
              >
                {notice ? (
                  <Text>{moment(notice.createdAt).format("DD MMMM YYYY")}</Text>
                ) : null}
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <Text>No notices are available.</Text>
            </View>
          )}
        </ScrollView>
        <View style={{ flex: 1, marginLeft: "-30%" }}>
          {isOldNoticeSelected ? (
            <NoticeScreen id={noticeID} />
          ) : date !== "" ? (
            <CreateNoticeScreen
              date={date}
              studentID="6462cf2be55c98895096ea49"
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default NoticesScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "100%",
    marginLeft: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
  },
  listView: {
    width: "30%",
  },
  cardContainer: {
    width: "100%",
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
    backgroundColor: colors.lightPurple,
    height: 40,
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    alignSelf: "center",
    color: colors.primaryText,
    fontWeight: 600,
  },
});
