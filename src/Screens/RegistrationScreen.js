import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import Svg, { Circle, Path } from "react-native-svg";
import * as SplashScreen from "expo-splash-screen";
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

export default function RegistrationScreen() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const [isSecureTextEntry, IsSecureTextEntry] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
          "DMMono-Medium": require("./assets/fonts/DMMono-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

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
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("./src/img/background-img.jpg")}
          style={styles.background}
        >
          <View
            style={{
              ...styles.formBackdrop,
              height: isShownKeybord ? 374 : 549,
            }}
          >
            <View style={styles.centerBox}>
              <View style={styles.avatarBox}>
                <View style={styles.addIconBox}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="none"
                    viewBox="0 0 25 25"
                  >
                    <Circle
                      cx="12.5"
                      cy="12.5"
                      r="12"
                      fill="none"
                      stroke="#FF6C00"
                    ></Circle>
                    <Path
                      fill="#FF6C00"
                      fillRule="evenodd"
                      d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6z"
                      clipRule="evenodd"
                    ></Path>
                  </Svg>
                </View>
              </View>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShownKeybord ? 32 : 78,
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Registration</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={styles.input}
                    value={login}
                    onChangeText={setLogin}
                    onFocus={() => setIsShownKeybord(true)}
                    placeholder="Login"
                    placeholderTextColor="#fff"
                  ></TextInput>
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
                    <Text style={styles.textButton}>Registration</Text>
                  </TouchableOpacity>
                  <View style={styles.enterAccountView}>
                    <Text style={styles.enterAccountText}>
                      Do you have an account? Enter
                    </Text>
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
  avatarBox: {
    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: "#2c3639",
    borderColor: "#fff",
    borderWidth: 1,
  },
  centerBox: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -60,
    alignItems: "center",
  },
  enterAccountText: {
    color: "#fff",
    fontFamily: "DMMono-Medium",
    textAlign: "center",
  },
  addIconBox: {
    position: "absolute",
    right: -13,
    bottom: 14,
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
});
