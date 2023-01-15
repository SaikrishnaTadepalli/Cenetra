import { StyleSheet, Text, FlatList, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Picture from "../components/Picture";

const GalleryScreen = () => {
  const pictures = [
    { id: "1", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "2", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "3", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "4", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "5", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "6", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "7", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "8", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "9", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "10", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "11", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "12", uri: "https://reactnative.dev/img/tiny_logo.png" },
    { id: "13", uri: "https://reactnative.dev/img/tiny_logo.png" },
  ];
  return (
    <FlatList
      columnWrapperStyle={styles.imagesContainer}
      data={pictures}
      keyExtractor={(picture) => picture.id}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{ height: 20 }}
      numColumns={3}
      renderItem={({ picture }) => <Picture isGallery={true} />}
    />
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  imagesContainer: {
    backgroundColor: "#ffff",
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
