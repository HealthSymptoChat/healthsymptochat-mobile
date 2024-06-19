import { SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Actionsheet,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Pressable,
  Spacer,
  Text,
  View,
  useDisclose,
  useToast,
} from "native-base";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "../../../theme/Theme";
import { AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import { formatNumber } from "../../../utils/NumberFormatter";
import { AxiosContext } from "../../../context/AxiosContext";
import { useIsFocused } from "@react-navigation/native";
import CustomToast from "../../../components/CustomToast";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Package {
  _id: string;
  packageName: string;
  description: string;
  price: number;
  features: string[];
}

const Package = ({ navigation }: any) => {
  const { authAxios }: any = useContext(AxiosContext);
  const focus = useIsFocused();
  const toast = useToast();
  const [selectedPackage, setSelectedPackage] = useState<Package>();
  const [duration, setDuration] = useState<number>(3);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [packages, setPackages] = useState<Package[]>([]);
  const redirectUri = Linking.createURL("/");

  const handleChoosePackage = (packageId: Package) => {
    setSelectedPackage(packageId);
    // if (selectedPackage === packageId) {
    //   setSelectedPackage(undefined);
    // } else {
    //   setSelectedPackage(packageId);
    // }
  };

  const calculateTotalPrice = (): number => {
    if (duration === 1) {
      return Number(selectedPackage?.price || 0);
    } else if (duration === 3) {
      return Number(selectedPackage?.price || 0) * 3;
    } else if (duration === 6) {
      return Number(selectedPackage?.price || 0) * 6;
    } else {
      return 0;
    }
  };

  const handlePurchasePackage = async () => {
    try {
      console.log("Redirect uri", redirectUri);
      console.log(calculateTotalPrice());
      const total = calculateTotalPrice();

      const url = await authAxios.post("/payment/PayOS", {
        package_id: selectedPackage?._id,
        amount: total,
        redirectUri: redirectUri,
      });

      if (url.data.message === "success") {
        WebBrowser.openBrowserAsync(url.data.data.checkoutUrl);
        // onClose();
      }
    } catch (error: any) {
      console.log("Error purchase package", error);
    }
  };

  const fetchPackage = async () => {
    try {
      const response = await authAxios.get("/package/getAllPackages");
      if (response.data.message === "success") {
        setPackages(response.data.data);
      }
    } catch (error: any) {
      console.log("Error fetching package", error);
    }
  };

  useEffect(() => {
    if (focus) {
      fetchPackage();
    }
  }, [focus]);
  useEffect(() => {
    const handleOpenURL = async (event: any) => {
      // Perform some action here
      const { path, queryParams } = Linking.parse(event.url);
      if (queryParams?.status === "CANCELLED") {
        onClose();
        toast.show({
          render: () => (
            <CustomToast
              message={"Thanh toán đã bị hủy"}
              state={"error"}
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      } else if (queryParams?.status === "PAID") {
        onClose();
        toast.show({
          render: () => (
            <CustomToast
              message={"Thanh toán thành công"}
              state={"success"}
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      }
    };

    const eventEmitter = Linking.addEventListener("url", handleOpenURL);

    return () => {
      eventEmitter.remove();
    };
  }, []);
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
      {packages.map((pkg, idx) => (
        <Pressable
          key={idx}
          style={{ marginVertical: 10 }}
          onPress={() => handleChoosePackage(pkg)}
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
                bg={
                  pkg.packageName === "Chuyên nghiệp"
                    ? "amber.100"
                    : "coolGray.200"
                }
              >
                <View
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <View display={"flex"} flexDirection={"column"}>
                    <Heading size="md">{pkg.packageName}</Heading>
                    <Text mt="3" fontWeight={"semibold"} fontSize="md">
                      {formatNumber(pkg.price)} VNĐ
                    </Text>
                  </View>
                  <View padding={3} bg={Colors.white} rounded={"full"}>
                    {selectedPackage === pkg ? (
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
        justifyContent={"space-around"}
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
      </View>
      {selectedPackage && (
        <Heading size="md" style={{ marginTop: 20, marginBottom: 10 }}>
          Mô tả chi tiết gói
        </Heading>
      )}
      <View>
        {selectedPackage
          ? packages
              .filter((pack: Package) => pack._id === selectedPackage._id)[0]
              .features.map((feat) => (
                <View
                  key={feat}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <Icon
                    as={Octicons}
                    name={"dot-fill"}
                    size={5}
                    color={Colors.primaryMintDark}
                  />
                  <Text fontSize={"md"} margin={2}>
                    {feat}
                  </Text>
                </View>
              ))
          : null}
      </View>

      {selectedPackage && (
        <Heading size="md" style={{ marginTop: 20, marginBottom: 10 }}>
          Tạm tính:{" "}
          {formatNumber(
            packages.filter(
              (pack: Package) => pack._id === selectedPackage._id
            )[0].price
          ) || 0}{" "}
          VNĐ
        </Heading>
      )}
      <Button
        mt="10"
        isDisabled={!selectedPackage}
        bg={Colors.primaryMintDark}
        onPress={() => onOpen()}
        rounded="full"
      >
        Đến thanh toán
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <View
            width={"100%"}
            paddingX={5}
            // display={"flex"}
            // flexDirection={"row"}
            // justifyContent={"space-between"}
            // alignItems={"center"}
            // padding={5}
          >
            <Heading textAlign={"center"} fontSize={"lg"}>
              Đơn hàng của bạn
            </Heading>
            <View
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text
                textAlign={"center"}
                fontSize={"md"}
                mt={2}
                color={"gray.600"}
              >
                Tên gói:
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"lg"}
                mt={2}
                fontWeight={"bold"}
                color={Colors.black}
              >
                {selectedPackage?.packageName}
              </Text>
            </View>
            <View
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text
                textAlign={"center"}
                fontSize={"md"}
                mt={2}
                color={"gray.600"}
              >
                Giá:
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"lg"}
                mt={2}
                fontWeight={"bold"}
                color={Colors.black}
              >
                {formatNumber(selectedPackage?.price || 0)} VNĐ
              </Text>
            </View>
            <View
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text
                textAlign={"center"}
                fontSize={"md"}
                mt={2}
                color={"gray.600"}
              >
                Thời gian sử dụng:
              </Text>
              <Text
                textAlign={"center"}
                fontSize={"lg"}
                mt={2}
                fontWeight={"bold"}
                color={Colors.black}
              >
                {duration} tháng
              </Text>
            </View>
            <Divider my={2} />
            <Text textAlign={"center"} mt={2} fontSize={"md"}>
              Tổng cộng
            </Text>
            <Text
              textAlign={"center"}
              mt={2}
              fontSize={"lg"}
              fontWeight={"bold"}
            >
              {formatNumber(calculateTotalPrice())} VNĐ
            </Text>
            <Button
              m={5}
              bg={Colors.primaryMintDark}
              rounded="full"
              onPress={handlePurchasePackage}
            >
              Thanh toán
            </Button>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
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
