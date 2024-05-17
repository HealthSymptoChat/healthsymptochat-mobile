import { SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import {
  Heading,
  Icon,
  Image,
  Input,
  Text,
  Button,
  Select,
  Radio,
  Stack,
  View,
  ScrollView,
  useToast,
} from "native-base";
import { Colors } from "../../../theme/Theme";
import { Octicons } from "@expo/vector-icons";
import { DatePickerModal, registerTranslation } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { AuthContext } from "../../../context/AuthContext";
import CustomToast from "../../../components/CustomToast";
import * as SecureStore from "expo-secure-store";
import { AxiosContext } from "../../../context/AxiosContext";

registerTranslation("vi", {
  save: "Lưu",
  selectSingle: "Chọn ngày",
  selectMultiple: "Chọn nhiều ngày",
  selectRange: "Chọn khoảng thời gian",
  notAccordingToDateFormat: (inputFormat) => `Định dạng ngày là ${inputFormat}`,
  mustBeHigherThan: (date) => `Phải sau ngày ${date}`,
  mustBeLowerThan: (date) => `Phải trước ngày ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Phải trong khoảng ${startDate} - ${endDate}`,
  dateIsDisabled: "Ngày bị vô hiệu hóa",
  previous: "Trước",
  next: "Sau",
  typeInDate: "Nhập ngày",
  pickDateFromCalendar: "Chọn ngày từ lịch",
  close: "Đóng",
  hour: "Giờ",
  minute: "Phút",
});

const InputInfo = () => {
  const { authAxios }: any = useContext(AxiosContext);
  const authContext: any = useContext(AuthContext);
  const toast = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<CalendarDate | undefined>(undefined);
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onDismissSingle = React.useCallback(() => {
    setShowDatePicker(false);
  }, [setShowDatePicker]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setShowDatePicker(false);
      setDob(params.date);
    },
    [setShowDatePicker, setDob]
  );

  const handleRegisterUser = async () => {
    console.log(username, gender, dob, phone, password, confirmPassword);
    // try {
    //   if (
    //     !(
    //       username &&
    //       gender &&
    //       dob &&
    //       password &&
    //       confirmPassword &&
    //       password &&
    //       confirmPassword
    //     )
    //   ) {
    //     if (password !== confirmPassword) {
    //       toast.show({
    //         render: () => (
    //           <CustomToast
    //             message="Mật khẩu không trùng khớp"
    //             state="error"
    //             onClose={() => toast.closeAll()}
    //           />
    //         ),
    //       });
    //       return;
    //     }
    //     toast.show({
    //       render: () => (
    //         <CustomToast
    //           message="Vui lòng điền đầy đủ thông tin"
    //           state="error"
    //           onClose={() => toast.closeAll()}
    //         />
    //       ),
    //     });
    //     return;
    //   }
    //   console.log(username, gender, dob, phone, password, confirmPassword);
    //   const response = await authAxios.post("/auth/signUp", {
    //     username: username,
    //     gender: gender,
    //     dob: dob,
    //     password: password,
    //   });
    //   console.log(response.data);
    //   if (response.data) {
    //     const { tokens, user } = response.data;
    //     SecureStore.setItemAsync("accessToken", tokens.accessToken);
    //     SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
    //     SecureStore.setItemAsync("user", JSON.stringify(user));
    //     authContext.setAuthState({
    //       accessToken: tokens.accessToken,
    //       refreshToken: tokens.refreshToken,
    //       authenticated: true,
    //       user,
    //     });
    //     toast.show({
    //       render: () => (
    //         <CustomToast
    //           message="Đăng ký thành công"
    //           state="success"
    //           onClose={() => toast.closeAll()}
    //         />
    //       ),
    //     });
    //   } else {
    //     toast.show({
    //       render: () => (
    //         <CustomToast
    //           message="Đã có lỗi xảy ra, vui lòng thử lại"
    //           state="error"
    //           onClose={() => toast.closeAll()}
    //         />
    //       ),
    //     });
    //   }
    // } catch (error: Error | any) {
    //   console.log("Error signing up", error);
    // }
  };
  return (
    <SafeAreaView style={styles.container}>
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
        <Heading
          fontSize="xl"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          Nhập một số thông tin của bạn
        </Heading>
        <Text fontSize="md" style={{ margin: 10 }}>
          Tên đăng nhập
        </Text>
        <Input
          variant="rounded"
          placeholder="Nhập tên đăng nhập"
          isRequired={true}
          onChange={(e) => setUsername(e.nativeEvent.text)}
        />
        <Text fontSize="md" style={{ margin: 10 }}>
          Giới tính
        </Text>
        <Radio.Group
          name="radioGroup"
          value={gender}
          _radio={{
            borderColor: Colors.primaryMintDark,
            _checked: {
              _icon: {
                color: Colors.primaryMintDark,
                borderRadius: "full",
              },
              borderColor: Colors.primaryMintDark,
            },
          }}
          onChange={(nextValue) => setGender(nextValue)}
        >
          <View
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // paddingHorizontal: 2,
            }}
          >
            <Radio value="male" size="md" my={1} marginRight={1}>
              Nam
            </Radio>
            <Radio value="female" size="md" my={1} marginLeft={1}>
              Nữ
            </Radio>
          </View>
        </Radio.Group>
        <Button
          rounded="full"
          variant="outline"
          marginY={2}
          _text={{ color: Colors.black }}
          //   bg={Colors.primaryMintDark}
          style={{ marginHorizontal: 10 }}
          onPress={() => setShowDatePicker(true)}
        >
          {dob ? dob.toDateString() : "Chọn ngày sinh"}
        </Button>
        <DatePickerModal
          locale="vi"
          mode="single"
          visible={showDatePicker}
          onDismiss={onDismissSingle}
          date={dob}
          onConfirm={onConfirmSingle}
        />

        <Text fontSize="md" style={{ margin: 10 }}>
          Mật khẩu
        </Text>
        <Input
          variant="rounded"
          placeholder="Nhập mật khẩu"
          isRequired={true}
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
          isDisabled={
            !username || !gender || !dob || !password || !confirmPassword
          }
          bg={Colors.primaryMintDark}
          onPress={handleRegisterUser}
        >
          Đăng ký
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InputInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: "100%",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
  },
});
