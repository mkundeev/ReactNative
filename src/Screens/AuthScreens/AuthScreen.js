import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import Home from "../MainScreens/Home";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../../redux/authOperations";

const AuthStack = createNativeStackNavigator();
export default function AuthScreen() {
  const { state } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [state]);
  return (
    <AuthStack.Navigator>
      <>
        {!state ? (
          <>
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
          </>
        ) : (
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        )}
      </>
    </AuthStack.Navigator>
  );
}
