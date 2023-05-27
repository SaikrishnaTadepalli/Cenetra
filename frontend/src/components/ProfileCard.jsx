import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const ProfileCard = ({ sectionHeader, data, title, isEditable }) => {
  const renderButton = (infoType, info) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" ? (
          <Text style={styles.infoTypeText}>{infoType}</Text>
        ) : null}
        <TouchableOpacity editable={isEditable}>
          <Text style={styles.infoInputText}>{info} </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderText = (infoType, info) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" ? (
          <Text style={styles.infoTypeText}>{infoType}</Text>
        ) : null}
        <Text style={styles.infoInputText}>{info} </Text>
      </View>
    );
  };

  const renderInfo = () => {
    if (
      sectionHeader === "PRIMARY CONTACT" ||
      sectionHeader === "EMERGENCY CONTACTS"
    ) {
      return data.map((item, idx) => (
        <View key={`profile-info${idx}`}>
          <Text style={styles.headerText}>{item.title}</Text>
          {renderText("Name:", item.name)}
          {renderText("Relationship:", item.relationship)}
          {renderButton("Phone Number:", item.phone_number)}
          {renderButton("Email Address:", item.email_address)}
          {renderButton("Home Address:", item.home_address)}
          {data.indexOf(item) !== data.length - 1 ? (
            <View style={styles.divider} />
          ) : null}
        </View>
      ));
    } else if (sectionHeader === "ALLERGIES") {
      return data.map((item, idx) => (
        <View key={`profile-info${idx}`}>
          {renderText("Item:", item.name)}
          {renderText("Severity:", item.severity)}
          {data.indexOf(item) !== data.length - 1 ? (
            <View style={styles.divider} />
          ) : null}
        </View>
      ));
    } else if (sectionHeader === "MEDICATIONS") {
      return data.map((item, idx) => (
        <View key={`profile-info${idx}`}>
          {renderText("Medicine Name:", item.name)}
          {renderText("Dosage:", item.dosage)}
          {renderText("Frequency:", item.frequency)}
          {data.indexOf(item) !== data.length - 1 ? (
            <View style={styles.divider} />
          ) : null}
        </View>
      ));
    } else if (sectionHeader === "BLOOD GROUP") {
      return data.map((item, idx) => (
        <View key={`profile-info${idx}`}>{renderText("", item.name)}</View>
      ));
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.sectionHeaderText}>{sectionHeader}</Text>
        {renderInfo()}
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 16,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: Colors.lightGrey,
    shadowOffset: { height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginBottom: 10,
  },
  infoContainer: {
    marginLeft: 10,
  },
  sectionHeaderText: {
    color: Colors.navyBlue,
    fontFamily: "InterSemiBold",
    fontSize: 16,
    marginBottom: 10,
  },
  headerText: {
    color: "black",
    fontFamily: "InterSemiBold",
    fontSize: 16,
    marginBottom: 5,
  },
  infoLineContainer: {
    flexDirection: "row",
    marginBottom: 8,
    width: "100%",
  },
  infoTypeText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginRight: 10,
  },
  infoInputText: {
    fontSize: 16,
    fontFamily: "InterRegular",
    width: "100%",
  },
  healthInfoContainer: {
    flexDirection: "row",
  },
  divider: {
    borderColor: Colors.lightGrey,
    width: "95%",
    marginRight: 10,
    marginVertical: 10,
    alignSelf: "center",
    borderWidth: 0.5,
  },
});
