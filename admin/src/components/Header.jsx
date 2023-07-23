import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../redux/authSlice";
import { SelectList } from "react-native-dropdown-select-list";
import { setIsNewClassAdded } from "../redux/classSlice";
import { setIsNewTeacherAdded } from "../redux/teacherSlice";
import { setIsNewStudentAdded } from "../redux/studentSlice";

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const pages = ["Home", "Daily Logs", "Notices", "Create"];
  const screens = [
    "HomeScreen",
    "DailyLogsScreen",
    "NoticesScreen",
    "CreateScreen",
  ];

  const [activeButton, setActiveButton] = useState("Home");
  const loggedIn = localStorage.getItem("isLoggedIn");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (idx, button) => {
    if (idx === 3) dispatch(setIsNewClassAdded(true));
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
            <Text style={styles.headerText}>Cenetra</Text>
            <>
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
            </>
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
    fontSize: 26,
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
  dropdownMenu: {
    //marginTop: 220,
    top: "100%",
    marginLeft: "-15%",
    width: 120,
    backgroundColor: "#f9f9f9",
    padding: 10,
    //zIndex: 1,
  },
});
