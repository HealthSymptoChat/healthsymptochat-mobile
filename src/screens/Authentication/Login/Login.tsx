import {
  Icon,
  Text,
  Heading,
  Button,
  Input,
  Image,
  ScrollView,
  View,
  useColorMode,
} from "native-base";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../../../theme/Theme";
import { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }: any) => {
  const { colorMode } = useColorMode();
  const [phone, setPhone] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    console.log(phone, password);
  };

  return (
    // <SafeAreaView style={styles.container}>\
    <View
      _dark={{
        bg: "dark.100",
      }}
      _light={{
        bg: "light.50",
      }}
      style={{ height: "100%", width: "100%", padding: 20 }}
    >
      {/* <Image
        source={require("../../../assets/background.png")}
        alt="background"
        resizeMode="cover"
        width={width}
        height={height}
        position={"absolute"}
        opacity={0.8}
        zIndex={-1}
      /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        /> */}
        <Image
          source={require("../../../../assets/Logo.png")}
          alt="logo"
          resizeMode="contain"
          style={{
            height: 150,
            width: 150,
            alignSelf: "center",
          }}
        />
        <View style={styles.header}>
          <Heading>Chào mừng bạn quay trở lại</Heading>
          <Text fontSize="md">Đăng nhập để tiếp tục sử dụng ứng dụng</Text>
        </View>

        <Text fontSize="md" style={{ margin: 10 }}>
          Tên người dùng
        </Text>
        <Input
          variant="rounded"
          placeholder="Nhập tên người dùng"
          onChange={(e) => setPhone(e.nativeEvent.text)}
        />
        <Text fontSize="md" style={{ margin: 10 }}>
          Mật khẩu
        </Text>
        <Input
          variant="rounded"
          placeholder="Nhập mật khẩu"
          InputRightElement={
            <Icon
              as={Octicons}
              name={showPassword ? "eye" : "eye-closed"}
              size="md"
              style={{ marginRight: 10 }}
              onPress={handleShowPassword}
            />
          }
          secureTextEntry={!showPassword}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        <Button
          variant="link"
          style={{ marginTop: 10, width: "40%", alignSelf: "center" }}
          onPress={() => navigation.navigate("ForgetPassword")}
          _text={{ color: Colors.primaryMintDark }}
          _pressed={{ opacity: 0.7 }}
        >
          Quên mật khẩu?
        </Button>
        <Button
          rounded="full"
          bg={Colors.primaryMintDark}
          style={{ margin: 20 }}
          onPress={handleLogin}
          _pressed={{ opacity: 0.7 }}
        >
          Đăng nhập
        </Button>

        <View style={styles.buttonGroup}>
          <Button
            rounded="full"
            variant="outline"
            _text={{ color: Colors.primaryMintDark }}
            _pressed={{ opacity: 0.7 }}
          >
            <View style={styles.socialButton}>
              <Image
                source={require("../../../../assets/google.png")}
                alt="google"
                size={5}
              />
              <Text style={{ marginLeft: 5 }}>Đăng nhập bằng Google</Text>
            </View>
          </Button>
          <Button
            rounded="full"
            variant="outline"
            _text={{ color: Colors.primaryMintDark }}
            _pressed={{ opacity: 0.7 }}
          >
            <View style={styles.socialButton}>
              <Image
                source={require("../../../../assets/facebook.png")}
                alt="fb"
                size={5}
              />
              <Text style={{ marginLeft: 5 }}>Đăng nhập bằng Facebook</Text>
            </View>
          </Button>
        </View>
        <Button
          rounded="full"
          variant="link"
          onPress={() => navigation.navigate("Signup")}
          _text={{ color: colorMode === "dark" ? Colors.white : Colors.black }}
        >
          Bạn chưa có tài khoản? Đăng ký ngay
        </Button>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // marginTop: 35,
    marginHorizontal: 20,
  },
  header: {
    marginVertical: 20,
  },
  buttonGroup: {
    marginVertical: 10,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  socialButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
