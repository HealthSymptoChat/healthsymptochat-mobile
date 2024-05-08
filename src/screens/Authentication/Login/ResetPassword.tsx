import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Heading, Icon, Image, Input, Text } from "native-base";
import { Colors } from "../../../theme/Theme";
import { Octicons } from "@expo/vector-icons";

const ResetPassword = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <SafeAreaView style={styles.container}>
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
      <Heading fontSize="xl" style={{ textAlign: "center", marginBottom: 20 }}>
        Mật khẩu mới
      </Heading>

      <Text fontSize="md" style={{ margin: 10 }}>
        Mật khẩu mới
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
        Xác nhận lại mật khẩu
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
      />
      <Button
        style={{ marginTop: 20, marginHorizontal: 30 }}
        rounded="full"
        variant="solid"
        // isDisabled={phone.length < 10}
        bg={Colors.primaryMintDark}
        // onPress={() => navigation.navigate("VerifyCode")}
      >
        Đổi mật khẩu
      </Button>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
