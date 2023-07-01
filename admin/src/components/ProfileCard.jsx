import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const ProfileCard = ({ sectionHeader, data, isApproval }) => {
  const renderText = (infoType, info) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" ? (
          <Text style={styles.infoTypeText}>{infoType}</Text>
        ) : null}
        <Text
          style={[
            styles.infoInputText,
            { width: infoType === "Home Address:" ? "60%" : "" },
          ]}
        >
          {info}
        </Text>
      </View>
    );
  };

  const renderInfo = () => {
    if (
      sectionHeader === "PRIMARY CONTACTS" ||
      sectionHeader === "EMERGENCY CONTACTS"
    ) {
      return (
        <View style={{ flexDirection: "row" }}>
          {data.map((item, idx) => (
            <View
              key={`profile-info${idx}`}
              style={!isApproval ? styles.cardContainer : null}
            >
              {!isApproval ? (
                <Text style={styles.headerText}>{item.title} information</Text>
              ) : null}
              {renderText("Name:", item.name)}
              {renderText("Relationship:", item.relationship)}
              {renderText("Phone Number:", item.phoneNumber)}
              {renderText("Email:", item.email)}
              {renderText("Home Address:", item.address)}
            </View>
          ))}
        </View>
      );
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
          {renderText("Name:", item.name)}
          {renderText("Dosage:", item.dosage)}
          {renderText("Frequency:", item.frequency)}
          {data.indexOf(item) !== data.length - 1 ? (
            <View style={styles.divider} />
          ) : null}
        </View>
      ));
    } else if (sectionHeader === "BLOOD GROUP") {
      return <View>{renderText("", data.name)}</View>;
    }
  };

  return (
    <View>
      <View style={styles.infoContainer}>{renderInfo()}</View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  cardContainer: {
    // width: "100%",
    backgroundColor: "#D9D9D94D",
    width: 400,
    paddingBottom: 20,
    // height: 250,
    marginBottom: 40,
    borderRadius: 5,
    paddingLeft: 20,
    marginRight: 40,
  },
  whiteCardContainer: {
    width: 400,
    paddingBottom: 10,
    borderColor: "#D9D9D980",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 20,
    marginRight: 40,
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
    fontSize: 20,
    marginVertical: 12,
  },
  infoLineContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  infoTypeText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    marginRight: 10,
  },
  infoInputText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    flexWrap: "wrap",
  },
  healthInfoContainer: {
    flexDirection: "row",
  },
  divider: {
    borderColor: "#23342C",
    width: "95%",
    marginRight: 10,
    marginBottom: 14,
    alignSelf: "center",
    borderWidth: 0.7,
  },
});
