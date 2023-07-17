// FeedbackScreen.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

const FeedbackScreen = () => {
  const googleFormURL = "https://forms.gle/dA9XtNQTfFbC35jZ9"; // Replace with your Google Form URL

  const openGoogleForm = () => {
    Linking.openURL(googleFormURL);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openGoogleForm}>
        <Text style={styles.buttonText}>Leave Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#23342C",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FeedbackScreen;
