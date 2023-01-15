import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Picture = ({ isGallery }) => {
  return (
    <View style={!isGallery ? styles.pictureContainer : null}>
      <Image
        style={!isGallery ? styles.pictureSize : styles.galleryPictureSize}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
    </View>
  );
};

export default Picture;

const styles = StyleSheet.create({
  pictureContainer: {
    width: 115,
    height: 130,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
  },
  pictureSize: {
    width: 75,
    height: 90,
    alignSelf: "center",
    marginVertical: 18,
  },
  galleryPictureSize: {
    width: 115,
    height: 130,
  },
});
