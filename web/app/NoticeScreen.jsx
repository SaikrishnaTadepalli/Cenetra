import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

const NoticeScreen = ({ id }) => {
  const { notices } = useSelector((state) => state.notices);
  const notice = notices.find((notice) => (notice ? notice._id === id : null));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {notice ? moment(notice.createdAt).format("DD MMMM YYYY") : null}
      </Text>
      <Text>{notice ? notice.details : null}</Text>
    </View>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "80%",
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 30,
  },
});
