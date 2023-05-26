import { StyleSheet, Text, View, SectionList } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import Card from "../components/Card";
import colors from "../constants/Colors";
import * as noticesData from "../../data/notices.json";
import { fetchNotices } from "../redux/noticesSlice";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const NoticeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //const notices = noticesData.notices;
  const [notices, setnotices] = useState([]);

  const formatDate = (date) => {
    return moment(date).format("DD MMMM YYYY");
  };

  useEffect(() => {
    console.log("useeffect");
    const retrieveData = async () => {
      const data = await AsyncStorage.getItem("studentID");
      dispatch(fetchNotices(data))
        .then((response) => {
          // console.log(response.payload.data);
          const mainData = response.payload.data.noticesForStudent;
          var curDate = formatDate(mainData[0].createdAt);
          var data = [];
          const newNotices = [];
          mainData.forEach((notice) => {
            if (formatDate(notice.createdAt) === curDate) {
              data.push({
                _id: notice._id,
                createdAt: notice.createdAt,
                updatedAt: notice.updatedAt,
                details: notice.details,
              });
            } else {
              newNotices.push({
                date: curDate,
                data: data,
              });
              data = [];
              curDate = formatDate(notice.createdAt);
              data.push({
                _id: notice._id,
                createdAt: notice.createdAt,
                updatedAt: notice.updatedAt,
                details: notice.details,
              });
            }
          });
          setnotices(newNotices);
        })
        .catch((error) => console.log("Error in notices screen", error));
    };
    retrieveData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Notice Board</Text>
      <SectionList
        sections={notices}
        stickySectionHeadersEnabled={false}
        keyExtractor={(notice) => notice._id}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 20 }}
        renderItem={({ item }) => (
          <View style={styles.noticesContainer}>
            <Card
              navigation={navigation}
              isUnread={true}
              title={item.details}
              time={item.createdAt}
              subText={item.details}
            />
          </View>
        )}
        renderSectionHeader={({ section: { date } }) => (
          <Text style={styles.sectionHeaderText}>
            {moment(date).format("DD MMMM YYYY")}
          </Text>
        )}
      />
    </View>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    paddingBottom: 32,
    width: "100%",
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    fontFamily: "InterMedium",
    textAlign: "left",
    marginTop: 20,
  },
  noticesContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  sectionHeaderText: {
    color: colors.sectionText,
    fontSize: 18,
    fontFamily: "InterMedium",
    marginBottom: 12,
    marginTop: 20,
  },
});
