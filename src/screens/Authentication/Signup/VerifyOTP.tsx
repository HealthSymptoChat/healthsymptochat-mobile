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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<String | "">("");

  const handleInputOtp = async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/otp/verifyOTP", {
        email,
        otp,
      });
      if (response.data.message === "success") {
        setIsLoading(false);
        navigation.navigate("InputInfo", { email });
      } else if (response.data.message === "OTP is expired") {
        setIsLoading(false);
        console.log(response.data.message);
        toast.show({
          render: () => (
            <CustomToast
              message="Mã OTP đã hết hạn"
              state="error"
              onClose={() => toast.closeAll()}
            />
          ),
        });
      } else {
        setIsLoading(false);
        console.log(response.data.message);
        toast.show({
          render: () => (
            <CustomToast
              message="Mã OTP không chính xác"
              state="error"
              onClose={() => toast.closeAll()}
            />
          ),
        });
      }
    } catch (error: Error | any) {
      setIsLoading(false);
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
        isLoading={isLoading}
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
