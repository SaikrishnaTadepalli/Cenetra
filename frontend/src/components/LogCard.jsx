import { StyleSheet, Text, View } from "react-native";
import React from "react";

import colors from "../constants/Colors";

const LogCard = ({ sectionHeaderColor, header, text }) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: sectionHeaderColor },
        ]}
      >
        <Text style={styles.header}>{header}</Text>
      </View>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>{text}</Text>
      </View>
    </View>
  );
};

export default LogCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 390,
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  headerContainer: {
    width: "100%",
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  header: {
    color: colors.white,
    fontFamily: "InterBold",
    fontSize: 16,
    textAlign: "left",
    paddingVertical: 8,
    marginLeft: 10,
  },
  mainTextContainer: {
    paddingVertical: 20,
  },
  mainText: {
    textAlign: "left",
    marginHorizontal: 10,
    textAlignVertical: "center",
    fontFamily: "InterRegular",
    color: colors.primaryText,
  },
});
