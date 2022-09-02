import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

export default function App() {
  const [password, setPassword] = useState("");
  const inputPasswordHandler = (password) => setPassword(password);
  const [email, setEmail] = useState("");
  const inputEmailHandler = (email) => setEmail(email);
  const [isShownKeybord, setIsShownKeybord] = useState(false);

  const onSubmit = () => {
    setIsShownKeybord(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./src/img/background-img.jpg")}
        style={styles.background}
      >
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{ ...styles.form, marginBottom: isShownKeybord ? 50 : 200 }}
          >
            <View>
              <Text style={styles.text}>Enter your email</Text>
              <TextInput
                style={styles.input}
                textAlign="center"
                value={email}
                onChangeText={inputEmailHandler}
                onFocus={() => setIsShownKeybord(true)}
              ></TextInput>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>Enter your password</Text>
              <TextInput
                style={styles.input}
                textAlign="center"
                value={password}
                onChangeText={inputPasswordHandler}
                secureTextEntry={true}
                onFocus={() => setIsShownKeybord(true)}
              ></TextInput>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={onSubmit}
            >
              <Text style={styles.textButton}>Log in</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  input: {
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    height: 40,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    marginHorizontal: 70,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
  },
  textButton: {
    color: "#000",
    textAlign: "center",
  },
});
