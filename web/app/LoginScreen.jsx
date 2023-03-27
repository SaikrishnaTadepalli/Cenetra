import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [teacherId, setTeacherId] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    // Perform validation here and handle success/failure accordingly
    if (loginCode === teacherId) {
      // Navigate to the main page if login is successful
      router.push("/MainScreen");
      setError("");
    } else {
      // Show error message if login is unsuccessful
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Cenetra</Text>
      <Text style={styles.subtitle}>Staff Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Teacher ID"
        value={teacherId}
        onChangeText={setTeacherId}
      />
      <TextInput
        style={styles.input}
        placeholder="Login Code"
        value={loginCode}
        onChangeText={setLoginCode}
        secureTextEntry={true}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {/* <Link to="/" style={styles.link}>
        <Text style={styles.linkText}>Cancel</Text>
      </Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAECFF",
    paddingHorizontal: "25%",
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#8390FA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "blue",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
