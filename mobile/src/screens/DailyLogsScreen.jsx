import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  SectionList,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import Picture from "../components/Picture";
import colors from "../constants/Colors";
import DailyLogsCard from "../components/DailyLogsCard";
import * as dailyLogs from "../../data/dailyLogs.json";
import { useDispatch } from "react-redux";
import { fetchLogs, selectLogByID } from "../redux/dailyLogsSlice";
import { fetchStudentID } from "../redux/authSlice";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllMedia } from "../redux/mediaSlice";
import moment from "moment-timezone";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "../components/EmptyState";

const DailyLogsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = dailyLogs.logs[0].activities;
  const [refreshing, setRefreshing] = useState(false);
  const { logs, loading, error } = useSelector((state) => state.dailyLogs);
  const { allPictures } = useSelector((state) => state.media);
  const [isExpanded, setIsExpanded] = useState({});
  const curMonth = moment().utc().format("MMMM YYYY");

  const retrieveData = async () => {
    const studentID = await AsyncStorage.getItem("studentID");
    // console.log(studentID);
    dispatch(fetchLogs(studentID))
      .then((response) => {
        if (!response.error) {
          if (response.payload.data.logs.length > 0) {
            const segment = response.payload.data.logs[0].segment;
            const defaultIsExpanded = {};
            defaultIsExpanded[segment] = true;
            setIsExpanded(defaultIsExpanded);
          }
        }
      })
      .catch((error) => console.error("Error in Daily logs screen", error));
    dispatch(getAllMedia(studentID))
      .then((response) => {})
      .catch((error) =>
        console.error("Error in Daily logs screen getting media", error)
      );
  };

  useEffect(() => {
    // console.log("--------------------!!!!!!!!!!!-------------");
    // console.log(BACKEND_URI);
    // console.log("--------------------!!!!!!!!!!!-------------");
    retrieveData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    retrieveData();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleButtonPress = (buttonId) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [buttonId]: !prevState[buttonId],
    }));
  };

  const renderSectionHeader = ({ section: { segment } }) => {
    const style = () => {
      return !isExpanded[segment]
        ? { borderBottomColor: "black", borderBottomWidth: 1, marginBottom: 20 }
        : null;
    };
    return (
      <TouchableOpacity
        style={[styles.sectionHeader, style()]}
        onPress={() => handleButtonPress(segment)}
      >
        <Text style={styles.sectionHeaderText}>{segment}</Text>
        <Ionicons
          name={
            isExpanded[segment]
              ? "chevron-up-circle-outline"
              : "chevron-down-circle-outline"
          }
          size={20}
          color="black"
        />
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }) => {
    const itemDate = moment(item.createdAt).utc().format("MMMM YYYY");
    const date = itemDate === curMonth ? "This Month" : itemDate;
    return (
      <>
        {isExpanded[date] ? (
          <>
            {item ? (
              <View style={styles.logsContainer}>
                <DailyLogsCard
                  navigation={navigation}
                  date={item.createdAt}
                  data={item.details}
                  logID={item._id}
                  rating={item.rating}
                />
              </View>
            ) : null}
          </>
        ) : null}
      </>
    );
  };

  // Function to render each picture item
  const renderPictureItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Picture navigation={navigation} uri={item} />
    </View>
  );

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
          <SectionList
            sections={logs}
            contentContainerStyle={styles.mainContainer}
            stickySectionHeadersEnabled={false}
            keyExtractor={(log) => log._id}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ paddingBottom: 40 }}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={
              <View style={{ flexGrow: 1, justifyContent: "center" }}>
                <EmptyState emptyStateText="No logs are available." />
              </View>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={
              <>
                <Text style={styles.titleText}>Daily Logs</Text>
                {allPictures.length > 0 && (
                  <TouchableOpacity
                    style={styles.buttonText}
                    onPress={() =>
                      navigation.navigate("Gallery", {
                        pictures: allPictures,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>See All</Text>
                  </TouchableOpacity>
                )}
                <FlatList
                  data={allPictures.slice(0, 10)}
                  renderItem={renderPictureItem}
                  keyExtractor={(item, index) => `picture-${index}`}
                  horizontal
                  style={styles.imagesContainer}
                />
                {allPictures.length > 0 ? (
                  <View style={styles.horizontalDivider} />
                ) : (
                  logs.length > 0 && (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyStateText}>
                        There are no pictures.
                      </Text>
                    </View>
                  )
                )}
              </>
            }
          />
        )
      )}
    </>
  );
};

export default DailyLogsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    // paddingBottom: 32,
    width: "100%",
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 999,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontFamily: "InterSemiBold",
    fontSize: 18,
    marginBottom: 8,
    marginTop: 10,
  },
  titleText: {
    fontSize: 24,
    textAlign: "left",
    marginBottom: 8,
    marginTop: 20,
    fontFamily: "InterMedium",
    color: colors.black,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 12,
    fontFamily: "InterMedium",
    textAlign: "right",
    marginBottom: 8,
  },
  imagesContainer: {
    width: "100%",
    marginBottom: 20,
  },
  imageContainer: {
    marginRight: 10,
  },
  logsContainer: {
    alignItems: "center",
    marginBottom: 12,
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
  horizontalDivider: {
    borderLeftColor: "#D9D9D980",
    borderWidth: 0.3,
    width: "100%",
    marginBottom: 20,
  },
  emptyContainer: {
    borderWidth: 0.5,
    borderColor: "#5E5E5E",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 20,
    padding: 10,
  },
  emptyStateText: {
    color: "#99B8BE",
    textAlign: "center",
    fontSize: 16,
  },
});
