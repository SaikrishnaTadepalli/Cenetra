import { StyleSheet, FlatList, View } from "react-native";
import React from "react";

import Picture from "../components/Picture";
import colors from "../constants/Colors";

const GalleryScreen = ({ navigation, route }) => {
  return (
    <FlatList
      columnWrapperStyle={styles.imagesContainer}
      data={route.params.pictures}
      keyExtractor={(idx) => `gallery.id${idx}`}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{ height: 20 }}
      numColumns={3}
      renderItem={({ item }) => <Picture navigation={navigation} uri={item} />}
    />
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  imagesContainer: {
    backgroundColor: colors.white,
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    width: "100%",
  },
});
