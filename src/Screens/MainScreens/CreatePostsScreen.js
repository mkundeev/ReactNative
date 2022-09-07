import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function CreatePostsScreen({ navigation }) {
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [location, setLocation] = useState("");

  const takePhoto = async () => {
    if (!snap) {
      console.log("error");
      return;
    }
    try {
      const { status } = await Camera.getCameraPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access camera was denied");
        return;
      }
      let { status: statusLocation } =
        await Location.requestForegroundPermissionsAsync();
      if (statusLocation !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const photo = await snap.takePictureAsync();
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setPhoto(photo.uri);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const hideKeybord = Keyboard.addListener("keyboardDidHide", () => {
      setIsShownKeybord(false);
    });
    return () => {
      hideKeybord.remove();
    };
  }, []);

  const onKeyboradHide = () => {
    setIsShownKeybord(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(photo, photoName, location);
    setPhoto("");
    setLocationName("");
    setPhotoName("");
    setLocation("");
    navigation.navigate("Posts", {
      photo,
      name: photoName,
      locationName,
      location,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={onKeyboradHide}>
      <View
        style={{
          ...styles.container,
          justifyContent: isShownKeybord ? "flex-end" : "space-between",
        }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <View
            style={{
              ...styles.form,
              marginBottom: Platform.OS === "ios" && isShownKeybord ? 80 : 20,
            }}
          >
            <View style={styles.addPhotoContainer}>
              <Camera style={styles.addPhotoBox} ref={setSnap}>
                <TouchableOpacity style={styles.photoIcon} onPress={takePhoto}>
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    color="#121212"
                  />
                </TouchableOpacity>
              </Camera>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addPhoto}
                onPress={() => {}}
              >
                <Text style={styles.upLoadPhotoText}>Upload photo</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 20 }}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#fff"
                  placeholder="Name..."
                  onFocus={() => setIsShownKeybord(true)}
                  onChangeText={setPhotoName}
                  value={photoName}
                ></TextInput>
              </View>
              <View>
                <TextInput
                  style={{ ...styles.input, paddingLeft: 36 }}
                  placeholderTextColor="#fff"
                  placeholder="Location"
                  onFocus={() => setIsShownKeybord(true)}
                  onChangeText={setLocationName}
                  value={locationName}
                ></TextInput>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color="#fff"
                  style={styles.locationIcon}
                />
              </View>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  display: isShownKeybord ? "none" : "flex",
                  backgroundColor: !(photo && photoName && location)
                    ? "#515151"
                    : "#fff",
                }}
                disabled={!(photo && photoName && location)}
                onPress={onSubmit}
              >
                <Text
                  style={{
                    ...styles.textButton,
                    color: !(photo && photoName && location) ? "#fff" : "#000",
                  }}
                >
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            ...styles.deletButtonBox,
            display: isShownKeybord ? "none" : "flex",
          }}
        >
          <TouchableOpacity style={styles.deletButton}>
            <AntDesign name="delete" size={24} color="#515151" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#121212",
  },
  form: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  addPhotoBox: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#515151",
    justifyContent: "center",
    alignItems: "center",
  },
  photoIcon: {
    backgroundColor: "#fff",
    height: 60,
    width: 60,
    borderRadius: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhoto: { marginTop: 8 },
  upLoadPhotoText: {
    color: "#FFF",
    fontFamily: "DMMono-Regular",
    fontSize: 16,
  },
  input: {
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    height: 40,
    paddingLeft: 16,
    fontFamily: "DMMono-Regular",
    fontSize: 16,
  },
  button: {
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    marginTop: 20,
  },
  textButton: {
    textAlign: "center",
    fontFamily: "DMMono-Regular",
    fontSize: 16,
  },
  locationIcon: {
    position: "absolute",
    left: 10,
    top: 7,
  },
  deletButtonBox: {
    alignItems: "center",
  },
  deletButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 36,
  },
});
