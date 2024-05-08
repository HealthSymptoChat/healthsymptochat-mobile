import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Image, Text, Input, Button } from "native-base";
import { Colors } from "../../../theme/Theme";

const ForgetPassword = ({ navigation }: any) => {
  const [phone, setPhone] = React.useState<String | "">("");
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

      <Text fontSize="md" style={{ margin: 10 }}>
        Số điện thoại
      </Text>
      <Input
        variant="rounded"
        placeholder="Nhập số điện thoại"
        keyboardType="numeric"
        onChange={(e) => setPhone(e.nativeEvent.text)}
      />
      <Button
        style={{ marginTop: 20, marginHorizontal: 30 }}
        rounded="full"
        variant="solid"
        isDisabled={phone.length < 10}
        bg={Colors.primaryMintDark}
        onPress={() => navigation.navigate("VerifyCode")}
      >
        Gửi mã xác nhận
      </Button>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
