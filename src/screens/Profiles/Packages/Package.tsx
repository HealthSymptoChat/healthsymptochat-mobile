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

interface Package {
  id: string;
  title: string;
  price: number;
  description: string[];
}

const packages: Package[] = [
  {
    id: "1",
    title: "Cơ bản",
    price: 99000,
    description: [
      "Unlock powerfull time-saving tools for creating email delivery and collecting marketing data",
      "Unlock powerfull time-saving tools for creating email delivery and collecting marketing data1",
    ],
  },
  {
    id: "2",
    title: "Chuyên nghiệp",
    price: 149000,
    description: [
      "Unlock powerfull time-saving tools for creating email delivery and collecting marketing dat2",
      "Unlock powerfull time-saving tools for creating email delivery and collecting marketing data3",
    ],
  },
];

const Package = ({ navigation }: any) => {
  const { authAxios }: any = useContext(AxiosContext);
  const focus = useIsFocused();
  const toast = useToast();
  const [selectedPackage, setSelectedPackage] = useState<Package>();
  const [duration, setDuration] = useState<number>(3);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [renderTime, setRenderTime] = useState(0);
  const redirectUri = Linking.createURL("/");

  const handleChoosePackage = (packageId: Package) => {
    setSelectedPackage(packageId);
    // if (selectedPackage === packageId) {
    //   setSelectedPackage(undefined);
    // } else {
    //   setSelectedPackage(packageId);
    // }
  };

  const handlePurchasePackage = async () => {
    try {
      console.log("Redirect uri", redirectUri);
      const url = await authAxios.post("/payment/PayOS", {
        redirectUri: redirectUri,
      });

      if (url.data.message === "success") {
        WebBrowser.openBrowserAsync(url.data.data.checkoutUrl);
        // const result = await WebBrowser.openBrowserAsync(
        //   url.data.data.checkoutUrl
        // );
        // if (result.type === "cancel") {
        //   console.log("User cancelled the payment");
        // }
        onClose();
      }
    } catch (error: any) {
      console.log("Error purchase package", error);
    }
  };
  useEffect(() => {
    const handleOpenURL = (event: any) => {
      console.log("App was opened with URL: " + event.url);
      // Perform some action here
      const { path, queryParams } = Linking.parse(event.url);
      console.log("Path", path);
      console.log("Query params", queryParams);
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
      {packages.map((pkg) => (
        <Pressable
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
              .filter((pack: Package) => pack.id === selectedPackage.id)[0]
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
          {formatNumber(
            packages.filter(
              (pack: Package) => pack.id === selectedPackage.id
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
                {selectedPackage?.title}
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
              {formatNumber(selectedPackage?.price || 0 * duration)} VNĐ
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
