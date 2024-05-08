import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Pressable,
  Spacer,
  Text,
  View,
} from "native-base";
import { Colors } from "../../../theme/Theme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const Package = ({ navigation }: any) => {
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const handleChoosePackage = (packageId: string) => {
    if (selectedPackage === packageId) {
      setSelectedPackage("");
    } else {
      setSelectedPackage(packageId);
    }
  };
  const handleSubmitPackage = () => {
    console.log(selectedPackage);
    navigation.navigate("Payment");
  };
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
      <Pressable
        style={{ marginVertical: 10 }}
        onPress={() => handleChoosePackage("1")}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              _dark={{
                bg: selectedPackage === "1" ? Colors.primaryMint : "dark.100",
              }}
              _light={{
                bg: selectedPackage === "1" ? Colors.primaryMint : "light.50",
              }}
              // bg={
              //   selectedPackage === "1"
              //     ? Colors.primaryMint
              //     : isPressed
              //     ? "coolGray.200"
              //     : // : isHovered
              //       // ? "coolGray.200"
              //       "coolGray.100"
              // }
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
              p="5"
              rounded="30"
              shadow={3}
              borderWidth="1"
              borderColor="coolGray.300"
            >
              <HStack alignItems="center">
                <Badge
                  bg={Colors.primaryMintDark}
                  variant="solid"
                  rounded="full"
                  style={{ width: "100%" }}
                >
                  <Heading size="2xl" color={Colors.white}>
                    Chuyên nghiệp
                  </Heading>
                </Badge>
                {/* <Spacer /> */}
              </HStack>
              <Text mt="3" fontSize="md" textAlign="center">
                99.000 VND / tháng
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  as={FontAwesome}
                  name="check"
                  color={Colors.primaryMintDark}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
                <Text mt="2" fontSize="sm">
                  Unlock powerfull time-saving tools for creating email delivery
                  and collecting marketing data
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  as={FontAwesome}
                  name="check"
                  color={Colors.primaryMintDark}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
                <Text mt="2" fontSize="sm">
                  Unlock powerfull time-saving tools for creating email delivery
                  and collecting marketing data
                </Text>
              </View>
            </Box>
          );
        }}
      </Pressable>
      <Pressable
        style={{ marginVertical: 10 }}
        onPress={() => handleChoosePackage("2")}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              _dark={{
                bg: selectedPackage === "2" ? Colors.primaryMint : "dark.100",
              }}
              _light={{
                bg: selectedPackage === "2" ? Colors.primaryMint : "light.50",
              }}
              // bg={
              //   selectedPackage === "2"
              //     ? Colors.primaryMint
              //     : isPressed
              //     ? "coolGray.200"
              //     : // : isHovered
              //       // ? "coolGray.200"
              //       "coolGray.100"
              // }
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
              p="5"
              rounded="30"
              shadow={3}
              borderWidth="1"
              borderColor="coolGray.300"
            >
              <HStack alignItems="center">
                <Badge
                  bg={Colors.primaryMintDark}
                  variant="solid"
                  rounded="full"
                  style={{ width: "100%" }}
                >
                  <Heading size="2xl" color={Colors.white}>
                    Chuyên nghiệp
                  </Heading>
                </Badge>
                {/* <Spacer /> */}
              </HStack>
              <Text mt="3" fontSize="md" textAlign="center">
                99.000 VND / tháng
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  as={FontAwesome}
                  name="check"
                  color={Colors.primaryMintDark}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
                <Text mt="2" fontSize="sm">
                  Unlock powerfull time-saving tools for creating email delivery
                  and collecting marketing data
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  as={FontAwesome}
                  name="check"
                  color={Colors.primaryMintDark}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
                <Text mt="2" fontSize="sm">
                  Unlock powerfull time-saving tools for creating email delivery
                  and collecting marketing data
                </Text>
              </View>
            </Box>
          );
        }}
      </Pressable>
      <Button
        mt="10"
        isDisabled={!selectedPackage}
        bg={Colors.primaryMintDark}
        onPress={handleSubmitPackage}
        rounded="full"
      >
        Đến thanh toán
      </Button>
    </View>
    // {/* </SafeAreaView> */}
  );
};

export default Package;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20,
    height: "100%",
  },
});
