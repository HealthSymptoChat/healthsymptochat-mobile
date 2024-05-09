import React from "react";
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
import { useColorMode } from "native-base";
import { Colors } from "../theme/Theme";
import VerifyOTP from "./Authentication/Signup/VerifyOTP";
import InputInfo from "./Authentication/Signup/InputInfo";
import UserInfo from "./Profiles/UserInfo/UserInfo";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { colorMode } = useColorMode();
  return (
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
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="TabBar"
        component={TabBar}
        options={{ headerShown: false, animation: "default" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: colorMode === "dark" ? Colors.white : Colors.black,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: colorMode === "dark" ? Colors.white : Colors.black,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "", headerTransparent: true }}
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
      <Stack.Screen
        name="Package"
        component={Package}
        options={{
          title: "Danh sách gói",
          headerStyle: {
            backgroundColor: colorMode === "dark" ? Colors.black : Colors.white,
          },
          headerTintColor: colorMode === "dark" ? Colors.white : Colors.black,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: "Phương thức thanh toán",
          headerStyle: {
            backgroundColor: colorMode === "dark" ? Colors.black : Colors.white,
          },
          headerTintColor: colorMode === "dark" ? Colors.white : Colors.black,
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
    </Stack.Navigator>
  );
};

export default Navigation;
