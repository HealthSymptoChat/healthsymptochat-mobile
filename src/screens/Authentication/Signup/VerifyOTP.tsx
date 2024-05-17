import { SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Image, Text, View, useToast } from "native-base";
import { Colors } from "../../../theme/Theme";
import OTPTextInput from "react-native-otp-textinput";
import CustomToast from "../../../components/CustomToast";
import { AxiosContext } from "../../../context/AxiosContext";

const VerifyOTP = ({ navigation, route }: any) => {
  const { email }: { email: string } = route.params || "";
  const toast = useToast();
  const { authAxios }: any = useContext(AxiosContext);
  const [otp, setOtp] = useState<String | "">("");

  const handleInputOtp = async () => {
    try {
      console.log(otp, email);
      const response = await authAxios.post("/otp/verifyOTP", {
        email,
        otp,
      });
      console.log(response.data);
      if (response.data.message === "success") {
        navigation.navigate("InputInfo", { email });
      } else {
        console.log(response.data.message);
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
          Nhập mã xác nhận từ email của bạn
        </Text>
        <OTPTextInput
          handleTextChange={(e) => setOtp(e)}
          inputCount={6}
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
        Tiếp tục
      </Button>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
