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
          title: "School Mobile Maintenance",
          time: "4 hours ago",
          subject: "Subject line...",
          isUnread: true,
        },
        {
          id: "2",
          title: "Campus Alert",
          time: "10 hours ago",
          subject:
            "Car crash reported near the main intersection. Be careful on your way to drop and pick up students.",
          isUnread: false,
        },
        {
          id: "3",
          title: "Homework Overdue",
          time: "12 hours ago",
          subject:
            "The students in section 4A have unionized and refused to do their homework. The staff are at their wits end. We are requesting reinforcements from the parents. Using divide and rule method, please discipline your children at home when the union has disperesed for the evening.",
          isUnread: true,
        },
        {
          id: "4",
          title: "PTA meeting",
          time: "13 hours ago",
          subject:
            "There is a PTA meeting scheduled for October 17th at 6 pm. There will be a virtual meeting link, although we would love to have you in person. ",
          isUnread: false,
        },
      ],
    },
    {
      title: "Yesterday",
      data: [
        {
          id: "5",
          title: "Friday return to normal operations",
          time: "12:03pm",
          subject: "Janitorial staff returns this friday.",
          isUnread: false,
        },
        {
          id: "6",
          title: "Important information",
          time: "10:00am",
          subject:
            "Tax season is comming up soon. Please file your taxes responsibly.",
          isUnread: false,
        },
        {
          id: "7",
          title: "Yellow Shirt Day",
          time: "1:00pm",
          subject:
            "Tomorrow is yellow shirt day. Please send your kids in with a yellow shirt. If this is not possible, any form of yellow clothing and/or accesories are also encouraged.",
          isUnread: false,
        },
      ],
    },
    {
      title: "October 2, 2022",
      data: [
        {
          id: "10",
          title: "Annual School Supplies Drive",
          time: "9:59am",
          subject:
            "We are collecting school supplies to donate to a local institution. The drive will be open from 9 am to 5 pm.",
          isUnread: false,
        },
        {
          id: "11",
          title: "Halloween Costume Day",
          time: "4:03pm",
          subject:
            "We are pre-poning halloween to October 3rd 2022. Send your child in spooky-mode if possible.",
          isUnread: false,
        },
      ],
    },
    {
      title: "September 30, 2022",
      data: [
        {
          id: "17",
          title: "Change in Holiday Schedule",
          time: "5:39pm",
          subject:
            "Christmas break has been pre-poned to include all of the month December! YAY!",
          isUnread: false,
        },
      ],
    },
    {
      title: "September 24, 2022",
      data: [
        {
          id: "17",
          title: "Back to School Bash",
          time: "4:20pm",
          subject:
            "Potluck planned for September 26th. Please send your child with any food if possible (no common allegeins).",
          isUnread: false,
        },
        {
          id: "18",
          title: "First class postponed to 9 A.M.",
          time: "10:12am",
          subject:
            "I woke up late lol. Pushing class back. Sorry, but I needed my beauty sleep.",
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
              navigation={navigation}
              isUnread={item.isUnread}
              title={item.title}
              time={item.time}
              subText={item.subject}
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
