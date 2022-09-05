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
  TouchableWithoutFeedback,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const [isSecureTextEntry, IsSecureTextEntry] = useState(true);

  const onKeyboradHide = () => {
    setIsShownKeybord(false);
    Keyboard.dismiss();
  };
  const onSubmit = () => {
    onKeyboradHide();
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={onKeyboradHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../img/background-img.jpg")}
          style={styles.background}
        >
          <View
            style={{
              ...styles.formBackdrop,
              height: isShownKeybord ? 248 : 489,
            }}
          >
            <View style={styles.centerBox}></View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShownKeybord ? 32 : 144,
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Log in</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsShownKeybord(true)}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                  ></TextInput>
                </View>
                <View style={{ marginBottom: isShownKeybord ? 0 : 43 }}>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={isSecureTextEntry}
                    onFocus={() => setIsShownKeybord(true)}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                  ></TextInput>
                  <View style={styles.showPasswordBox}>
                    <Text
                      style={styles.text}
                      onPress={() => {
                        IsSecureTextEntry(!isSecureTextEntry);
                      }}
                    >
                      {isSecureTextEntry ? "Show password" : "Hide password"}
                    </Text>
                  </View>
                </View>
                <View style={{ display: isShownKeybord ? "none" : "flex" }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={onSubmit}
                  >
                    <Text style={styles.textButton}>Log in</Text>
                  </TouchableOpacity>
                  <View style={styles.loginAccountView}>
                    <Text style={styles.loginAccountText}>No account? </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Registration")}
                    >
                      <Text style={styles.loginAccountAccentText}>
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: { marginHorizontal: 16 },
  formBackdrop: {
    backgroundColor: "#121212",
    justifyContent: "flex-end",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    height: 50,
    paddingLeft: 16,
    fontFamily: "DMMono-Regular",
  },
  button: {
    backgroundColor: "#fff",
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    marginBottom: 16,
  },
  textButton: {
    color: "#000",
    textAlign: "center",
    fontFamily: "DMMono-Regular",
    fontSize: 16,
  },
  header: {
    marginBottom: 33,
  },
  headerTitle: {
    fontSize: 30,
    textAlign: "center",
    color: "#fff",
    fontFamily: "DMMono-Medium",
  },
  enterAccountText: {
    color: "#fff",
    fontFamily: "DMMono-Medium",
    textAlign: "center",
  },
  showPasswordBox: {
    position: "absolute",
    bottom: 15,
    right: 16,
    color: "#FF6C00",
  },
  text: {
    color: "#FF6C00",
    fontFamily: "DMMono-Regular",
  },
  loginAccountView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginAccountText: {
    color: "#fff",
    fontFamily: "DMMono-Medium",
    textAlign: "center",
  },
  loginAccountAccentText: {
    fontFamily: "DMMono-Medium",
    color: "#FF6C00",
  },
});
