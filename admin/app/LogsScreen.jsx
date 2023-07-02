import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import moment from "moment-timezone";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../src/constants/Colors";
import CreateLogScreen from "./CreateLogScreen";
import { useRouter } from "expo-router";
import LogScreen from "./LogScreen";
import { useDispatch, useSelector } from "react-redux";
import { getIsNewLogAdded, setIsNewLogAdded } from "../src/redux/logsSlice";
import { SectionList } from "react-native-web";

const LogsScreen = ({
  name,
  studentID,
  setIsStudentNameSelected,
  setIsOldLogSelected,
  setDate,
  setLogID,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state.log);
  const { logs, fetchLogsPending } = state;
  const curDate = moment().utc().format("DD MMMM YYYY");
  const [isExpanded, setIsExpanded] = useState([]);

  const handleClick = () => {
    setDate(curDate);
    setIsOldLogSelected(false);
    dispatch(setIsNewLogAdded(true));
    setLogID("");
    setIsStudentNameSelected(false);
  };

  const onClickLog = (logID) => {
    setIsOldLogSelected(true);
    setLogID(logID);
    setIsStudentNameSelected(false);
  };

  const onPressEdit = (date) => {
    // console.log(date);
    setIsOldLogSelected(false);
    setDate(date);
  };

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
    const date = moment(item.createdAt).utc().format("MMMM YYYY");
    return (
      <>
        {isExpanded[date] ? (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => onClickLog(item._id)}
          >
            {item ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.dateText}>
                  {moment(item.createdAt).utc().format("DD MMMM YYYY")}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}'s Logs</Text>
      <View style={{ flexDirection: "row" }}>
        <ScrollView contentContainerStyle={styles.listView}>
          {fetchLogsPending ? (
            <Text>Retrieving data...</Text>
          ) : logs.length > 0 ? (
            <SectionList
              sections={logs}
              stickySectionHeadersEnabled={false}
              keyExtractor={(log) => log._id}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{ height: 20 }}
              contentContainerStyle={styles.listView}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
            />
          ) : (
            // logs.map((log, idx) => (
            //   <TouchableOpacity
            //     style={styles.cardContainer}
            //     key={`date-${idx}`}
            //     onPress={() => onClickLog(log._id)}
            //   >
            //     {log ? (
            //       <View
            //         style={{
            //           flexDirection: "row",
            //           alignItems: "center",
            //         }}
            //       >
            //         <Text style={styles.dateText}>
            //           {moment(log.createdAt).utc().format("DD MMMM YYYY")}
            //         </Text>
            //       </View>
            //     ) : null}
            //   </TouchableOpacity>
            // ))
            <View>
              <Text>No logs are available.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default LogsScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "100%",
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
  header: {
    fontSize: 20,
    fontFamily: "InterSemiBold",
    marginBottom: 20,
  },
  dateText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    marginRight: 100,
  },
  listView: {
    paddingBottom: 60,
  },
  cardContainer: {
    width: 250,
    minHeight: 50,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: "#99B8BE99",
    height: 40,
    width: 132,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    alignSelf: "center",
    color: "#024552",
    fontWeight: 600,
  },
});
