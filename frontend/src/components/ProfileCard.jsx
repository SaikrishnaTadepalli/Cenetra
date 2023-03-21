import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const ProfileCard = ({ sectionHeader, data }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.sectionHeaderText}>{sectionHeader}</Text>
        {data.map((item) => (
          <View key={item.id}>
            <Text style={styles.headerText}>{item.title}</Text>
            <Text>{item.subText1}</Text>
            {item.subText2 ? <Text>{item.subText2}</Text> : null}
            {data.indexOf(item) !== data.length - 1 ? (
              <View style={styles.divider} />
            ) : null}
          </View>
        ))}
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
    fontSize: 14,
    marginBottom: 10,
  },
  headerText: {
    color: Colors.sectionText,
    fontFamily: "InterSemiBold",
    fontSize: 14,
    marginBottom: 5,
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
