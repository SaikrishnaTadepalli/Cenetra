import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import colors from "../constants/Colors";

const ChatCard = ({ name, subject, time, navigation, isRead }) => {
  const image = require("../../assets/chatImage.jpeg");
  const [isChatRead, setIsChatRead] = useState(isRead);

  const handleClick = () => {
    navigation.navigate("IndividualChat", { title: name });
    setIsChatRead(true);
  };
  const dotColor = isChatRead ? null : colors.blue;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleClick}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image
          source={image}
          height={1}
          width={1}
          style={{ height: 40, width: 40, marginRight: 6 }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.subject}>{subject}</Text>
            {isChatRead ? null : (
              <View
                style={[styles.dotContainer, { backgroundColor: dotColor }]}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 50,
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
    alignSelf: "center",
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
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    color: colors.primaryText,
    fontFamily: "InterBold",
  },
  timeText: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: "InterMedium",
    alignSelf: "center",
  },
  subject: {
    color: colors.darkGrey,
    fontSize: 14,
    fontFamily: "InterMedium",
  },
});
