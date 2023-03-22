import { StyleSheet, Text, FlatList, View } from "react-native";
import React from "react";

import Picture from "../components/Picture";
import colors from "../constants/Colors";

const GalleryScreen = ({ navigation }) => {
  const pictures = [
    {
      id: "1",
      uri: "data:image/jpeg;base64,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",
    },
    {
      id: "2",
      uri: "data:image/jpeg;base64,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",
    },
    {
      id: "3",
      uri: "data:image/jpeg;base64,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",
    },
    {
      id: "4",
      uri: "data:image/jpeg;base64,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",
    },
    {
      id: "5",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcoIhpI51fny3gKoIdJ_tS7U4uWOAfr_z1og&usqp=CAU",
    },
    {
      id: "6",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzOzOPMnjMfKcFmqJwDwRjUoik0qaX_QzRw&usqp=CAU",
    },
    {
      id: "7",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNNZHTaNU866H34yXaUk2cHjrbkU0PirSiQ&usqp=CAU",
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
      renderItem={({ item }) => (
        <Picture navigation={navigation} uri={item.uri} />
      )}
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
