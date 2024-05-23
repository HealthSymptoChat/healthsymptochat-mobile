import { Dimensions, SafeAreaView, StyleSheet, Text } from "react-native";
import CarouselCard from "../components/CarouselCard";
import { Colors } from "../theme/Theme";
import {
  Icon,
  Button,
  Image,
  ScrollView,
  View,
  useColorMode,
} from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Signup from "./Authentication/Signup/Signup";

const data = [
  {
    title: "Chào mừng bạn đến với HealthSymptoChat",
    description: "Ứng dụng hỗ trợ dự đoán bệnh thông qua triệu chứng",
    image: require("../../assets/welcome1.png"),
  },
  {
    title: "Giảm thời gian tìm kiếm thông tin",
    description:
      "Chúng tôi sử dung trí tuệ nhân tạo để cung cấp thông tin chọn lọc và cô đọng nhất",
    image: require("../../assets/welcome2.png"),
  },
  {
    title: "Thông tin cung cấp uy tín, chất lượng",
    description:
      "Nguồn dữ liệu bệnh lớn được kiểm định từ chuyên gia giúp cung cấp những dự đoán với mức độ chính xác cao",
    image: require("../../assets/welcome3.png"),
  },
  {
    title: "Giao diện thân thiện với người dùng",
    description:
      "Giao diện được thiết kế tối ưu nhằm nâng cao trải nghiệm của khách hàng",
    image: require("../../assets/welcome4.png"),
  },
];

const { width, height } = Dimensions.get("window");

const Welcome = ({ navigation }: any) => {
  const { colorMode } = useColorMode();
  return (
    <SafeAreaView
    // _dark={{
    //   bg: "dark.100",
    // }}
    // _light={{
    //   bg: "light.50",
    // }}
    // style={{ width: "100%", paddingVertical: 20 }}
    >
      <Image
        source={require("../../assets/background.png")}
        alt="background"
        resizeMode="cover"
        width={width}
        height={height}
        position={"absolute"}
        opacity={0.8}
        zIndex={-1}
      />
      <ScrollView>
        <Image
          source={require("../../assets/Logo.png")}
          alt="logo"
          resizeMode="contain"
          style={{
            height: 150,
            width: 150,
            alignSelf: "center",
          }}
        />
        <CarouselCard data={data} />
        <View
          height={100}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          margin={5}
        >
          <Button
            rounded="full"
            variant="solid"
            // _text={{ color: Colors.primaryMintDark }}
            bg={Colors.primaryMintDark}
            onPress={() => navigation.navigate("Signup")}
          >
            Đăng ký
          </Button>
          <Button
            // endIcon={<Icon as={Login} name="login-variant" size="lg" />}
            rounded="full"
            variant="outline"
            _text={{ color: Colors.primaryMintDark }}
            borderColor={Colors.primaryMintDark}
            onPress={() => navigation.navigate("Login")}
          >
            Đăng nhập
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    height: "100%",
  },
  // buttonGroup: {
  //   height: 100,
  //   marginVertical: 40,
  //   marginHorizontal: 20,
  //   justifyContent: "space-between", // Add spacing between buttons
  // },
});
