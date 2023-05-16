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

const LogScreen = ({ navigation, route }) => {
  const logs = route.params.data;
  const pictures = [];
  route.params.pictures.map((picture, idx) =>
    pictures.push({ idx: idx, uri: picture })
  );

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style={{ alignSelf: "flex-end" }}>
        <TouchableOpacity
          style={styles.buttonText}
          onPress={() =>
            navigation.navigate("Gallery", {
              pictures: pictures,
              title: "Today's gallery",
            })
          }
        >
          <Text style={styles.buttonText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={styles.imagesContainer}>
        {pictures.map((picture, idx) =>
          idx < 10 ? (
            <View
              key={`log-picture-${picture.idx}`}
              style={styles.imageContainer}
            >
              <Picture uri={picture.uri} navigation={navigation} />
            </View>
          ) : null
        )}
      </ScrollView>
      {logs.map((log, idx) => (
        <View key={`log-title-${idx}`}>
          <Text style={[styles.sectionHeader, { color: "" }]}>
            {log.sectionHeader}
          </Text>
          <View style={[styles.divider, { borderColor: "" }]} />
          {log.sectionActivities.map((data, idx) => (
            <View style={styles.logsContainer} key={`log-info-${idx}`}>
              <LogCard
                sectionHeaderColor={data.color}
                name={data.title}
                description={data.description}
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
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
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
    width: "100%",
    marginBottom: 25,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 12,
    fontFamily: "InterMedium",
    marginVertical: 8,
  },
  imagesContainer: {
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
