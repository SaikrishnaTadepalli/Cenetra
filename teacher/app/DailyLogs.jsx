import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SectionList,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import moment from "moment-timezone";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../src/constants/Colors";
import CreateLogScreen from "./CreateLogScreen";
import { useRouter } from "expo-router";
import LogScreen from "./LogScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogs,
  getIsNewLogAdded,
  setIsNewLogAdded,
} from "../src/redux/logsSlice";

const DailyLogsScreen = ({
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
  const curMonth = moment().utc().format("MMMM YYYY");
  //const [date, setDate] = useState("");
  //const [isOldLogSelected, setIsOldLogSelected] = useState(false);
  // const [logID, setLogID] = useState("");
  const [isExpanded, setIsExpanded] = useState([]);
  const isDisabled =
    logs[0] &&
    logs[0].data &&
    logs[0].data.length > 0 &&
    curDate === moment(logs[0].data[0].createdAt).utc().format("DD MMMM YYYY");

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
    //console.log(date);
    setIsOldLogSelected(false);
    setDate(date);
  };

  const handleButtonPress = (buttonId) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [buttonId]: !prevState[buttonId],
    }));
  };
  const retrieveData = () => {
    dispatch(fetchLogs(studentID))
      .then(() => {})
      .catch((error) => console.error(error));
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
  useEffect(() => {
    retrieveData();
  }, []);
  const renderItem = ({ item }) => {
    const itemDate = moment(item.createdAt).utc().format("MMMM YYYY");
    const date = itemDate === curMonth ? "This Month" : itemDate;
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
          <Ionicons name="add" size={20} color="#024552" />
          <Text style={styles.buttonText} onPress={handleClick}>
            Add a new log
          </Text>
        </TouchableOpacity>
      </View>
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
            //         {/* {moment(log.createdAt).format("DD MMMM YYYY") ===
            //           curDate && (
            //           <TouchableOpacity
            //             onPress={() => onPressEdit(log.createdAt)}
            //           >
            //             <MaterialCommunityIcons
            //               name="pencil-outline"
            //               size={20}
            //               color="#024552"
            //             />
            //           </TouchableOpacity>
            //         )} */}
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

export default DailyLogsScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "100%",
  },
  header: {
    fontSize: 20,
    fontFamily: "InterSemiBold",
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
