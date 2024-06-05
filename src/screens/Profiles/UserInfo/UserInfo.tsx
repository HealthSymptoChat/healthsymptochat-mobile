import {
  View,
  Text,
  Image,
  Icon,
  Heading,
  Input,
  Radio,
  Button,
  useColorMode,
  StatusBar,
  useToast,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../theme/Theme";
import { Dimensions } from "react-native";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { DatePickerModal, registerTranslation } from "react-native-paper-dates";
import { AxiosContext } from "../../../context/AxiosContext";
import { AuthContext } from "../../../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import CustomToast from "../../../components/CustomToast";
import { useIsFocused } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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
const { width, height } = Dimensions.get("window");

const UserInfo = () => {
  const focus = useIsFocused();
  const { colorMode, toggleColorMode } = useColorMode();
  const { authAxios }: any = useContext(AxiosContext);
  const authContext: any = useContext(AuthContext);
  const toast = useToast();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<CalendarDate | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const onDismissSingle = React.useCallback(() => {
    setShowDatePicker(false);
  }, [setShowDatePicker]);
  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setShowDatePicker(false);
      setDob(params.date);
    },
    [setDob]
  );

  useEffect(() => {
    if (focus) {
      fetchUserInfo();
    }
  }, [focus]);

  const fetchUserInfo = () => {
    const user = authContext.authState?.user;
    setUsername(user?.username);
    setName(user?.firstName + " " + user?.lastName);
    setGender(user?.gender);
    setDob(user?.dob ? new Date(user?.dob) : undefined);
  };

  const handleEditUserInfo = () => {
    setOpenEdit(false);
    console.log(name, dob, gender);
  };

  const logout = async () => {
    await authContext.logout();
    try {
      const response = await authAxios.get("/auth/logout");
      if (response.data.message === "success") {
        console.log("Logout success");
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        await SecureStore.deleteItemAsync("user");
        await GoogleSignin.signOut();
        toast.show({
          render: () => (
            <CustomToast
              message="Đăng xuất thành công"
              state="success"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      }
    } catch (error) {
      console.log(error);
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
      <StatusBar
        barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorMode === "dark" ? Colors.black : Colors.white}
      />
      <View
        width={width + 60}
        height={width + 40}
        borderStyle={"solid"}
        borderRadius={"full"}
        marginBottom={10}
        padding={5}
        position={"absolute"}
        top={-300}
        left={-30}
        bg={Colors.primaryMint}
      />
      <View
        marginTop={5}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading marginBottom={10} fontSize="lg" color={Colors.black}>
          {username ? username : "Username"}
        </Heading>
        <View
          padding={5}
          borderStyle={"solid"}
          borderRadius={"full"}
          bg={Colors.white}
          alignSelf={"center"}
        >
          <Icon
            as={AntDesign}
            name={"user"}
            size={10}
            color={Colors.primaryMintDark}
          />
        </View>
      </View>
      <Heading size="md" style={{ marginBottom: 10 }}>
        Thông tin cá nhân
      </Heading>
      <View>
        <Input
          variant="underlined"
          value={name}
          onChange={(e) => setName(e.nativeEvent.text)}
          isDisabled={!openEdit}
          size={"lg"}
          marginY={2}
          _focus={{
            borderColor: Colors.primaryMintDark,
          }}
          InputLeftElement={
            <Icon
              as={AntDesign}
              name="user"
              size={5}
              color={Colors.primaryMintDark}
              marginLeft={2}
              marginRight={5}
            />
          }
        />
        <Input
          variant="underlined"
          value={dob ? dob.toDateString() : "Chọn ngày sinh"}
          marginY={2}
          size={"lg"}
          readOnly={true}
          isDisabled={!openEdit}
          _focus={{
            borderColor: Colors.primaryMintDark,
          }}
          InputLeftElement={
            <Icon
              as={FontAwesome}
              name="calendar"
              size={5}
              color={Colors.primaryMintDark}
              onPress={() => {
                openEdit ? setShowDatePicker(true) : null;
              }}
              marginLeft={2}
              marginRight={5}
            />
          }
        />
        <DatePickerModal
          locale="vi"
          mode="single"
          visible={showDatePicker}
          onDismiss={onDismissSingle}
          date={dob}
          onConfirm={onConfirmSingle}
        />
        <View
          width={width - 40}
          paddingY={2}
          // borderBottomColor="coolGray.700"
          // borderBottomWidth={1}
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* <Icon
              as={FontAwesome}
              name={"transgender"}
              size={6}
              color={Colors.primaryMintDark}
              marginLeft={2}
              marginRight={5}
              /> */}
          <Radio.Group
            name="radioGroup"
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
            value={gender}
            onChange={(nextValue) => setGender(nextValue)}
          >
            <View
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Radio
                value="male"
                // _disabled={{ bg: Colors.primaryMintDark }}
                isDisabled={!openEdit}
                size="md"
                my={1}
                marginRight={1}
              >
                Nam
              </Radio>
              <Radio
                value="female"
                // _readOnly={{ bg: Colors.primaryMintDark }}
                isDisabled={!openEdit}
                size="md"
                my={1}
                marginLeft={1}
              >
                Nữ
              </Radio>
            </View>
          </Radio.Group>
        </View>
      </View>
      {openEdit ? (
        <Button
          marginY={2}
          rounded="full"
          bg={Colors.primaryMint}
          onPress={() => handleEditUserInfo()}
        >
          Hoàn tất
        </Button>
      ) : (
        <Button
          marginY={2}
          rounded="full"
          bg={Colors.primaryMintDark}
          onPress={() => setOpenEdit(true)}
        >
          Cập nhật
        </Button>
      )}
      <Heading size="md" style={{ marginBottom: 10 }}>
        Cài đặt
      </Heading>
      <View
        paddingY={5}
        borderBottomColor="coolGray.700"
        borderBottomWidth={1}
        display="flex"
        flexDirection="row-reverse"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Text fontSize="md" marginX={5}>
          Màu nền
        </Text>
        <Icon
          as={MaterialIcons}
          name={colorMode === "dark" ? "dark-mode" : "light-mode"}
          size={6}
          color={Colors.primaryMintDark}
          // onPress={toggleColorMode}
        />
      </View>
      <Button
        marginY={2}
        rounded="full"
        variant="outline"
        bg={"red.500"}
        _text={{
          fontWeight: "bold",
          color: Colors.white,
        }}
        onPress={logout}
        rightIcon={
          <Icon
            as={MaterialIcons}
            name={"logout"}
            size={5}
            color={Colors.white}
          />
        }
      >
        Đăng xuất
      </Button>
    </View>
  );
};

export default UserInfo;
