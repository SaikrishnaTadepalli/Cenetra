import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "../constants/Colors";
import {
  AntDesign,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const IndividualChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon!</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.iconsContainer}>
          <Entypo name="plus" color={colors.purple} size={30} />
          <Ionicons name="camera" color={colors.purple} size={26} />
          <MaterialCommunityIcons
            name="image-multiple"
            color={colors.purple}
            size={26}
          />
        </View>
        <TextInput placeholder="Message" style={styles.input} />
      </View>
    </View>
  );
};

export default IndividualChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "InterBold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 100,
  },
  bottomContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 0,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 24,
    backgroundColor: colors.white,
    height: 90,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  iconsContainer: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-evenly",
    height: 36,
    alignItems: "center",
  },
  input: {
    backgroundColor: colors.lightPurple,
    width: "60%",
    height: 36,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});
