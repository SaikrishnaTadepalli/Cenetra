import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ChatCard from "../components/ChatCard";

import colors from "../constants/Colors";

const ChatScreen = ({ navigation }) => {
  const chats = [
    {
      id: "1",
      sender: "Vipasha Gupta",
      subject: "Thank you for your message",
      time: "1 min ago",
    },
    {
      id: "2",
      sender: "Saikrishna Tadepalli",
      subject: "Thank you for your message",
      time: "2 min ago",
    },
    {
      id: "3",
      sender: "Teacher",
      subject: "Thank you for your message",
      time: "10 min ago",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(chat) => chat.id}
        ListFooterComponent={
          <View
          // style={{
          //   borderBottomColor: colors.lightGrey,
          //   borderBottomWidth: 1,
          //   width: "96%",
          //   alignSelf: "center",
          // }}
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
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "600",
  },
  chatsContainer: {
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
