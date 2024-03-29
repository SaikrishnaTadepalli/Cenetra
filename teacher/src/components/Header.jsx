import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../redux/authSlice";

const Header = () => {
  const pages = ["Home", "Daily Logs", "Notices"];
  const layout = useWindowDimensions();
  const screens = ["HomeScreen", "ClassListScreen", "NoticesScreen"];
  const [activeButton, setActiveButton] = useState("Home");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const loggedIn = localStorage.getItem("isLoggedIn");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (idx, button) => {
    router.push(`/${screens[idx]}`);
    setActiveButton(button);
  };

  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    dispatch(logout());
    router.push("/LoginScreen");
  };

  useEffect(() => {}, [isLoggedIn]);

  return (
    <>
      {loggedIn === "true" ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={[
                styles.headerText,
                { fontSize: layout.width >= 768 ? 26 : 0 },
              ]}
            >
              Curiouss Kids
            </Text>

            {pages.map((page, idx) => (
              <View
                key={`page-${idx}`}
                style={
                  page === activeButton
                    ? [
                        styles.optionsButtonContainer,
                        {
                          borderBottomColor: "black",
                          borderBottomWidth: 2,
                        },
                      ]
                    : styles.optionsButtonContainer
                }
              >
                <TouchableOpacity onPress={() => handleClick(idx, page)}>
                  <Text style={styles.optionsText}>{page}</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.logOutButtonContainer}
              onPress={handleLogOut}
            >
              <Text style={styles.logOutText}>Log out</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", alignSelf: "flex-start" }}
          ></View>
        </View>
      ) : null}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "#E8A2A84D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: "InterBold",
    marginLeft: 15,
    color: "#23342C",
  },
  optionsText: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    // marginBottom: 10,
  },
  logOutButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 40,
    backgroundColor: "#23342C",
    borderRadius: 100,
  },
  logOutText: {
    color: "white",
    fontFamily: "InterMedium",
  },
  optionsButtonContainer: {
    // marginTop: 40,
    paddingVertical: 20,
    width: 90,
    // backgroundColor: "lightblue",
    alignItems: "center",
  },
});
