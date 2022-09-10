import React from "react";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsStackScreen from "../PostsScreen/PostsStack";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet } from "react-native";

const HomeStack = createBottomTabNavigator();
export default function Home({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#515151", color: "#fff" },
        headerStyle: { backgroundColor: "#515151" },
        headerTitleAlign: "center",
        headerTitleStyle: { color: "#fff" },
        headerPressColor: "#FF6C00",
      }}
    >
      <HomeStack.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "#FF6C00" : "#fff"}
            />
          ),
        }}
        name="PostsStackScreen"
        component={PostsStackScreen}
      />
      <HomeStack.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="plus-square-o"
              size={24}
              color={focused ? "#FF6C00" : "#fff"}
            />
          ),
          headerLeft: ({ pressColor }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.logOut}
              onPress={() => navigation.navigate("Posts")}
            >
              <AntDesign name="arrowleft" size={24} color={pressColor} />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <HomeStack.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? "#FF6C00" : "#fff"}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  logOut: {
    padding: 10,
  },
});
