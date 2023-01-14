import { StyleSheet, Text, View, SectionList } from "react-native";
import React from "react";

import Card from "../components/Card";

const NoticeScreen = () => {
  const notices = [
    {
      title: "Today",
      data: [
        { id: "1", title: "Title", time: "Time", date: "Created on..." },
        { id: "2", title: "Title", time: "Time", date: "Created on..." },
        { id: "3", title: "Title", time: "Time", date: "Created on..." },
        { id: "4", title: "Title", time: "Time", date: "Created on..." },
      ],
    },
    {
      title: "Yesterday",
      data: [
        { id: "5", title: "Title", time: "Time", date: "Created on..." },
        { id: "6", title: "Title", time: "Time", date: "Created on..." },
        { id: "7", title: "Title", time: "Time", date: "Created on..." },
        { id: "8", title: "Title", time: "Time", date: "Created on..." },
        { id: "9", title: "Title", time: "Time", date: "Created on..." },
      ],
    },
    {
      title: "October 2, 2022",
      data: [
        { id: "10", title: "Title", time: "Time", date: "Created on..." },
        { id: "11", title: "Title", time: "Time", date: "Created on..." },
        { id: "12", title: "Title", time: "Time", date: "Created on..." },
        { id: "13", title: "Title", time: "Time", date: "Created on..." },
        { id: "14", title: "Title", time: "Time", date: "Created on..." },
        { id: "15", title: "Title", time: "Time", date: "Created on..." },
        { id: "16", title: "Title", time: "Time", date: "Created on..." },
      ],
    },
    {
      title: "April 16, 2022",
      data: [
        { id: "17", title: "Title", time: "Time", date: "Created on..." },
        { id: "18", title: "Title", time: "Time", date: "Created on..." },
        { id: "19", title: "Title", time: "Time", date: "Created on..." },
        { id: "20", title: "Title", time: "Time", date: "Created on..." },
      ],
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Notice Board</Text>
      <SectionList
        sections={notices}
        stickySectionHeadersEnabled={false}
        keyExtractor={(notice) => notice.id}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 20 }}
        renderItem={({ notice }) => (
          <View style={styles.noticesContainer}>
            <Card isLog={false} />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeaderText}>{title}</Text>
        )}
      />
    </View>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    paddingBottom: 32,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "left",
    marginLeft: 20,
    marginTop: 20,
  },
  noticesContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  sectionHeaderText: {
    color: "#585858",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
    marginLeft: 20,
    marginTop: 20,
  },
});
