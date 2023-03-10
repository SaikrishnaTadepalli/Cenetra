import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import colors from "../constants/Colors";

const Picture = ({ isGallery, uri }) => {
  return (
    <View style={!isGallery ? styles.pictureContainer : null}>
      <Image
        style={!isGallery ? styles.pictureSize : styles.galleryPictureSize}
        source={{
          uri: uri,
        }}
        height={isGallery ? 150 : 90}
        width={isGallery ? 115 : 75}
      />
    </View>
  );
};

export default Picture;

const styles = StyleSheet.create({
  pictureContainer: {
    width: 115,
    height: 130,
    backgroundColor: colors.background,
    borderRadius: 20,
    justifyContent: "center",
  },
  pictureSize: {
    width: 75,
    height: 90,
    alignSelf: "center",
    borderRadius: 5,
  },
  galleryPictureSize: {
    width: 115,
    height: 130,
  },
});
