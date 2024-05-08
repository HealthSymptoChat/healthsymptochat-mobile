import { SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";
import { Heading, View } from "native-base";

const Information = () => {
  return (
    // <SafeAreaView style={styles.container}>
    <View
      _dark={{
        bg: "dark.100",
      }}
      _light={{
        bg: "light.50",
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <Heading size="md" style={{ marginBottom: 10 }}>
        Thông báo
      </Heading>
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 35,
  },
});
