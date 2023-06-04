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

import Card from "../components/Card";
import colors from "../constants/Colors";
import * as noticesData from "../../data/notices.json";
import { fetchNotices } from "../redux/noticesSlice";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const NoticeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error } = useSelector((state) => state.notices);
  const [notices, setNotices] = useState([]);

  const formatDate = (date) => {
    return moment(date).format("DD MMMM YYYY");
  };
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
        setNotices(newNotices);
      })
      .catch((error) => console.log("Error in notices screen", error));
  };

  useEffect(() => {
    //console.log("useeffect");
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
                  <Card
                    navigation={navigation}
                    isUnread={true}
                    details={item.details}
                    time={item.createdAt}
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
