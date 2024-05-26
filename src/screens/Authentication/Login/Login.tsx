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
  useToast,
} from "native-base";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../../../theme/Theme";
import { useContext, useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import * as SecureStore from "expo-secure-store";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { AxiosContext } from "../../../context/AxiosContext";
import { AuthContext } from "../../../context/AuthContext";
import CustomToast from "../../../components/CustomToast";

const { width, height } = Dimensions.get("screen");

GoogleSignin.configure({
  webClientId:
    "707852780019-q1st77n467s9oakiob88qi6fe0olpbr1.apps.googleusercontent.com",
});
const Login = ({ navigation }: any) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const authContext: any = useContext(AuthContext);
  const { publicAxios }: any = useContext(AxiosContext);

  // useEffect(() => {
  // }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    console.log(username, password);
    try {
      if (!username || !password) {
        toast.show({
          render: () => (
            <CustomToast
              message="Vui lòng nhập đầy đủ thông tin"
              state="error"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
        return;
      }
      const response = await publicAxios.post("/auth/login", {
        username: username,
        password: password,
      });
      if (response.data.message === "success") {
        const { tokens, user } = response.data.data;
        SecureStore.setItemAsync("accessToken", tokens.accessToken);
        SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
        SecureStore.setItemAsync("user", JSON.stringify(user));
        authContext.setAuthState({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          authenticated: true,
          user,
        });
        toast.show({
          render: () => (
            <CustomToast
              message="Đăng nhập thành công"
              state="success"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      } else {
        console.log(response.data.message);
        toast.show({
          render: () => (
            <CustomToast
              message="Đăng nhập thất bại"
              state="error"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      }
    } catch (error) {
      console.log("Login failed", error);
      toast.show({
        render: () => (
          <CustomToast
            message="Đăng nhập thất bại"
            state="error"
            onClose={() => {
              toast.closeAll();
            }}
          />
        ),
      });
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const response = await publicAxios.post("/auth/google", userInfo.user);
      try {
        if (response.data.message === "success") {
          const { user } = response.data.data;
          const { accessToken, refreshToken } = response.data.data.tokens;
          await SecureStore.setItemAsync("accessToken", accessToken);
          await SecureStore.setItemAsync("refreshToken", refreshToken);
          await SecureStore.setItemAsync("user", JSON.stringify(user));
          authContext.setAuthState({
            accessToken,
            refreshToken,
            authenticated: true,
            user,
          });
          toast.show({
            render: () => (
              <CustomToast
                message="Đăng nhập thành công"
                state="success"
                onClose={() => {
                  toast.closeAll();
                }}
              />
            ),
          });
        } else {
          console.log(response.data.message);
          toast.show({
            render: () => (
              <CustomToast
                message="Đăng nhập thất bại"
                state="error"
                onClose={() => {
                  toast.closeAll();
                }}
              />
            ),
          });
        }
      } catch (error: any) {
        console.log("Login failed", error);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("play services not available");
      } else {
        console.log("error", error);
      }
    }
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
          onChange={(e) => setUsername(e.nativeEvent.text)}
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
            onPress={() => onGoogleButtonPress()}
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
