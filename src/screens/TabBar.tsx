import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TabActions } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Setting from "./Setting/Setting";
import Profiles from "./Profiles/Profiles";
import { Colors } from "../theme/Theme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Icon, useColorMode } from "native-base";
import Home from "./HomePage/Home";
import Information from "./Information/Information";

const Tab = createMaterialBottomTabNavigator();

const TabBar = () => {
  const { colorMode } = useColorMode();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={Colors.primaryMintDark}
      inactiveColor={colorMode === "dark" ? Colors.white : Colors.black}
      barStyle={{
        borderRadius: 20,
        height: 70,
        backgroundColor: colorMode === "dark" ? Colors.black : Colors.white,
      }}
      activeIndicatorStyle={{ opacity: 0 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="home" color={color} size={5} />
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={Profiles}
        options={{
          tabBarLabel: "Hồ sơ",
          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="user" color={color} size={5} />
          ),
        }}
      />
      <Tab.Screen
        name="Information"
        component={Information}
        options={{
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ color }) => (
            <Icon as={FontAwesome} name="newspaper-o" color={color} size={5} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="setting" color={color} size={5} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
export default TabBar;
