import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

import LogCard from "../components/LogCard";
import Picture from "../components/Picture";
import colors from "../constants/Colors";

const LogScreen = ({ navigation }) => {
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

  const logs = [
    {
      title: "Overview",
      color: colors.green,
      data: [
        {
          id: "1",
          title: "Activities",
          text: "Created Santa with coffee filters, googly eyes, cotton ball and glue",
        },
        { id: "2", title: "Sleep", text: "Slept for 1.5 hours" },
        { id: "3", title: "Pee", text: "Pee in toilet" },
      ],
    },
    {
      title: "Meals",
      color: "pink",
      data: [
        {
          id: "5",
          title: "Morning Snack",
          text: "Menu: Whole Wheat English Muffin Toasted with Margarine, Fresh Fruit",
        },
        {
          id: "6",
          title: "Lunch",
          time: "Time",
          text: "Menu: Greek Chicken Souvlaki with WG Rice and Tzatziki Sauce (skinless chicken breast, chicken soup base, lemon, cucumbers, garlic) Milk, Fresh Fruit Notes: Had 1 bowl veggie rice, apple , milk",
        },
        {
          id: "7",
          title: "Afternoon Snack",
          text: "Menu: Carrot Muffins, Fresh Fruit Notes: Carrots muffin, cantaloupe O water",
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 32 }}
    >
      <View style={{ alignSelf: "flex-end" }}>
        <TouchableOpacity
          style={styles.buttonText}
          onPress={() => navigation.navigate("Gallery")}
        >
          <Text style={styles.buttonText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={styles.imagesContainer}>
        {pictures.map((picture, idx) =>
          idx < 10 ? (
            <View key={picture.id} style={styles.imageContainer}>
              <Picture isGallery={false} uri={picture.uri} />
            </View>
          ) : null
        )}
      </ScrollView>
      {logs.map((log) => (
        <View key={log.id}>
          <Text style={[styles.sectionHeader, { color: log.color }]}>
            {log.title}
          </Text>
          <View style={[styles.divider, { borderColor: log.color }]} />
          {log.data.map((data, idx) => (
            <View style={styles.logsContainer} key={idx}>
              <LogCard
                sectionHeaderColor={log.color}
                header={data.title}
                text={data.text}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  sectionHeader: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "InterSemiBold",
    marginBottom: 8,
    marginTop: 10,
  },
  divider: {
    borderWidth: 0.5,
    width: 390,
    marginBottom: 25,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 12,
    fontFamily: "InterMedium",
    marginRight: 16,
    marginVertical: 8,
  },
  imagesContainer: {
    marginLeft: 20,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  logsContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
});
