import { StyleSheet, Text, View, SectionList } from "react-native";
import React from "react";

import Card from "../components/Card";
import colors from "../constants/Colors";

const NoticeScreen = ({ navigation }) => {
  const notices = [
    {
      title: "Today",
      data: [
        {
          id: "1",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: true,
        },
        {
          id: "2",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "3",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: true,
        },
        {
          id: "4",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
      ],
    },
    {
      title: "Yesterday",
      data: [
        {
          id: "5",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "6",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "7",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "8",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "9",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
      ],
    },
    {
      title: "October 2, 2022",
      data: [
        {
          id: "10",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "11",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "12",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "13",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "14",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "15",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "16",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
      ],
    },
    {
      title: "April 16, 2022",
      data: [
        {
          id: "17",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "18",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "19",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
        {
          id: "20",
          title: "Title",
          time: "Time",
          date: "Created on...",
          isUnread: false,
        },
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
        renderItem={({ item }) => (
          <View style={styles.noticesContainer}>
            <Card
              isLog={false}
              navigateTo={"NoticeInfo"}
              navigation={navigation}
              isUnread={item.isUnread}
            />
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
    backgroundColor: colors.white,
    paddingBottom: 32,
  },
  titleText: {
    fontSize: 24,
    fontFamily: "InterMedium",
    textAlign: "left",
    marginLeft: 20,
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
    marginLeft: 20,
    marginTop: 20,
  },
});
