import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { React, useState } from "react";

import colors from "../src/constants/Colors";
import DragAndDrop from "../src/components/DragAndDrop";

const inputs = [
  "What food did they eat",
  "What work did they do",
  "What games did they play",
  "Additional Comments",
];

const LogScreen = ({ date }) => {
  const [isEditable, setEditable] = useState(true);

  const onSave = () => {
    setEditable(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{date}</Text>
      <View>
        <ScrollView contentContainerStyle={styles.listView}>
          {inputs.map((input, idx) => (
            <View key={`input-${idx}`}>
              <Text style={{ marginBottom: 10 }}>{input}</Text>
              <TextInput
                style={styles.cardContainer}
                multiline
                editable={isEditable}
                numberOfLines={4}
                maxLength={200}
              />
            </View>
          ))}
        </ScrollView>
        <DragAndDrop />
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            alignSelf: "center",
            marginRight: 100,
          }}
        >
          <TouchableOpacity>
            <Text style={styles.cancelText} onPress={() => setEditable(false)}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
    width: "80%",
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 30,
  },
  listView: {
    width: "80%",
  },
  cardContainer: {
    minHeight: 60,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    backgroundColor: colors.lightPurple,
    height: 40,
    width: "30%",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "center",
    color: colors.primaryText,
    fontWeight: 600,
  },
  saveButton: {
    marginLeft: 18,
  },
  saveText: {
    color: colors.buttonText,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "InterBold",
  },
  cancelText: {
    color: colors.red,
    fontSize: 18,
    fontFamily: "InterBold",
  },
});
