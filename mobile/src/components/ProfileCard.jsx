import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../constants/Colors";

const ProfileCard = ({ sectionHeader, data }) => {
  const renderText = (infoType, info) => {
    // info.trim();
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
      sectionHeader === "PRIMARY CONTACTS" ||
      sectionHeader === "EMERGENCY CONTACTS"
    ) {
      return data.map((item, idx) => (
        <View key={`profile-info${idx}`}>
          <Text style={styles.headerText}>{item.title}</Text>
          {renderText("Name:", item.name)}
          {renderText("Relationship:", item.relationship)}
          {renderText("Phone Number:", item.phoneNumber)}
          {renderText("Email:", item.email)}
          {renderText("Address:", item.address)}
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
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: colors.lightGrey,
    shadowOffset: { height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginBottom: 10,
  },
  infoContainer: {
    marginLeft: 10,
  },
  sectionHeaderText: {
    color: colors.navyBlue,
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
    width: "77%",
    flexWrap: "wrap",
  },
  healthInfoContainer: {
    flexDirection: "row",
  },
  divider: {
    borderColor: colors.lightGrey,
    width: "95%",
    marginRight: 10,
    marginVertical: 10,
    alignSelf: "center",
    borderWidth: 0.5,
  },
});
