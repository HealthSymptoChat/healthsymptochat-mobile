import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
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
} from "native-base";
import { Colors } from "../../../theme/Theme";
import { Octicons } from "@expo/vector-icons";
import { DatePickerModal, registerTranslation } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

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
        // isDisabled={phone.length < 10}
        bg={Colors.primaryMintDark}
        // onPress={() => navigation.navigate("VerifyCode")}
      >
        Đăng ký
      </Button>
    </SafeAreaView>
  );
};

export default InputInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: "80%",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
  },
});
