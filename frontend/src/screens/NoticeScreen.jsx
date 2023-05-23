import { StyleSheet, Text, View, SectionList } from "react-native";
import React from "react";

import Card from "../components/Card";
import colors from "../constants/Colors";
import * as noticesData from "../../data/notices.json";

const NoticeScreen = ({ navigation }) => {
  const notices = noticesData.notices;

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
              navigation={navigation}
              isUnread={item.unread}
              title={item.subject}
              time={item.time_sent}
              subText={item.description}
            />
          </View>
        )}
        renderSectionHeader={({ section: { date } }) => (
          <Text style={styles.sectionHeaderText}>{date}</Text>
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
