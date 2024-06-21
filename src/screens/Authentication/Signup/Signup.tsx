import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import {
  Button,
  Heading,
  Icon,
  Image,
  Input,
  ScrollView,
  Text,
  View,
  useColorMode,
  useToast,
} from "native-base";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../../../theme/Theme";
import CustomToast from "../../../components/CustomToast";
import { AxiosContext } from "../../../context/AxiosContext";

const { width, height } = Dimensions.get("screen");

const Signup = ({ navigation }: any) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const { authAxios }: any = useContext(AxiosContext);

  const handleSignup = async () => {
    try {
      console.log(email);
      const response = await authAxios.post("/otp/sendOTP", {
        email,
      });
      console.log(response.data);
      if (response.data.message === "success") {
        navigation.navigate("VerifyOTP", { email });
      } else {
        toast.show({
          render: () => (
            <CustomToast
              message="Đã có lỗi xảy ra, vui lòng thử lại"
              state="error"
              onClose={() => toast.closeAll()}
            />
          ),
        });
      }
    } catch (error: Error | any) {
      console.log("Error signing up", error);
    }
  };
  return (
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
          <Heading>Chào mừng bạn đến với Healthsymptochat</Heading>
          <Text fontSize="md">Đăng ký là người dùng mới của ứng dụng</Text>
        </View>
        <Text fontSize="md" style={{ margin: 10 }}>
          Email
        </Text>
        <Input
          variant="rounded"
          placeholder="Nhập email của bạn"
          keyboardType="email-address"
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        {/* <Text fontSize="md" style={{ margin: 10 }}>
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
        <Text fontSize="md" style={{ margin: 10 }}>
          Xác nhận mật khẩu
        </Text>
        <Input
          variant="rounded"
          placeholder="Nhập lại mật khẩu"
          InputRightElement={
            <Icon
              as={Octicons}
              name={showConfirmPassword ? "eye" : "eye-closed"}
              size="md"
              style={{ marginRight: 10 }}
              onPress={handleShowConfirmPassword}
            />
          }
          secureTextEntry={!showConfirmPassword}
          onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
        /> */}
        <Button
          rounded="full"
          bg={Colors.primaryMintDark}
          style={{ margin: 20, marginTop: 40 }}
          onPress={handleSignup}
          _pressed={{ opacity: 0.7 }}
        >
          Đăng ký
        </Button>

        {/* <View style={styles.buttonGroup}>
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
              <Text style={{ marginLeft: 5 }}>Đăng ký bằng Google</Text>
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
              <Text style={{ marginLeft: 5 }}>Đăng ký bằng Facebook</Text>
            </View>
          </Button>
        </View> */}
        <Button
          rounded="full"
          variant="link"
          onPress={() => navigation.navigate("Login")}
          _text={{ color: colorMode === "dark" ? "light.50" : "dark.100" }}
          _pressed={{ opacity: 0.7 }}
        >
          Bạn đã có tài khoản? Đăng nhập ngay
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    marginVertical: 20,
  },
  buttonGroup: {
    marginVertical: 20,
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

export default Signup;
