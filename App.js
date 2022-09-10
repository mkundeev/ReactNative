import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "./src/Screens/AuthScreens/AuthScreen";
import { store } from "./src/redux/store";

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
        <Provider store={store}>
          <NavigationContainer>
            <AuthScreen />
          </NavigationContainer>
        </Provider>
      )}
    </>
  );
}
