import {
  View,
  Text,
  Progress,
  Button,
  Icon,
  Spacer,
  Input,
  Image,
  IconButton,
  AlertDialog,
  Heading,
  Select,
  Radio,
  ScrollView,
  Checkbox,
  useToast,
  Spinner,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Colors } from "../../theme/Theme";
import { AntDesign } from "@expo/vector-icons";
import { Alert, Animated, Dimensions } from "react-native";
import WaveHeader from "../../components/WaveHeader";
import CustomToast from "../../components/CustomToast";
import { AxiosContext } from "../../context/AxiosContext";
import { CommonActions } from "@react-navigation/native";
import { useBackHandler } from "@react-native-community/hooks";

const { width, height } = Dimensions.get("window");

const HealthInfoInput = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const slideAnimation = new Animated.Value(0);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authAxios }: any = useContext(AxiosContext);
  // info
  const [address, setAddress] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [disease, setDisease] = useState<boolean>();
  const [treatment, setTreatment] = useState<string>("");
  const [surgery, setSurgery] = useState<boolean>();
  const [surgeryType, setSurgeryType] = useState<string>("");
  const [isToxic, setIsToxic] = useState<boolean>();
  const [isEpidemic, setIsEpidemic] = useState<boolean>();
  const [isGeneticDisease, setIsGeneticDisease] = useState<boolean>();
  const [isSmoke, setIsSmoke] = useState<boolean>();
  const [isExercise, setIsExercise] = useState<boolean>();

  const handleNext = () => {
    Animated.timing(slideAnimation, {
      toValue: -1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(currentStep + 10);
      slideAnimation.setValue(0);
    });
  };

  const handlePrevious = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(currentStep - 10);
      slideAnimation.setValue(0);
    });
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
  //     if (currentStep === 0) {
  //       return;
  //     }
  //     e.preventDefault();
  //     Alert.alert(
  //       "Thoát khỏi thông tin sức khỏe",
  //       "Dữ liệu hiện tại của bạn sẽ không được lưu lại",
  //       [
  //         {
  //           text: "Hủy",
  //           style: "cancel",
  //           onPress: () => {},
  //         },
  //         {
  //           text: "Thoát",
  //           style: "destructive",
  //           onPress: () => navigation.dispatch(e.data.action),
  //         },
  //       ]
  //     );
  //   });

  //   return unsubscribe;
  // }, [navigation, currentStep]);

  const checkInput = (): boolean | undefined => {
    switch (currentStep) {
      case 0:
        return address !== "" && job !== "" && gender !== "";
      case 10:
        return disease !== undefined;
      case 20:
        return surgery !== undefined;
      case 30:
        return isToxic !== undefined && isEpidemic !== undefined;
      case 40:
        return isGeneticDisease !== undefined;
      case 50:
        return isSmoke !== undefined && isExercise !== undefined;
      default:
        break;
    }
  };

  const returnToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "TabBar" }],
    });
    // navigation.navigate("TabBar");
  };

  const handleSuccess = async () => {
    try {
      console.log({
        address,
        job,
        gender,
        disease,
        treatment,
        surgery,
        surgeryType,
        isToxic,
        isEpidemic,
        isGeneticDisease,
        isSmoke,
        isExercise,
      });
      setIsLoading(true);
      const response = await authAxios.post("/patient/addPatient", {
        address: address,
        job: job,
        gender: gender,
        past_diseases: disease ? "Có" : "Không",
        past_disease_treatment: treatment,
        had_surgery: surgery ? "Có" : "Không",
        surgery_type: surgeryType,
        exposure_to_toxic_substances: isToxic ? "Có" : "Không",
        visited_epidemic_areas: isEpidemic ? "Có" : "Không",
        family_genetic_disease: isGeneticDisease ? "Có" : "Không",
        family_cardiovascular_disease: isGeneticDisease ? "Có" : "Không",
        family_malignant_disease: isGeneticDisease ? "Có" : "Không",
        family_autoimmune_disease: isGeneticDisease ? "Có" : "Không",
        uses_tobacco: isSmoke ? "Có" : "Không",
        uses_alcohol: isSmoke ? "Có" : "Không",
        uses_stimulants: isSmoke ? "Có" : "Không",
        exercises_regularly: isExercise ? "Có" : "Không",
      });

      if (response.data.message === "success") {
        toast.show({
          render: () => (
            <CustomToast
              message="Cảm ơn bạn đã cung cấp thông tin sức khỏe của mình"
              state="success"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
        setIsLoading(false);
        navigation.navigate("TabBar");
      } else {
        console.log(response.data);
        setIsLoading(false);
        toast.show({
          render: () => (
            <CustomToast
              message="Có lỗi xảy ra, vui lòng thử lại sau"
              state="error"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.show({
        render: () => (
          <CustomToast
            message="Có lỗi xảy ra, vui lòng thử lại sau"
            state="error"
            onClose={() => {
              toast.closeAll();
            }}
          />
        ),
      });
    }
  };

  const slideStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-width, 0, width],
        }),
      },
    ],
    opacity: slideAnimation.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 1, 0],
    }),
  };

  useBackHandler(() => {
    if (currentStep === 0) {
      return false;
    }
    Alert.alert(
      "Thoát khỏi thông tin sức khỏe",
      "Dữ liệu hiện tại của bạn sẽ không được lưu lại",
      [
        {
          text: "Hủy",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Thoát",
          style: "destructive",
          onPress: () => {
            navigation.navigate("TabBar");
          },
        },
      ]
    );
    return true;
  });

  return (
    <View
      _dark={{
        bg: "dark.100",
      }}
      _light={{
        bg: "light.50",
      }}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {isLoading && (
        <View
          width={"100%"}
          position={"absolute"}
          paddingY={"full"}
          zIndex={999}
          alignSelf={"center"}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <Spinner color={Colors.primaryMintDark} size={50} />
        </View>
      )}
      <WaveHeader />
      <ScrollView marginTop={50}>
        <View
          //   height={"5/6"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          margin={3}
        >
          <View>
            <Image
              source={require("../../../assets/Logo.png")}
              alt="logo"
              resizeMode="contain"
              style={{ height: 150, width: 150, alignSelf: "center" }}
            />
            <Text textAlign={"center"} fontSize={14} color={"gray.500"}>
              Trước khi bắt đầu, hãy cho chúng tôi biết một số thông tin về tình
              trạng sức khỏe của bạn
            </Text>
          </View>
          <View marginY={5}>
            {currentStep === 0 && (
              <Animated.View style={slideStyle}>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  1. Các thông tin cá nhân cơ bản
                </Text>
                <Text marginY={5} fontSize={"lg"} textAlign={"center"}>
                  Nơi sinh sống
                </Text>
                <Select
                  width={"80%"}
                  marginBottom={5}
                  alignSelf={"center"}
                  placeholder="Chọn nơi sinh sống"
                  rounded={"full"}
                  selectedValue={address || ""}
                  onValueChange={(itemValue) => setAddress(itemValue)}
                >
                  <Select.Item label="Hà Nội" value="Hà Nội" />
                  <Select.Item
                    label="Thành phố Hồ Chí Minh"
                    value="Thành phố Hồ Chí Minh"
                  />
                  <Select.Item label="Đà Nẵng" value="Đà Nẵng" />
                  <Select.Item label="Khác" value="Khác" />
                </Select>
                <Text marginY={5} fontSize={"lg"} textAlign={"center"}>
                  Công việc
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={job || ""}
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
                  onChange={(nextValue) => setJob(nextValue)}
                >
                  <View
                    width={"90%"}
                    display={"flex"}
                    flexDirection={"row"}
                    flexWrap={"wrap"}
                    marginBottom={5}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Nhân viên văn phòng" size="md" my={1}>
                      Nhân viên văn phòng
                    </Radio>
                    <Radio value="Giáo viên" size="md" my={1}>
                      Giáo viên
                    </Radio>
                    <Radio value="Học sinh" size="md" my={1}>
                      Học sinh/Sinh viên
                    </Radio>
                    <Radio value="Công nhân" size="md" my={1}>
                      Công nhân
                    </Radio>
                  </View>
                </Radio.Group>
                <Input
                  width={"80%"}
                  marginBottom={5}
                  alignSelf={"center"}
                  placeholder="Công việc khác"
                  rounded={"full"}
                  value={
                    job === "Nhân viên văn phòng" ||
                    job === "Giáo viên" ||
                    job === "Học sinh" ||
                    job === "Công nhân"
                      ? ""
                      : job
                  }
                  onChangeText={(text) => setJob(text)}
                />
                <Text marginY={5} fontSize={"lg"} textAlign={"center"}>
                  Giới tính
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={gender || ""}
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
                    width={"40%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Nam" size="md" my={1} marginRight={1}>
                      Nam
                    </Radio>
                    <Radio value="Nữ" size="md" my={1} marginLeft={1}>
                      Nữ
                    </Radio>
                  </View>
                </Radio.Group>
              </Animated.View>
            )}
            {currentStep === 10 && (
              <Animated.View style={slideStyle}>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  2. Tiền sử bệnh của bản thân
                </Text>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Bạn đã từng bị bệnh gì trước đây không?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={disease === undefined ? "" : disease ? "Có" : "Không"}
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
                  onChange={(nextValue) => setDisease(nextValue === "Có")}
                >
                  <View
                    width={"40%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Có" size="md" my={1} marginRight={1}>
                      Có
                    </Radio>
                    <Radio value="Không" size="md" my={1} marginLeft={1}>
                      Không
                    </Radio>
                  </View>
                </Radio.Group>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Nếu có, điều trị như thế nào và kết quả ra sao?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={treatment || ""}
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
                  onChange={(nextValue) => setTreatment(nextValue)}
                >
                  <View width={"100%"}>
                    <Radio
                      value="Đã thành công và đã hồi phục hoàn toàn"
                      size="md"
                      my={1}
                    >
                      Đã thành công và đã hồi phục hoàn toàn.
                    </Radio>
                    <Radio
                      value="Vẫn đang diễn ra và đang dần hồi phục"
                      size="md"
                      my={1}
                    >
                      Vẫn đang diễn ra và đang dần hồi phục.
                    </Radio>
                    <Radio
                      value="Không thành công và vẫn đang phải vật lộn với các triệu
                      chứng"
                      size="md"
                      my={1}
                    >
                      Không thành công và vẫn đang phải vật lộn với các triệu
                      chứng.
                    </Radio>
                  </View>
                </Radio.Group>
              </Animated.View>
            )}
            {currentStep === 20 && (
              <Animated.View style={slideStyle}>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  2. Tiền sử bệnh của bản thân
                </Text>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Bạn có từng phải phẫu thuật không?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={surgery === undefined ? "" : surgery ? "Có" : "Không"}
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
                  onChange={(nextValue) => setSurgery(nextValue === "Có")}
                >
                  <View
                    width={"40%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Có" size="md" my={1} marginRight={1}>
                      Có
                    </Radio>
                    <Radio value="Không" size="md" my={1} marginLeft={1}>
                      Không
                    </Radio>
                  </View>
                </Radio.Group>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Nếu có, đó là phẫu thuật gì?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={surgeryType || ""}
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
                  onChange={(nextValue) => setSurgeryType(nextValue)}
                >
                  <View
                    width={"80%"}
                    display={"flex"}
                    flexDirection={"row"}
                    flexWrap={"wrap"}
                    marginBottom={5}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Tim" size="md" my={1}>
                      Tim
                    </Radio>
                    <Radio value="Ung thư" size="md" my={1}>
                      Ung thư
                    </Radio>
                    <Radio value="Thần kinh" size="md" my={1}>
                      Thần kinh
                    </Radio>
                    <Radio value="Tiêu hóa" size="md" my={1}>
                      Tiêu hóa
                    </Radio>
                    <Radio value="Sản khoa" size="md" my={1}>
                      Sản khoa
                    </Radio>
                    <Radio value="Chỉnh hình" size="md" my={1}>
                      Chỉnh hình
                    </Radio>
                    <Radio value="Thẩm mỹ" size="md" my={1}>
                      Thẩm mỹ
                    </Radio>
                  </View>
                </Radio.Group>
                <Input
                  // width={"80%"}
                  marginBottom={5}
                  alignSelf={"center"}
                  placeholder="Khác, vui lòng ghi rõ"
                  rounded={"full"}
                  value={
                    surgeryType === "Tim" ||
                    surgeryType === "Ung thư" ||
                    surgeryType === "Thần kinh" ||
                    surgeryType === "Tiêu hóa" ||
                    surgeryType === "Sản khoa" ||
                    surgeryType === "Chỉnh hình" ||
                    surgeryType === "Thẩm mỹ"
                      ? ""
                      : surgeryType
                  }
                  onChangeText={(text) => setSurgeryType(text)}
                />
              </Animated.View>
            )}
            {currentStep === 30 && (
              <Animated.View style={slideStyle}>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  2. Tiền sử bệnh của bản thân
                </Text>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Bạn có tiền sử tiếp xúc với chất độc hại hoặc làm việc trong
                  môi trường nguy hiểm không?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={isToxic === undefined ? "" : isToxic ? "Có" : "Không"}
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
                  onChange={(nextValue) => setIsToxic(nextValue === "Có")}
                >
                  <View
                    width={"40%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Có" size="md" my={1} marginRight={1}>
                      Có
                    </Radio>
                    <Radio value="Không" size="md" my={1} marginLeft={1}>
                      Không
                    </Radio>
                  </View>
                </Radio.Group>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Bạn có từng đi đến vùng dịch tễ nào không?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={
                    isEpidemic === undefined ? "" : isEpidemic ? "Có" : "Không"
                  }
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
                  onChange={(nextValue) => setIsEpidemic(nextValue === "Có")}
                >
                  <View
                    width={"40%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Có" size="md" my={1} marginRight={1}>
                      Có
                    </Radio>
                    <Radio value="Không" size="md" my={1} marginLeft={1}>
                      Không
                    </Radio>
                  </View>
                </Radio.Group>
              </Animated.View>
            )}
            {currentStep === 40 && (
              <Animated.View style={slideStyle}>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  3. Tiền sử bệnh của gia đình
                </Text>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Trong gia đình bạn có ai từng mắc bệnh di truyền, bệnh tim
                  mạch, bệnh ác tính, hay bệnh tự miễn không?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={
                    isGeneticDisease === undefined
                      ? ""
                      : isGeneticDisease
                      ? "Có"
                      : "Không"
                  }
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
                  onChange={(nextValue) =>
                    setIsGeneticDisease(nextValue === "Có")
                  }
                >
                  <View
                    width={"40%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Có" size="md" my={1} marginRight={1}>
                      Có
                    </Radio>
                    <Radio value="Không" size="md" my={1} marginLeft={1}>
                      Không
                    </Radio>
                  </View>
                </Radio.Group>
              </Animated.View>
            )}
            {currentStep === 50 && (
              <Animated.View style={slideStyle}>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  4. Lối sống
                </Text>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Bạn có thói quen hút thuốc, uống rượu, sử dụng chất kích thích
                  không?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={isSmoke === undefined ? "" : isSmoke ? "Có" : "Không"}
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
                  onChange={(nextValue) => setIsSmoke(nextValue === "Có")}
                >
                  <View
                    width={"40%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Có" size="md" my={1} marginRight={1}>
                      Có
                    </Radio>
                    <Radio value="Không" size="md" my={1} marginLeft={1}>
                      Không
                    </Radio>
                  </View>
                </Radio.Group>
                <Text
                  marginY={5}
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"semibold"}
                >
                  Bạn có thường xuyên vận động hoặc luyện tập thể dục thể thao
                  không?
                </Text>
                <Radio.Group
                  name="radioGroup"
                  value={
                    isExercise === undefined ? "" : isExercise ? "Có" : "Không"
                  }
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
                  onChange={(nextValue) => setIsExercise(nextValue === "Có")}
                >
                  <View
                    width={"40%"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignSelf={"center"}
                  >
                    <Radio value="Có" size="md" my={1} marginRight={1}>
                      Có
                    </Radio>
                    <Radio value="Không" size="md" my={1} marginLeft={1}>
                      Không
                    </Radio>
                  </View>
                </Radio.Group>
              </Animated.View>
            )}
          </View>
        </View>
      </ScrollView>
      <View margin={1}>
        <View
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          {currentStep !== 0 ? (
            <Button
              alignSelf={"flex-start"}
              rounded={"full"}
              variant="outline"
              borderColor={Colors.primaryMintDark}
              _text={{ color: Colors.primaryMintDark }}
              onPress={handlePrevious}
              leftIcon={
                <Icon
                  as={AntDesign}
                  name="left"
                  size="sm"
                  color={Colors.primaryMintDark}
                />
              }
            >
              Quay lại
            </Button>
          ) : (
            <Spacer />
          )}
          {currentStep === 50 ? (
            <Button
              alignSelf={"flex-end"}
              rounded={"full"}
              bg={Colors.primaryMintDark}
              isDisabled={!checkInput()}
              rightIcon={
                <Icon
                  as={AntDesign}
                  name="check"
                  size="sm"
                  color={Colors.white}
                />
              }
              onPress={() => handleSuccess()}
            >
              Kết thúc
            </Button>
          ) : (
            // checkInput() && (
            <Button
              alignSelf={"flex-end"}
              rounded={"full"}
              bg={Colors.primaryMintDark}
              rightIcon={
                <Icon
                  as={AntDesign}
                  name="right"
                  size="sm"
                  color={Colors.white}
                />
              }
              isDisabled={!checkInput()}
              onPress={handleNext}
            >
              Tiếp theo
            </Button>
            // )
          )}
        </View>
        <Progress
          rounded={"full"}
          marginTop={3}
          size="sm"
          _filledTrack={{ bg: Colors.primaryMintDark }}
          value={currentStep}
          max={50}
        />
      </View>
      {/* <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Thoát khỏi thông tin sức khỏe</AlertDialog.Header>
          <AlertDialog.Body>
            Dữ liệu hiện tại của bạn sẽ không được lưu lại
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setIsOpen(false)}
                ref={cancelRef}
              >
                Hủy
              </Button>
              <Button
                rounded={"full"}
                colorScheme="danger"
                onPress={() => handleEscape()}
              >
                Thoát
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog> */}
    </View>
  );
};

export default HealthInfoInput;
