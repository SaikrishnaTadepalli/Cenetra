import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

const DailyLogScreen = () => {
  const [date, setDate] = (useState < Date) | (undefined > undefined);
  const [open, setOpen] = useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Daily Logs</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select a date:</Text>
        <Button onPress={() => setOpen(true)}>
          {date ? date.toLocaleDateString() : "Select date"}
        </Button>
        <DatePickerModal
          visible={open}
          onDismiss={onDismiss}
          date={date}
          onConfirm={onConfirm}
          label="Select date"
          saveLabel="Confirm"
          clearLabel="Clear"
          // optional props
          // locale={'en'} // default is 'en-US'
          // mode="single"
          // animationType="slide"
        />
      </View>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => console.log("View Daily Log")}
      >
        View Daily Log
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => console.log("Update Daily Log")}
      >
        Update Daily Log
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAECFF",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    width: 200,
    backgroundColor: "#8390FA",
    marginTop: 20,
    padding: 15,
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DailyLogScreen;
