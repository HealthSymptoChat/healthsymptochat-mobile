import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { View, Text, Heading } from "native-base";

const Payment = ({ navigation, route }: any) => {
  return (
    // <SafeAreaView>
    <View
      _dark={{
        bg: "dark.100",
      }}
      _light={{
        bg: "light.50",
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <Heading fontSize="2xl">Payment</Heading>
    </View>
    // </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({});
