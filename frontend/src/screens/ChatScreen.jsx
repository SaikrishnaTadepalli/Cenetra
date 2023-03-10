import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ChatCard from "../components/ChatCard";

import colors from "../constants/Colors";

const ChatScreen = ({ navigation }) => {
  const chats = [
    {
      id: "1",
      sender: "Mr. Vladmir Putin",
      subject: "Thank you for your message",
      time: "1 min ago",
    },
    {
      id: "2",
      sender: "Ms. Kim Kardashian",
      subject: "I'll let you know as soon as possible",
      time: "2 min ago",
    },
    {
      id: "3",
      sender: "Ms. Nareni Modi",
      subject: "Will you be free for a chat?",
      time: "10 min ago",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={(chat) => chat.id}
        ListFooterComponent={
          <View
            style={{
              borderBottomColor: colors.lightGrey,
              borderBottomWidth: 1,
              width: "100%",
              alignSelf: "center",
              paddingBottom: 10,
            }}
          />
        }
        // ListFooterComponentStyle={{ height: 20 }}
        renderItem={({ item }) => (
          <View style={styles.chatsContainer}>
            <ChatCard
              name={item.sender}
              subject={item.subject}
              time={item.time}
              navigation={navigation}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    textAlign: "left",
    marginTop: 10,
    fontFamily: "InterMedium",
    color: colors.black,
    marginBottom: 15,
  },
  text: {
    fontSize: 30,
    fontWeight: "600",
  },
  chatsContainer: {
    backgroundColor: colors.white,
    marginVertical: 10,
  },
});
