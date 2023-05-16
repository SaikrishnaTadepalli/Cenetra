import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Picture = ({ uri, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.pictureContainer}
      onPress={() => navigation.navigate("ImageView", { uri: uri })}
    >
      <Image
        style={styles.picture}
        source={{
          uri: uri,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default Picture;

const styles = StyleSheet.create({
  pictureContainer: {
    width: 115,
    height: 130,
    marginRight: 8,
  },
  picture: {
    borderRadius: 10,
    flex: 1,
  },
});
