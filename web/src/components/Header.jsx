import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const Header = () => {
  const pages = ["Home", "Class list", "Notices"];
  const screens = ["HomeScreen", "ClassListScreen", "NoticesScreen"];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  const handleClick = (idx) => {
    router.push(`/${screens[idx]}`);
  };

  const onClickSettings = () => {
    router.push("/SettingsScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Cenetra</Text>
        <TouchableOpacity onPress={onClickSettings}>
          <Ionicons name="settings-sharp" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {isLoggedIn ? (
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          {pages.map((page, idx) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClick(idx)}
              key={`page-${idx}`}
            >
              <Text>{page}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    height: 50,
    width: "100%",
    backgroundColor: Colors.navyBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  text: {
    fontWeight: 800,
    fontSize: 20,
    marginLeft: 15,
    color: "white",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    marginLeft: 20,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12.0,
    //elevation: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
