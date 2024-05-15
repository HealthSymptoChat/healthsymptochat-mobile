import { StyleSheet } from "react-native";
import { NativeBaseProvider, StatusBar, useColorMode } from "native-base";
import React from "react";
import { Colors } from "./src/theme/Theme";
import Navigation from "./src/screens/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { AxiosProvider } from "./src/context/AxiosContext";

export default function App() {
  const { colorMode } = useColorMode();
  return (
    <AuthProvider>
      <AxiosProvider>
        <NativeBaseProvider
        // theme={colorMode === "dark" ? DarkTheme : DefaultTheme}
        >
          <StatusBar
            barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
            backgroundColor={colorMode === "dark" ? Colors.black : Colors.white}
          />
          <Navigation />
        </NativeBaseProvider>
      </AxiosProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
