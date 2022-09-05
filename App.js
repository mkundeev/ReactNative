import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/Screens/LoginScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";

const AuthStack = createNativeStackNavigator();
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
            <AuthStack.Navigator>
              <AuthStack.Screen
                options={{ headerShown: false }}
                name="Log In"
                component={LoginScreen}
              />
              <AuthStack.Screen
                options={{ headerShown: false }}
                name="Registration"
                component={RegistrationScreen}
              />
            </AuthStack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}
