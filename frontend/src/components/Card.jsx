import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";

import colors from "../constants/Colors";

const Card = ({
  isLog,
  navigation,
  navigateTo,
  isUnread,
  title,
  time,
  subText,
}) => {
  const [isNoticeUnread, setIsNoticeUnread] = useState(isUnread);

  const handleClick = () => {
    navigation.navigate(navigateTo);
    setIsNoticeUnread(false);
  };

  const cardColor = isNoticeUnread ? colors.lightGrey : colors.white;

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: cardColor }]}
      onPress={handleClick}
    >
      <View style={styles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isLog ? null : <View style={styles.dotContainer} />}
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View>
        <Text style={styles.dateText}>{subText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: 390,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "pink",
    marginRight: 8,
  },
  titleText: {
    fontSize: 15,
    color: colors.primaryText,
    textAlign: "center",
    fontFamily: "InterMedium",
  },
  timeText: {
    color: colors.secondaryText,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "InterMedium",
  },
  dateText: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: "InterMedium",
  },
});
