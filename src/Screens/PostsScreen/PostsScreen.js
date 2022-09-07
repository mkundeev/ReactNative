import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) setPosts((prevState) => [route.params, ...prevState]);
  }, [route.params]);
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 16, marginTop: 32 }}>
        <View style={styles.userBox}>
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 16,
              backgroundColor: "#515151",
            }}
          ></View>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.textName}>Login</Text>
            <Text style={styles.textEmail}>Email@email.com</Text>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postBox}>
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
                    onPress={() => navigation.navigate("Comments", item.photo)}
                  >
                    <EvilIcons name="comment" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.textPost}>0</Text>
                </View>
                <View style={styles.locationInfo}>
                  <Ionicons name="location-outline" size={20} color="#fff" />
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
          )}
        ></FlatList>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#121212",
  },
  userBox: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    color: "#FFF",
    fontFamily: "DMMono-Medium",
    fontSize: 13,
  },
  textEmail: {
    color: "#515151",
    fontFamily: "DMMono-Regular",
    fontSize: 11,
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
});
