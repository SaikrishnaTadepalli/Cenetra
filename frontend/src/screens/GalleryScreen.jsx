import { StyleSheet, Text, FlatList, View } from "react-native";
import React from "react";

import Picture from "../components/Picture";
import colors from "../constants/Colors";

const GalleryScreen = () => {
  const pictures = [
    {
      id: "1",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "2",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "3",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "4",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "5",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "6",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
    {
      id: "7",
      uri: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",
    },
  ];
  return (
    <FlatList
      columnWrapperStyle={styles.imagesContainer}
      data={pictures}
      keyExtractor={(picture) => picture.id}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{ height: 20 }}
      numColumns={3}
      renderItem={({ item }) => <Picture isGallery={true} uri={item.uri} />}
    />
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  imagesContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
