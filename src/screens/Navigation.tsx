import React, { useCallback, useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Welcome";
import TabBar from "./TabBar";
import Login from "./Authentication/Login/Login";
import Signup from "./Authentication/Signup/Signup";
import Home from "./HomePage/Home";
import Package from "./Profiles/Packages/Package";
import { useColorMode } from "native-base";
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
import Result from "./Chat/Result";
import HealthInfoInput from "./Chat/HealthInfoInput";
import AssessmentDetail from "./Profiles/AssessmentHistory/AssessmentDetail";

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

      authContext.setAuthState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        authenticated: accessToken ? true : false,
        user: user ? JSON.parse(user) : null,
      });
      // console.log("JWT loaded-------------", authContext.authState);
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
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "",
            }}
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
              headerShown: false,
              animation: "default",
            }}
          />
          <Stack.Screen
            name="Result"
            component={Result}
            options={{
              headerShown: false,
              animation: "slide_from_right",
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
            name="UserInfo"
            component={UserInfo}
            options={{
              title: "Thông tin cơ bản",
              headerStyle: {
                backgroundColor:
                  colorMode === "dark" ? Colors.black : Colors.white,
              },
              headerTintColor:
                colorMode === "dark" ? Colors.white : Colors.black,
            }}
          />
          <Stack.Screen
            name="AssessmentHistory"
            component={AssessmentHistory}
            options={{
              title: "Lịch sử chẩn đoán",
              headerStyle: {
                backgroundColor:
                  colorMode === "dark" ? Colors.black : Colors.white,
              },
              headerTintColor:
                colorMode === "dark" ? Colors.white : Colors.black,
            }}
          />
          <Stack.Screen
            name="AssessmentDetail"
            component={AssessmentDetail}
            options={{
              title: "Chi tiết chẩn đoán",
              headerStyle: {
                backgroundColor:
                  colorMode === "dark" ? Colors.black : Colors.white,
              },
              headerTintColor:
                colorMode === "dark" ? Colors.white : Colors.black,
            }}
          />
          <Stack.Screen
            name="HealthInfoInput"
            component={HealthInfoInput}
            options={{
              headerShown: false,
              animation: "default",
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
