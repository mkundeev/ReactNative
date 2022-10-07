import { useState, useEffect } from "react";
import { db } from "../../firebase/configFB";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useSelector } from "react-redux";
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
import { useIsFocused } from "@react-navigation/native";

export default function CommentsScreen({ route }) {
  const { photo, id } = route.params;
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const isFocused = useIsFocused();

  const { userId, login, avatar } = useSelector((state) => state.auth);

  const getAllComments = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", `${id}`, "comments")
    );
    let allComments = [];
    querySnapshot.forEach((doc) => {
      allComments.push({ ...doc.data(), id: doc.id });
    });
    setComments(allComments);
  };

  useEffect(() => {
    getAllComments();
    const hideKeybord = Keyboard.addListener("keyboardDidHide", () => {
      setIsShownKeybord(false);
    });

    return () => {
      hideKeybord.remove();
    };
  }, [comment, isFocused]);

  const onKeyboradHide = () => {
    setIsShownKeybord(false);
    Keyboard.dismiss();
  };

  const addComment = async () => {
    if (comment.trim().length === 0) {
      onKeyboradHide();
      return;
    }
    try {
      const date = new Date().toLocaleString();
      await addDoc(collection(db, "posts", `${id}`, "comments"), {
        comment,
        login,
        userId,
        date,
        avatar,
      });
      await updateDoc(doc(db, "posts", `${id}`), {
        comments: increment(1),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
            flex: 1,
          }}
        >
          <Image
            source={{ uri: photo }}
            style={{ height: 240, borderRadius: 16, marginBottom: 32 }}
          ></Image>
          <FlatList
            style={{ marginBottom: 10 }}
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  ...styles.commentBox,
                  flexDirection: item.userId === userId ? "row" : "row-reverse",
                }}
                onStartShouldSetResponder={() => true}
              >
                <View style={styles.comment}>
                  <Text style={styles.text}>{item?.comment}</Text>
                  <Text style={styles.textDate}>{item?.date}</Text>
                </View>
                <Image
                  source={{ uri: item.avatar }}
                  style={{
                    ...styles.avatar,
                    marginLeft: item.userId === userId ? 16 : 0,
                    marginRight: item.userId === userId ? 0 : 16,
                  }}
                ></Image>
              </View>
            )}
          ></FlatList>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" && "position"}
            keyboardVerticalOffset={100}
          >
            <View style={{ marginBottom: 32 }}>
              <TextInput
                style={{ ...styles.input, height: !isShownKeybord ? 40 : 120 }}
                placeholder="Add comment..."
                placeholderTextColor="#fff"
                onFocus={() => setIsShownKeybord(true)}
                onChangeText={setComment}
                value={comment}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={3}
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
  textDate: {
    fontFamily: "DMMono-Regular",
    textAlign: "right",
    fontSize: 11,
    paddingRight: 6,
  },
  input: {
    padding: 15,
    backgroundColor: "#515151",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    color: "#fff",
    paddingEnd: 40,
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
    marginBottom: 10,
    minHeight: 30,
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
  },
});
