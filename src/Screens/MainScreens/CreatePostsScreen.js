import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CommentsScreen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  text: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "DMMono-Regular",
  },
});
