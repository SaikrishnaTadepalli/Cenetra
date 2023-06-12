import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import NoticeCard from "../components/NoticeCard";
import colors from "../constants/Colors";
import * as noticesData from "../../data/notices.json";
import { fetchNotices } from "../redux/noticesSlice";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const NoticeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error } = useSelector((state) => state.notices);
  const [notices, setNotices] = useState([]);
  const types = ["Urgent", "Casual", "Serious"];

  const formatDate = (date) => {
    return moment(date).format("DD MMMM YYYY");
  };
  const retrieveData = async () => {
    const data = await AsyncStorage.getItem("studentID");
    dispatch(fetchNotices(data))
      .then((response) => {
        console.log(response.payload.data);
        const newNotices = [];
        const mainData = response.payload.data.noticesForStudent;
        mainData.forEach((notice, idx) => {
          const curDate = formatDate(notice[0].createdAt);
          const data = [];
          notice.forEach((item, idx) => {
            data.push({
              _id: item._id,
              createdAt: item.createdAt,
              details: item.details,
              type: item.noticeType,
              isRead: item.read,
            });
          });
          newNotices.push({
            date: curDate,
            data: data,
          });
        });
        setNotices(newNotices);
      })
      .catch((error) => console.log("Error in notices screen", error));
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     retrieveData();
  //     return () => {
  //       // Clean up any resources if needed
  //     };
  //   }, [])
  // );

  useEffect(() => {
    retrieveData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    retrieveData();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error while retrieving data</Text>
          <TouchableOpacity
            onPress={retrieveData}
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text style={styles.reloadButtonText}>Reload Data</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {loading && !refreshing ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.indicator}
        />
      ) : (
        !error && (
          <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Notice Board</Text>
            {notices.length === 0 && <Text>No notices are available.</Text>}
            <SectionList
              sections={notices}
              stickySectionHeadersEnabled={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(notice) => notice._id}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{ height: 20 }}
              renderItem={({ item }) => (
                <View style={styles.noticesContainer}>
                  <NoticeCard
                    navigation={navigation}
                    isRead={item.isRead}
                    details={item.details}
                    time={item.createdAt}
                    type={item.type}
                    noticeID={item._id}
                  />
                </View>
              )}
              renderSectionHeader={({ section: { date } }) => (
                <Text style={styles.sectionHeaderText}>{date}</Text>
              )}
            />
          </View>
        )
      )}
    </>
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
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 999,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  errorText: {
    color: colors.red,
    fontFamily: "InterMedium",
    fontSize: 20,
  },
  reloadButtonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "InterMedium",
  },
});
