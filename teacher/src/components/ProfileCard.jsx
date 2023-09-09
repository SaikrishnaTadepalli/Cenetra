import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const ProfileCard = ({ sectionHeader, data, title }) => {
  const layout = useWindowDimensions();
  const renderButton = (infoType, info) => {
    return (
      <View style={styles.infoLineContainer}>
        {infoType !== "" ? (
          <Text style={styles.infoTypeText}>{infoType}</Text>
        ) : null}
        <TouchableOpacity>
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
      sectionHeader === "PRIMARY CONTACTS" ||
      sectionHeader === "EMERGENCY CONTACTS"
    ) {
      return (
        <View style={{ flexDirection: layout.width >= 768 ? "row" : "column" }}>
          {data.map((item, idx) => (
            <View key={`profile-info${idx}`} style={styles.cardContainer}>
              <Text style={styles.headerText}>{item.title} information</Text>
              {renderText("Name:", item.name)}
              {renderText("Relationship:", item.relationship)}
              {renderText("Phone Number:", item.phoneNumber)}
              {renderText("Email:", item.email)}
              {renderText("Address:", item.address)}
            </View>
          ))}
        </View>
      );
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
    height: 250,
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
