import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";
import moment from "moment-timezone";

import colors from "../constants/Colors";

const Card = ({ navigation, isUnread, title, time, subText }) => {
  const [isNoticeUnread, setIsNoticeUnread] = useState(isUnread);

  const handleClick = () => {
    navigation.navigate("NoticeInfo", {
      title: title,
      subText: subText,
      time: time,
    });
    setIsNoticeUnread(false);
  };

  const cardColor = isNoticeUnread ? colors.lightGrey : colors.white;

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: cardColor }]}
      onPress={handleClick}
    >
      <View style={styles.headerRow}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "70%",
          }}
        >
          <View style={styles.dotContainer} />
          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <Text style={styles.timeText}>{moment(time).format("HH:mm")}</Text>
      </View>
      <View>
        <Text style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
          {subText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    minHeight: 55,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
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
    backgroundColor: "#2BB4FB",
    marginRight: 8,
  },
  titleText: {
    fontSize: 15,
    color: colors.primaryText,
    fontFamily: "InterMedium",
    width: "90%",
  },
  timeText: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: "InterMedium",
    alignSelf: "center",
    width: "30%",
    textAlign: "right",
  },
  subText: {
    color: colors.secondaryText,
    fontSize: 14,
    width: "90%",
    fontFamily: "InterMedium",
  },
});
