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
import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";

const packages = [
  {
    id: "1",
    title: "Cơ bản",
    price: "99.000",
    description: [
      "Unlock powerfull time-saving tools for creating email delivery and collecting marketing data",
      "Unlock powerfull time-saving tools for creating email delivery and collecting marketing data1",
    ],
  },
  {
    id: "2",
    title: "Chuyên nghiệp",
    price: "149.000",
    description: [
      "Unlock powerfull time-saving tools for creating email delivery and collecting marketing dat2",
      "Unlock powerfull time-saving tools for creating email delivery and collecting marketing data3",
    ],
  },
];

const Package = ({ navigation }: any) => {
  const [selectedPackage, setSelectedPackage] = useState<string>("1");
  const [duration, setDuration] = useState<number>(3);
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
      <Text fontSize="md" color={"gray.500"}>
        Mở khóa tất cả các tính năng với gói premium
      </Text>
      {packages.map((pkg) => (
        <Pressable
          style={{ marginVertical: 10 }}
          onPress={() => handleChoosePackage(pkg.id)}
        >
          {({ isPressed }) => {
            return (
              <Box
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1,
                    },
                  ],
                }}
                p="5"
                rounded="30"
                borderStyle={"dashed"}
                bg={pkg.id === "2" ? "amber.100" : "coolGray.200"}
              >
                <View
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <View display={"flex"} flexDirection={"column"}>
                    <Heading size="md">{pkg.title}</Heading>
                    <Text mt="3" fontWeight={"semibold"} fontSize="md">
                      {pkg.price} VNĐ
                    </Text>
                  </View>
                  <View padding={3} bg={Colors.white} rounded={"full"}>
                    {selectedPackage === pkg.id ? (
                      <Icon
                        alignSelf={"center"}
                        as={FontAwesome}
                        name={"check-circle"}
                        size={7}
                        color={"green.500"}
                      />
                    ) : (
                      <Icon
                        alignSelf={"center"}
                        as={FontAwesome}
                        name={"circle"}
                        size={7}
                        color={"gray.500"}
                      />
                    )}
                  </View>
                </View>
              </Box>
            );
          }}
        </Pressable>
      ))}
      <Heading size="md" style={{ marginVertical: 10 }}>
        Chọn thời gian
      </Heading>
      <View
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Pressable
          padding={2}
          bg={Colors.white}
          borderRadius={"2xl"}
          borderStyle={"solid"}
          borderWidth={2}
          borderColor={duration === 1 ? Colors.primaryMintDark : Colors.grey}
          onPress={() => setDuration(1)}
        >
          <Text>1 tháng</Text>
        </Pressable>
        <Pressable
          padding={2}
          bg={Colors.white}
          borderRadius={"2xl"}
          borderStyle={"solid"}
          borderWidth={2}
          borderColor={duration === 3 ? Colors.primaryMintDark : Colors.grey}
          onPress={() => setDuration(3)}
        >
          <Text>3 tháng</Text>
        </Pressable>
        <Pressable
          padding={2}
          bg={Colors.white}
          borderRadius={"2xl"}
          borderStyle={"solid"}
          borderWidth={2}
          borderColor={duration === 6 ? Colors.primaryMintDark : Colors.grey}
          onPress={() => setDuration(6)}
        >
          <Text>6 tháng</Text>
        </Pressable>
        <Pressable
          padding={2}
          bg={Colors.white}
          borderRadius={"2xl"}
          borderStyle={"solid"}
          borderWidth={2}
          borderColor={duration === 12 ? Colors.primaryMintDark : Colors.grey}
          onPress={() => setDuration(12)}
        >
          <Text>12 tháng</Text>
        </Pressable>
      </View>
      {selectedPackage && (
        <Heading size="md" style={{ marginTop: 20, marginBottom: 10 }}>
          Mô tả chi tiết gói
        </Heading>
      )}
      <View>
        {selectedPackage
          ? packages
              .filter((pack) => pack.id === selectedPackage)[0]
              .description.map((desc) => (
                <View
                  key={desc}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Icon
                    as={Octicons}
                    name={"dot-fill"}
                    size={5}
                    color={Colors.primaryMintDark}
                  />
                  <Text margin={2}>{desc}</Text>
                </View>
              ))
          : null}
      </View>

      {selectedPackage && (
        <Heading size="md" style={{ marginTop: 20, marginBottom: 10 }}>
          Tổng cộng:{" "}
          {packages.filter((pack) => pack.id === selectedPackage)[0].price || 0}{" "}
          VNĐ
        </Heading>
      )}
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
