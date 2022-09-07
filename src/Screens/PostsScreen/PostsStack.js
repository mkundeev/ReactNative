import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./MapScreen";
import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PostsStack = createNativeStackNavigator();
export default function PostsStackScreen({ navigation }) {
  return (
    <PostsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#515151" },
        headerTitleAlign: "center",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <PostsStack.Screen
        options={{
          headerRight: ({ pressColor }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.logOut}
              onPress={() => navigation.navigate("Log In")}
            >
              <MaterialCommunityIcons name="logout" size={24} color="#FF6C00" />
            </TouchableOpacity>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <PostsStack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.logOut}
              onPress={() => navigation.navigate("Posts")}
            >
              <AntDesign name="arrowleft" size={24} color="#FF6C00" />
            </TouchableOpacity>
          ),
        }}
        name="Map"
        component={MapScreen}
      />
      <PostsStack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.logOut}
              onPress={() => navigation.navigate("Posts")}
            >
              <AntDesign name="arrowleft" size={24} color="#FF6C00" />
            </TouchableOpacity>
          ),
        }}
        name="Comments"
        component={CommentsScreen}
      />
    </PostsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  logOut: {
    padding: 10,
  },
});
