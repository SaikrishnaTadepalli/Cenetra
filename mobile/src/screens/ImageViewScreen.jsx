import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ImageViewScreen = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.picture}
        source={{
          uri: route.params.uri,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default ImageViewScreen;

const styles = StyleSheet.create({
  picture: {
    flex: 1,
  },
});
