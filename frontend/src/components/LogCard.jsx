import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment-timezone";

import colors from "../constants/Colors";

const LogCard = ({ sectionHeaderColor, title, description }) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={[styles.nameContainer, { backgroundColor: sectionHeaderColor }]}
      >
        <Text style={styles.name}>{title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default LogCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  nameContainer: {
    width: "100%",
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  name: {
    color: colors.black,
    fontFamily: "InterMedium",
    fontSize: 16,
    textAlign: "left",
    paddingVertical: 8,
    marginLeft: 10,
  },
  descriptionContainer: {
    paddingVertical: 20,
  },
  description: {
    textAlign: "left",
    marginHorizontal: 10,
    textAlignVertical: "center",
    fontFamily: "InterRegular",
    color: colors.primaryText,
  },
});
