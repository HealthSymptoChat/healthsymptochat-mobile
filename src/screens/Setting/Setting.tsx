import {
  SafeAreaView,
  StatusBarStyle,
  StyleSheet,
  SwitchChangeEvent,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Switch,
  View,
  Text,
  useColorMode,
  StatusBar,
} from "native-base";
import { Colors } from "../../theme/Theme";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const Setting = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    // <SafeAreaView style={styles.container}>
    <View
      _dark={{
        bg: "dark.100",
      }}
      _light={{
        bg: "light.50",
      }}
      style={{ height: "100%", width: "100%", padding: 20 }}
    >
      <StatusBar
        barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorMode === "dark" ? Colors.black : Colors.white}
      />
      {/* <Box safeArea> */}
      <Heading size="md" style={{ marginBottom: 10 }}>
        Ứng dụng
      </Heading>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text fontSize="sm">Màu nền</Text>
        <Icon
          as={MaterialIcons}
          name={colorMode === "dark" ? "dark-mode" : "light-mode"}
          size={6}
          color={Colors.primaryMintDark}
          onPress={toggleColorMode}
        />
      </View>
      <Heading size="md" style={{ marginVertical: 10 }}>
        Tài khoản
      </Heading>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text fontSize="sm">Đăng xuất</Text>
        <Icon
          as={Feather}
          name={"log-out"}
          size={5}
          color={Colors.primaryMintDark}
        />
      </View>
      {/* </Box> */}
    </View>
    // </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 35,
  },
});
