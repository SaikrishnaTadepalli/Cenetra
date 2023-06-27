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
  const pages = ["Home", "Approvals", "Notices", "Daily Logs", "Create"];
  const [selected, setSelected] = useState(0);
  const screens = [
    "HomeScreen",
    "ApprovalsScreen",
    "NoticesScreen",
    "DailyLogsScreen",
  ];
  const dropdownOptions = [
    { key: 1, value: "Create Class" },
    { key: 2, value: "Add Teacher" },
    { key: 3, value: "Add Student" },
  ];
  const dropdownScreens = [
    "CreateClassScreen",
    "AddTeacherScreen",
    "AddStudentScreen",
  ];
  const [activeButton, setActiveButton] = useState("Home");
  const loggedIn = localStorage.getItem("isLoggedIn");
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    console.log("1");
    setDropdownVisible(!isDropdownVisible);
  };

  const handleClick = (idx, button) => {
    if (button === "Create") {
      toggleDropdown();
      setActiveButton(button);
    } else {
      router.push(`/${screens[idx]}`);
      setActiveButton(button);
      setDropdownVisible(false);
    }
  };

  const handleDropdownOptions = () => {
    // console.log(selected, "handle press");
    if (selected === 1) {
      dispatch(setIsNewClassAdded(true));
    } else if (selected === 2) {
      dispatch(setIsNewTeacherAdded(true));
    } else if (selected === 3) {
      dispatch(setIsNewStudentAdded(true));
    }
    router.push(`/${dropdownScreens[selected - 1]}`);
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
              <View style={{ marginTop: 50, zIndex: 1 }}>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  onSelect={handleDropdownOptions}
                  data={dropdownOptions}
                  save="key"
                />
              </View>
              {/* {isDropdownVisible && ( */}
              {/* <View
                style={{
                  top: "170%",
                  position: "relative",
                  backgroundColor: "red",
                }}
                // onPress={() => console.log("dropdwonoption")}
              >
                {dropdownOptions.map((option, idx) => (
                  <TouchableOpacity
                    key={`options-${idx}`}
                    style={{ marginBottom: 20 }}
                    onPress={() => handleDropdownOptions(idx)}
                  >
                    <Text style={styles.optionsText}>{option}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={{ marginBottom: 20, backgroundColor: "pink" }}
                >
                  <Text style={styles.optionsText}>test</Text>
                </TouchableOpacity>
              </View> */}
              {/* )} */}
              {/* {isDropdownVisible && (
                <TouchableOpacity style={styles.dropdownMenu}>
                  <TouchableOpacity
                    onPress={() => console.log("clicked button")}
                    style={{ marginBottom: 20, backgroundColor: "pink" }}
                  >
                    <Text style={styles.optionsText}>test</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )} */}
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
