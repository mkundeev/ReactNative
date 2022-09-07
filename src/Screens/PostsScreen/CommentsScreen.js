import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const onKeyboradHide = () => {
    setIsShownKeybord(false);
    Keyboard.dismiss();
  };
  useEffect(() => {
    const hideKeybord = Keyboard.addListener("keyboardDidHide", () => {
      setIsShownKeybord(false);
    });

    return () => {
      hideKeybord.remove();
    };
  }, []);

  const addComment = () => {
    setComments((prevState) => [comment, ...prevState]);
    setComment("");
    onKeyboradHide();
  };
  return (
    <TouchableWithoutFeedback onPress={onKeyboradHide}>
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 32,
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View>
            <Image
              source={{ uri: route.params }}
              style={{ height: 240, borderRadius: 16, marginBottom: 32 }}
            ></Image>
            <FlatList
              data={comments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.commentBox}>
                  <View style={styles.comment}>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                  <View style={styles.avatar}></View>
                </View>
              )}
            ></FlatList>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" && "position"}
            keyboardVerticalOffset={100}
          >
            <View style={{ marginBottom: 32 }}>
              <TextInput
                style={styles.input}
                placeholder="Add comment..."
                placeholderTextColor="#fff"
                onFocus={() => setIsShownKeybord(true)}
                onChangeText={setComment}
                value={comment}
              ></TextInput>
              <TouchableOpacity style={styles.button} onPress={addComment}>
                <AntDesign name="arrowup" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#121212",
  },
  text: {
    color: "#FFF",
    fontFamily: "DMMono-Regular",
    padding: 6,
  },
  input: {
    paddingLeft: 10,
    backgroundColor: "#515151",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 40,
    height: 40,
    color: "#fff",
  },
  button: {
    position: "absolute",
    right: 5,
    top: 5,
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  commentBox: {
    flexDirection: "row",
  },
  comment: {
    backgroundColor: "#515151",
    borderRadius: 4,
    flex: 1,
  },
  avatar: {
    height: 28,
    width: 28,
    backgroundColor: "#515151",
    borderRadius: 28,
    marginLeft: 16,
  },
});
