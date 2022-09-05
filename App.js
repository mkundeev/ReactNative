import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "./src/Screens/AuthScreens/AuthScreen";
import Home from "./src/Screens/MainScreens/Home";

export default function App() {
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

  return (
    <>
      {isReady && (
        <>
          <NavigationContainer>
            <AuthScreen />
          </NavigationContainer>
        </>
      )}
    </>
  );
}
