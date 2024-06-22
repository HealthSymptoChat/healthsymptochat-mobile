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
  Select,
  ScrollView,
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
import UserInfoProps from "../../../interface/UserInfo";

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

const UserInfo = ({ navigation }: any) => {
  const focus = useIsFocused();
  const { colorMode, toggleColorMode } = useColorMode();
  const { authAxios }: any = useContext(AxiosContext);
  const authContext: any = useContext(AuthContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dob, setDob] = useState<CalendarDate | undefined>(undefined);
  const [isHaveValue, setIsHaveValue] = useState<boolean>(false);
  // user info
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    username: "",
    name: "",
    address: "",
    job: "",
    gender: "",
    disease: false,
    treatment: "",
    surgery: false,
    surgeryType: "",
    isToxic: false,
    isEpidemic: false,
    isGeneticDisease: false,
    isSmoke: false,
    isExercise: false,
  });

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

  const fetchUserInfo = async () => {
    try {
      const response = await authAxios.get("/patient/getPatientByUserId");
      if (response.data.message === "success") {
        const {
          address,
          job,
          gender,
          past_disease,
          past_disease_treatment,
          had_surgery,
          surgery_type,
          exposure_to_toxic_substances,
          visited_epidemic_areas,
          family_genetic_disease,
          uses_tobacco,
          exercises_regularly,
        } = response.data.data;
        const user = authContext.authState?.user;
        setUserInfo({
          username: user?.username,
          name: user?.firstName + " " + user?.lastName,
          address: address,
          job: job,
          gender: gender,
          disease: past_disease === "Có" ? true : false,
          treatment: past_disease_treatment,
          surgery: had_surgery === "Có" ? true : false,
          surgeryType: surgery_type,
          isToxic: exposure_to_toxic_substances === "Có" ? true : false,
          isEpidemic: visited_epidemic_areas === "Có" ? true : false,
          isGeneticDisease: family_genetic_disease === "Có" ? true : false,
          isSmoke: uses_tobacco === "Có" ? true : false,
          isExercise: exercises_regularly === "Có" ? true : false,
        });
      } else {
        console.log("User info not found", response.data);
        setIsHaveValue(true);
      }
    } catch (error) {
      console.log("Error fetching user info", error);
      setIsHaveValue(true);
    }
  };

  const handleEditUserInfo = async () => {
    try {
      setOpenEdit(false);
      const response = await authAxios.post("/patient/updatePatientByUserId", {
        address: userInfo.address,
        job: userInfo.job,
        gender: userInfo.gender,
        past_diseases: userInfo.disease ? "Có" : "Không",
        past_disease_treatment: userInfo.treatment,
        had_surgery: userInfo.surgery ? "Có" : "Không",
        surgery_type: userInfo.surgeryType,
        exposure_to_toxic_substances: userInfo.isToxic ? "Có" : "Không",
        visited_epidemic_areas: userInfo.isEpidemic ? "Có" : "Không",
        family_genetic_disease: userInfo.isGeneticDisease ? "Có" : "Không",
        family_cardiovascular_disease: userInfo.isGeneticDisease
          ? "Có"
          : "Không",
        family_malignant_disease: userInfo.isGeneticDisease ? "Có" : "Không",
        family_autoimmune_disease: userInfo.isGeneticDisease ? "Có" : "Không",
        uses_tobacco: userInfo.isSmoke ? "Có" : "Không",
        uses_alcohol: userInfo.isSmoke ? "Có" : "Không",
        uses_stimulants: userInfo.isSmoke ? "Có" : "Không",
        exercises_regularly: userInfo.isExercise ? "Có" : "Không",
      });
      if (response.data.message === "success") {
        toast.show({
          render: () => (
            <CustomToast
              message="Cập nhật thành công"
              state="success"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      } else {
        toast.show({
          render: () => (
            <CustomToast
              message="Cập nhật thất bại"
              state="error"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error editing user info", error);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/auth/logout", {
        refreshToken: authContext.authState.refreshToken,
      });
      if (response.data.message === "success") {
        console.log("Logout success");
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        await SecureStore.deleteItemAsync("user");
        await GoogleSignin.signOut();
        await authContext.logout();
        setIsLoading(false);
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
      } else {
        console.log("Logout failed", response.data.message);
        setIsLoading(false);
        toast.show({
          render: () => (
            <CustomToast
              message="Đăng xuất thất bại"
              state="error"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error", error);
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
          {userInfo.username ? userInfo.username : "Username"}
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
      <ScrollView>
        {!isHaveValue ? (
          <View>
            <Heading size="md" style={{ marginBottom: 10 }}>
              Thông tin cá nhân
            </Heading>
            <View>
              {/* <Input
                variant="underlined"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.nativeEvent.text })
                }
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
              /> */}
              {/* <Input
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
        /> */}
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Nơi sinh sống
              </Text>
              <Select
                width={"100%"}
                marginBottom={5}
                alignSelf={"center"}
                placeholder="Chọn nơi sinh sống"
                rounded={"full"}
                isDisabled={!openEdit}
                selectedValue={userInfo.address || ""}
                onValueChange={(itemValue) =>
                  setUserInfo({ ...userInfo, address: itemValue })
                }
              >
                <Select.Item label="Hà Nội" value="Hà Nội" />
                <Select.Item
                  label="Thành phố Hồ Chí Minh"
                  value="Thành phố Hồ Chí Minh"
                />
                <Select.Item label="Đà Nẵng" value="Đà Nẵng" />
                <Select.Item label="Khác" value="Khác" />
              </Select>
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Công việc
              </Text>
              <Select
                width={"100%"}
                marginBottom={5}
                alignSelf={"center"}
                placeholder="Chọn công việc"
                rounded={"full"}
                isDisabled={!openEdit}
                selectedValue={userInfo.job || ""}
                onValueChange={(itemValue) =>
                  setUserInfo({ ...userInfo, job: itemValue })
                }
              >
                <Select.Item label="Học sinh" value="Học sinh" />
                <Select.Item label="Giáo viên" value="Giáo viên" />
                <Select.Item label="Công nhân" value="Công nhân" />
                <Select.Item
                  label="Nhân viên văn phòng"
                  value="Nhân viên văn phòng"
                />
              </Select>
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Giới tính
              </Text>
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
                  value={userInfo.gender || ""}
                  onChange={(nextValue) =>
                    setUserInfo({ ...userInfo, gender: nextValue })
                  }
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
                      value="Nam"
                      // _disabled={{ bg: Colors.primaryMintDark }}
                      isDisabled={!openEdit}
                      size="md"
                      my={1}
                      marginRight={1}
                    >
                      Nam
                    </Radio>
                    <Radio
                      value="Nữ"
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
            <Heading size="md" style={{ marginVertical: 10 }}>
              Tiền sử bệnh của bản thân
            </Heading>
            <View>
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Có bệnh không?
              </Text>
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
                value={
                  userInfo.disease === undefined
                    ? ""
                    : userInfo.disease
                    ? "Có"
                    : "Không"
                }
                onChange={(nextValue) =>
                  setUserInfo({ ...userInfo, disease: nextValue === "Có" })
                }
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
                    value={"Có"}
                    // _disabled={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginRight={1}
                  >
                    Có
                  </Radio>
                  <Radio
                    value={"Không"}
                    // _readOnly={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginLeft={1}
                  >
                    Không
                  </Radio>
                </View>
              </Radio.Group>
              <Input
                variant="underlined"
                value={userInfo.treatment}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, treatment: e.nativeEvent.text })
                }
                isDisabled={!openEdit}
                size={"lg"}
                marginY={2}
                _focus={{
                  borderColor: Colors.primaryMintDark,
                }}
                InputLeftElement={
                  <Icon
                    as={FontAwesome}
                    name="medkit"
                    size={5}
                    color={Colors.primaryMintDark}
                    marginLeft={2}
                    marginRight={5}
                  />
                }
              />
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Đã từng phẫu thuật chưa?
              </Text>
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
                value={
                  userInfo.surgery === undefined
                    ? ""
                    : userInfo.surgery
                    ? "Có"
                    : "Không"
                }
                onChange={(nextValue) =>
                  setUserInfo({ ...userInfo, surgery: nextValue === "Có" })
                }
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
                    value={"Có"}
                    // _disabled={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginRight={1}
                  >
                    Có
                  </Radio>
                  <Radio
                    value={"Không"}
                    // _readOnly={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginLeft={1}
                  >
                    Không
                  </Radio>
                </View>
              </Radio.Group>
              <Input
                variant="underlined"
                value={userInfo.surgeryType}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, surgeryType: e.nativeEvent.text })
                }
                isDisabled={!openEdit}
                size={"lg"}
                marginY={2}
                _focus={{
                  borderColor: Colors.primaryMintDark,
                }}
                InputLeftElement={
                  <Icon
                    as={FontAwesome}
                    name="medkit"
                    size={5}
                    color={Colors.primaryMintDark}
                    marginLeft={2}
                    marginRight={5}
                  />
                }
              />
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Có tiếp xúc với chất độc hại không?
              </Text>
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
                value={
                  userInfo.isToxic === undefined
                    ? ""
                    : userInfo.isToxic
                    ? "Có"
                    : "Không"
                }
                onChange={(nextValue) =>
                  setUserInfo({ ...userInfo, isToxic: nextValue === "Có" })
                }
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
                    value={"Có"}
                    // _disabled={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginRight={1}
                  >
                    Có
                  </Radio>
                  <Radio
                    value={"Không"}
                    // _readOnly={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginLeft={1}
                  >
                    Không
                  </Radio>
                </View>
              </Radio.Group>
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Có tiếp xúc với dịch bệnh không?
              </Text>
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
                value={
                  userInfo.isEpidemic === undefined
                    ? ""
                    : userInfo.isEpidemic
                    ? "Có"
                    : "Không"
                }
                onChange={(nextValue) =>
                  setUserInfo({ ...userInfo, isEpidemic: nextValue === "Có" })
                }
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
                    value={"Có"}
                    // _disabled={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginRight={1}
                  >
                    Có
                  </Radio>
                  <Radio
                    value={"Không"}
                    // _readOnly={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginLeft={1}
                  >
                    Không
                  </Radio>
                </View>
              </Radio.Group>
            </View>
            <Heading size="md" style={{ marginVertical: 10 }}>
              Tiền sử bệnh trong gia đình
            </Heading>
            <View>
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Có bệnh di truyền không?
              </Text>
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
                value={
                  userInfo.isGeneticDisease === undefined
                    ? ""
                    : userInfo.isGeneticDisease
                    ? "Có"
                    : "Không"
                }
                onChange={(nextValue) =>
                  setUserInfo({
                    ...userInfo,
                    isGeneticDisease: nextValue === "Có",
                  })
                }
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
                    value={"Có"}
                    // _disabled={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginRight={1}
                  >
                    Có
                  </Radio>
                  <Radio
                    value={"Không"}
                    // _readOnly={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginLeft={1}
                  >
                    Không
                  </Radio>
                </View>
              </Radio.Group>
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Có hút thuốc không?
              </Text>
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
                value={
                  userInfo.isSmoke === undefined
                    ? ""
                    : userInfo.isSmoke
                    ? "Có"
                    : "Không"
                }
                onChange={(nextValue) =>
                  setUserInfo({ ...userInfo, isSmoke: nextValue === "Có" })
                }
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
                    value={"Có"}
                    // _disabled={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginRight={1}
                  >
                    Có
                  </Radio>
                  <Radio
                    value={"Không"}
                    // _readOnly={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginLeft={1}
                  >
                    Không
                  </Radio>
                </View>
              </Radio.Group>
              <Text
                fontSize="md"
                marginY={2}
                marginLeft={2}
                fontWeight={"medium"}
              >
                Có tập thể dục không?
              </Text>
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
                value={
                  userInfo.isExercise === undefined
                    ? ""
                    : userInfo.isExercise
                    ? "Có"
                    : "Không"
                }
                onChange={(nextValue) =>
                  setUserInfo({ ...userInfo, isExercise: nextValue === "Có" })
                }
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
                    value={"Có"}
                    // _disabled={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginRight={1}
                  >
                    Có
                  </Radio>
                  <Radio
                    value={"Không"}
                    // _readOnly={{ bg: Colors.primaryMintDark }}
                    isDisabled={!openEdit}
                    size="md"
                    my={1}
                    marginLeft={1}
                  >
                    Không
                  </Radio>
                </View>
              </Radio.Group>
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
          </View>
        ) : (
          <View>
            <Text
              fontSize="md"
              marginY={2}
              marginLeft={2}
              fontWeight={"medium"}
            >
              Trước tiên, bạn cần cung cấp một số thông tin sức khỏe
            </Text>
            <Button
              marginY={2}
              rounded="full"
              bg={Colors.primaryMintDark}
              onPress={() => navigation.navigate("HealthInfoInput")}
            >
              Thêm thông tin
            </Button>
          </View>
        )}
        {/* <Heading size="md" style={{ marginBottom: 10 }}>
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
        </View> */}
        <Button
          isLoading={isLoading}
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
      </ScrollView>
    </View>
  );
};

export default UserInfo;
