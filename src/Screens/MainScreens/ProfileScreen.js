import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { storage, db } from "../../firebase/configFB";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs, where, query } from "firebase/firestore";
import Svg, { Circle, Path } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { updateAvatar } from "../../redux/authOperations";
import { authSignOutUser } from "../../redux/authOperations";

import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function RegistrationScreen({ navigation }) {
  const [newAvatar, setNewAvatar] = useState(null);
  const { userId, login, avatar } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const uploadePhotoToServer = async () => {
    try {
      const response = await fetch(newAvatar);
      const file = await response.blob();
      console.log("file", file);
      const storageRef = ref(storage, `avatars/${userId}`);
      await uploadBytes(storageRef, file);
      const path = await getDownloadURL(ref(storage, `avatars/${userId}`));
      setNewAvatar(path);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setNewAvatar(result.uri);
      await uploadePhotoToServer();
      dispatch(updateAvatar(newAvatar));
    }
  };

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllPosts();
      return unsubscribe;
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../img/background-img.jpg")}
        style={styles.background}
      >
        <ScrollView style={{ flex: 1, height: "100%" }}>
          <View style={styles.formBackdrop}>
            <View style={styles.logout}>
              <TouchableOpacity onPress={() => dispatch(authSignOutUser())}>
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color="#FF6C00"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.centerBox}>
              <View style={styles.avatarBox}>
                <Image
                  style={{ height: "100%", width: "100%", borderRadius: 16 }}
                  source={{ uri: avatar }}
                ></Image>
                <TouchableOpacity style={styles.addIconBox} onPress={pickImage}>
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
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.titleText}>{login}</Text>
            <View style={{ marginHorizontal: 16 }}>
              {posts.map((item) => (
                <View style={styles.postBox} key={item.id}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{ height: 240, borderRadius: 16 }}
                  ></Image>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.textPost}>{item.name}</Text>
                  </View>
                  <View style={styles.postInfoBox}>
                    <View style={styles.comentsInfo}>
                      <TouchableOpacity
                        onPress={async () =>
                          navigation.navigate("Comments", {
                            photo: item.photo,
                            id: item.id,
                          })
                        }
                      >
                        <EvilIcons name="comment" size={24} color="#fff" />
                      </TouchableOpacity>
                      <Text style={styles.textPost}>0</Text>
                    </View>
                    <View style={styles.locationInfo}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color="#fff"
                      />
                      <Text
                        style={styles.textLocation}
                        onPress={() =>
                          navigation.navigate("Map", {
                            location: item.location,
                            title: item.locationName,
                          })
                        }
                      >
                        {item.locationName}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  formBackdrop: {
    backgroundColor: "#121212",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 150,
    height: "100%",
    flex: 1,
  },
  logout: {
    position: "absolute",
    top: 24,
    right: 24,
  },

  avatarBox: {
    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: "#515151",
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
  addIconBox: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  titleText: {
    color: "#fff",
    fontFamily: "DMMono-Medium",
    textAlign: "center",
    marginTop: 92,
    marginBottom: 33,
    fontSize: 30,
  },
  postBox: {
    marginBottom: 34,
  },
  postInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
  },
  comentsInfo: {
    flexDirection: "row",
  },
  locationInfo: {
    flexDirection: "row",
  },
  textPost: {
    color: "#FFF",
    fontFamily: "DMMono-Medium",
    fontSize: 16,
  },
  textLocation: {
    color: "#FFF",
    fontFamily: "DMMono-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
