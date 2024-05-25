import React, { useCallback, useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Welcome";
import TabBar from "./TabBar";
import Login from "./Authentication/Login/Login";
import Signup from "./Authentication/Signup/Signup";
import Home from "./HomePage/Home";
import ForgetPassword from "./Authentication/Login/ForgetPassword";
import VerifyCode from "./Authentication/Login/VerifyCode";
import ResetPassword from "./Authentication/Login/ResetPassword";
import Package from "./Profiles/Packages/Package";
import Payment from "./Profiles/Payment/Payment";
import { Spinner, useColorMode } from "native-base";
import { Colors } from "../theme/Theme";
import VerifyOTP from "./Authentication/Signup/VerifyOTP";
import InputInfo from "./Authentication/Signup/InputInfo";
import UserInfo from "./Profiles/UserInfo/UserInfo";
import AssessmentHistory from "./Profiles/AssessmentHistory/AssessmentHistory";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Chat from "./Chat/Chat";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = React.useState(true);
  const authContext: any = useContext(AuthContext);

  const loadJWT = useCallback(async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const user = await SecureStore.getItemAsync("user");
      const jwt = {
        accessToken,
        refreshToken,
      };
      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken ? true : false,
        user: user ? JSON.parse(user) : null,
      });
      console.log("JWT loaded-------------", authContext.authState);
    } catch (error: Error | any) {
      console.log("Error loading JWT", error);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
        user: null,
      });
    }
  }, []);

  useEffect(() => {
    const loadJWTAndSetLoading = async () => {
      await loadJWT();
      setLoading(false);
    };

    loadJWTAndSetLoading();
  }, [loadJWT, authContext?.authState?.accessToken]);

  if (loading) {
    return null;
  }
  return (
    <NavigationContainer
      theme={colorMode === "dark" ? DarkTheme : DefaultTheme}
    >
      {authContext.authState.authenticated === false ? (
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShadowVisible: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor:
                colorMode === "dark" ? Colors.white : Colors.black,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor:
                colorMode === "dark" ? Colors.white : Colors.black,
            }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ title: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="VerifyCode"
            component={VerifyCode}
            options={{ title: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ title: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="VerifyOTP"
            component={VerifyOTP}
            options={{ title: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="InputInfo"
            component={InputInfo}
            options={{ title: "", headerTransparent: true }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="TabBar"
          screenOptions={{
            headerShadowVisible: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            name="TabBar"
            component={TabBar}
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "", headerTransparent: true, animation: "none" }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              title: "",
              headerTransparent: true,
              animation: "default",
            }}
          />
          <Stack.Screen
            name="Package"
            component={Package}
            options={{
              title: "Danh sách gói",
              headerStyle: {
                backgroundColor:
                  colorMode === "dark" ? Colors.black : Colors.white,
              },
              headerTintColor:
                colorMode === "dark" ? Colors.white : Colors.black,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              title: "Thanh toán",
              headerStyle: {
                backgroundColor:
                  colorMode === "dark" ? Colors.black : Colors.white,
              },
              headerTintColor:
                colorMode === "dark" ? Colors.white : Colors.black,
            }}
          />
          <Stack.Screen
            name="UserInfo"
            component={UserInfo}
            options={{
              title: "",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="AssessmentHistory"
            component={AssessmentHistory}
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor:
                colorMode === "dark" ? Colors.white : Colors.black,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
