import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Image, Text, View } from "native-base";
import { Colors } from "../../../theme/Theme";
import OTPTextInput from "react-native-otp-textinput";

const VerifyCode = ({ navigation }: any) => {
  const [otp, setOtp] = useState<String | "">("");
  const handleInputOtp = () => {
    console.log(otp);
    navigation.navigate("ResetPassword");
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
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text fontSize="md" style={{ marginBottom: 20 }}>
          Nhập mã xác nhận
        </Text>
        <OTPTextInput
          handleTextChange={(e) => setOtp(e)}
          inputCount={4}
          tintColor={Colors.primaryMintDark}
          offTintColor={Colors.primaryMintDark}
          // containerStyle={{ marginHorizontal: 30 }}
          textInputStyle={{
            borderRadius: 10,
            borderWidth: 1,
            // borderColor: Colors.primaryMintDark,
          }}
        />
      </View>
      <Button
        style={{ marginTop: 20, marginHorizontal: 30 }}
        rounded="full"
        variant="solid"
        isDisabled={otp.length < 4}
        bg={Colors.primaryMintDark}
        onPress={handleInputOtp}
      >
        Lấy lại mật khẩu
      </Button>
    </SafeAreaView>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
