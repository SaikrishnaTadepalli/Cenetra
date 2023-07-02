import { StyleSheet, FlatList, View } from "react-native";
import React from "react";

import Picture from "../components/Picture";
import colors from "../constants/Colors";

const GalleryScreen = ({ navigation, route }) => {
  return (
    <View style={{ paddingHorizontal: 10, height: "100%" }}>
      <FlatList
        columnWrapperStyle={styles.imagesContainer}
        data={route.params.pictures}
        keyExtractor={(idx) => `gallery.id${idx}`}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 20 }}
        numColumns={3}
        renderItem={({ item }) => (
          <Picture navigation={navigation} uri={item} />
        )}
      />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  imagesContainer: {
    marginVertical: 10,
    justifyContent: "space-between",
    width: "100%",
  },
});
