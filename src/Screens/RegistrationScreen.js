import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
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
  const [isShownKeybord, setIsShownKeybord] = useState(false);
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
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShownKeybord ? 20 : 150,
                marginHorizontal: orientation > 2 ? 200 : 70,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Welcome</Text>
                <Text style={styles.headerTitle}>Title</Text>
              </View>
              <View>
                <Text style={styles.text}>Enter your email</Text>
                <TextInput
                  style={styles.input}
                  textAlign="center"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsShownKeybord(true)}
                ></TextInput>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Enter your password</Text>
                <TextInput
                  style={styles.input}
                  textAlign="center"
                  value={password}
                  onChangeText={setPassword}
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
    </TouchableWithoutFeedback>
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
    fontFamily: "DMMono-Regular",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    height: 375,
    borderColor: "#2c3639'",
  },
  input: {
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    height: 40,
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
    fontFamily: "DMMono-Regular",
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: "DMMono-Medium",
  },
});
