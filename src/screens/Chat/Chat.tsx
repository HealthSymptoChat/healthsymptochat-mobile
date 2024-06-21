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
  ScrollView,
  Spinner,
} from "native-base";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Colors } from "../../theme/Theme";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Alert, Animated, Dimensions } from "react-native";
import WaveHeader from "../../components/WaveHeader";
import { AuthContext } from "../../context/AuthContext";
import { useBackHandler } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";
import { AxiosContext } from "../../context/AxiosContext";
import UserInfoProps from "../../interface/UserInfo";

const { width, height } = Dimensions.get("window");

const Chat = ({ navigation }: any) => {
  const focus = useIsFocused();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const slideAnimation = new Animated.Value(0);
  const authContext: any = useContext(AuthContext);
  const { authAxios }: any = useContext(AxiosContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const stepSize = 10;
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  // answer data
  const [question1, setQuestion1] = useState<string>("");
  const [question2, setQuestion2] = useState<string[]>([]);
  const [question3, setQuestion3] = useState<string>("");
  const [question4, setQuestion4] = useState<string[]>([]);
  const [question5, setQuestion5] = useState<string>("");
  const [question6, setQuestion6] = useState<string>("");
  const [question7, setQuestion7] = useState<string>("");
  const [question2Other, setQuestion2Other] = useState<string>("");
  const [question3Other, setQuestion3Other] = useState<string>("");
  const [question4Other, setQuestion4Other] = useState<string>("");
  const questions = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
  ];
  const steps = {
    10: [
      "Sốt",
      "Ho",
      "Đau họng",
      "Chảy nước mũi",
      "Nghẹt mũi",
      "Đau đầu",
      "Đau cơ",
      "Mệt mỏi",
      "Mất vị giác hoặc khứu giác",
      "",
    ],
    20: ["Một ngày qua", "Ba ngày qua", "Một tuần qua", "Một tháng qua", ""],
    30: [
      "Khó ngủ",
      "Mất tập trung",
      "Giảm cân",
      "Yếu ớt",
      "Khó chịu",
      "Lo lắng",
      "Mất cảm giác ngon miệng",
      "",
    ],
  };

  const handleNext = () => {
    Animated.timing(slideAnimation, {
      toValue: -1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(currentStep + stepSize);
      if (currentStep === step) {
        setStep(step + stepSize);
      }
      slideAnimation.setValue(0);
    });
  };

  const handlePrevious = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(currentStep - stepSize);
      slideAnimation.setValue(0);
    });
  };

  // const handleEscape = () => {
  //   setCurrentStep(0);
  //   setIsOpen(false);
  //   navigation.navigate("TabBar");
  // };

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

  const checkInput = (): boolean | undefined => {
    switch (currentStep) {
      case 0:
        return question1 !== "";
      // case 10:
      //   if (question2.length > 0 || question2Other !== "") {
      //     return true;
      //   }
      case 20:
        if (question3 !== "") {
          if (
            question3 !== "Một ngày qua" &&
            question3 !== "Ba ngày qua" &&
            question3 !== "Một tuần qua" &&
            question3 !== "Một tháng qua"
          ) {
            return question3Other !== "";
          }
          return true;
        }
      // case 30:
      //   if (question4 !== "") {
      //     if (
      //       question4 !== "Khó ngủ" &&
      //       question4 !== "Mất tập trung" &&
      //       question4 !== "Giảm cân" &&
      //       question4 !== "Yếu ớt" &&
      //       question4 !== "Khó chịu" &&
      //       question4 !== "Lo lắng" &&
      //       question4 !== "Mất cảm giác ngon miệng"
      //     ) {
      //       return question4Other !== "";
      //     }
      //     return true;
      //   }
      case 40:
        return question5 !== "";
      case 50:
        return question6 !== "";
      case 60:
        return question7 !== "";
      default:
        break;
    }
  };

  const clearData = () => {
    setQuestion1("");
    setQuestion2([]);
    setQuestion3("");
    setQuestion4([]);
    setQuestion5("");
    setQuestion6("");
    setQuestion7("");
    setQuestion2Other("");
    setQuestion3Other("");
    setQuestion4Other("");
    setCurrentStep(0);
    setStep(0);
    setQuestion2Other("");
    setQuestion3Other("");
  };

  const handleInputQuestion2 = (data: string): void => {
    if (question2.find((item) => item === data)) {
      setQuestion2(question2.filter((item) => item !== data));
    } else {
      setQuestion2([...question2, data]);
    }
  };

  const handleInputQuestion4 = (data: string): void => {
    if (question4.find((item) => item === data)) {
      setQuestion4(question4.filter((item) => item !== data));
    } else {
      setQuestion4([...question4, data]);
    }
  };

  const isQuestion2Filled =
    currentStep === 10 && (question2.length !== 0 || question2Other !== "");
  const isQuestion3Filled =
    currentStep === 20 &&
    question3 !== "" &&
    !["Một ngày qua", "Ba ngày qua", "Một tuần qua", "Một tháng qua"].includes(
      question3
    );
  const isQuestion4Filled =
    currentStep === 30 && (question4.length !== 0 || question4Other !== "");

  const isCurrentStepFilled =
    (currentStep === 0 && question1 !== "") ||
    (currentStep === 10 && question2.length === 0 && question2Other === "") ||
    (currentStep === 20 && question3 !== "") ||
    (currentStep === 30 && question4.length === 0 && question4Other === "") ||
    (currentStep === 40 && question5 !== "") ||
    (currentStep === 50 && question6 !== "") ||
    (currentStep === 60 && question7 !== "");

  const shouldRenderButton =
    isQuestion2Filled ||
    isQuestion3Filled ||
    isQuestion4Filled ||
    (isCurrentStepFilled && currentStep < step);

  const handleDiagnostic = async () => {
    try {
      setIsLoading(true);
      const data = {
        question1: question1,
        question2:
          question2.length !== 0
            ? question2.join(", ") +
              (question2Other ? ", " + question2Other : "")
            : question2Other,
        question3: question3,
        question4:
          question4.length !== 0
            ? question4.join(", ") +
              (question4Other ? ", " + question4Other : "")
            : question4Other,
        question5: question5,
        question6: question6,
        question7: question7,
        patientHistory: userInfo,
      };
      console.log(data);
      const response = await axios
        .create()
        .post("https://hstc.onrender.com/diagnosis", data);

      if (response.data.message === "success") {
        clearData();
        setIsLoading(false);
        // console.log("Data: ", response.data.data);
        navigation.navigate("Result", {
          data: response.data.data,
        });
      } else {
        console.log("No data", response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (focus) {
      const fetchData = async () => {
        try {
          const response = await authAxios.get("/patient/getPatientByUserId");
          if (response.data.message === "success") {
            setUserInfo(response.data.data);
          } else {
            console.log("No data", response.data.message);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      fetchData();
    }
  }, [focus]);

  useEffect(() => {
    const fetchData = async () => {
      if (checkInput()) {
        if (currentStep === 60) {
          setIsSubmit(true);
        } else {
          setIsSubmit(false);
          handleNext();
        }
      }
    };
    fetchData();
  }, [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
  ]);

  useBackHandler(() => {
    if (currentStep === 0) {
      return false;
    }
    Alert.alert(
      "Thoát khỏi chẩn đoán",
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
            clearData();
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
          <Text fontSize={20} textAlign={"center"} marginTop={10}>
            Đang xử lý dữ liệu...
          </Text>
        </View>
      )}
      <WaveHeader />
      <ScrollView marginTop={50}>
        <View
          height={"3/4"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          margin={3}
        >
          <Image
            source={require("../../../assets/Logo.png")}
            alt="logo"
            resizeMode="contain"
            style={{ height: 150, width: 150, alignSelf: "center" }}
          />
          <View marginY={5}>
            {currentStep === 0 && (
              <Animated.View style={slideStyle}>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Chào {authContext.authState?.user?.username || ""} ! Tôi là
                  trợ lý sức khỏe riêng của bạn.
                </Text>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Hôm nay bạn cảm thấy thế nào?
                </Text>
                <View
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-around"}
                  alignItems={"flex-end"}
                >
                  <View width="14%">
                    <Text
                      fontSize={16}
                      textAlign={"center"}
                      fontWeight={"medium"}
                    >
                      Tốt
                    </Text>
                    <IconButton
                      width={"16"}
                      height={"16"}
                      rounded={"full"}
                      borderColor={
                        question1 === "Tốt" ? "success.500" : "light.50"
                      }
                      borderStyle={"solid"}
                      borderWidth={1}
                      icon={
                        <Icon
                          as={FontAwesome5}
                          size="4xl"
                          name="laugh-beam"
                          color={"success.500"}
                        />
                      }
                      onPress={() => setQuestion1("Tốt")}
                    />
                  </View>
                  <View width="1/6">
                    <Text
                      fontSize={16}
                      textAlign={"center"}
                      fontWeight={"medium"}
                    >
                      Bình thường
                    </Text>
                    <IconButton
                      width={"16"}
                      height={"16"}
                      rounded={"full"}
                      borderColor={
                        question1 === "Bình thường" ? "lime.500" : "light.50"
                      }
                      borderStyle={"solid"}
                      borderWidth={1}
                      icon={
                        <Icon
                          as={FontAwesome5}
                          size="4xl"
                          name="meh"
                          color={"lime.500"}
                        />
                      }
                      onPress={() => setQuestion1("Bình thường")}
                    />
                  </View>
                  <View width="1/6">
                    <Text
                      fontSize={16}
                      textAlign={"center"}
                      fontWeight={"medium"}
                    >
                      Khá mệt mỏi
                    </Text>
                    <IconButton
                      width={"16"}
                      height={"16"}
                      rounded={"full"}
                      borderColor={
                        question1 === "Khá mệt mỏi" ? "yellow.500" : "light.50"
                      }
                      borderStyle={"solid"}
                      borderWidth={1}
                      icon={
                        <Icon
                          as={FontAwesome5}
                          size="4xl"
                          name="frown"
                          color={"yellow.500"}
                        />
                      }
                      onPress={() => setQuestion1("Khá mệt mỏi")}
                    />
                  </View>
                  <View width="14%">
                    <Text
                      fontSize={16}
                      textAlign={"center"}
                      fontWeight={"medium"}
                    >
                      Mệt mỏi
                    </Text>
                    <IconButton
                      width={"16"}
                      height={"16"}
                      rounded={"full"}
                      borderColor={
                        question1 === "Mệt mỏi" ? "orange.500" : "light.50"
                      }
                      borderStyle={"solid"}
                      borderWidth={1}
                      icon={
                        <Icon
                          as={FontAwesome5}
                          size="4xl"
                          name="sad-tear"
                          color={"orange.500"}
                        />
                      }
                      onPress={() => setQuestion1("Mệt mỏi")}
                    />
                  </View>
                  <View width="14%">
                    <Text
                      fontSize={16}
                      textAlign={"center"}
                      fontWeight={"medium"}
                    >
                      Khó chịu
                    </Text>
                    <IconButton
                      width={"16"}
                      height={"16"}
                      rounded={"full"}
                      borderColor={
                        question1 === "Khó chịu" ? "red.500" : "light.50"
                      }
                      borderStyle={"solid"}
                      borderWidth={1}
                      icon={
                        <Icon
                          as={FontAwesome5}
                          size="4xl"
                          name="tired"
                          color={"red.500"}
                        />
                      }
                      onPress={() => setQuestion1("Khó chịu")}
                    />
                  </View>
                  <View width="14%">
                    <Text
                      fontSize={16}
                      textAlign={"center"}
                      fontWeight={"medium"}
                    >
                      Đau đớn
                    </Text>
                    <IconButton
                      width={"16"}
                      height={"16"}
                      rounded={"full"}
                      borderColor={
                        question1 === "Đau đớn" ? "red.700" : "light.50"
                      }
                      borderStyle={"solid"}
                      borderWidth={1}
                      icon={
                        <Icon
                          as={FontAwesome5}
                          size="4xl"
                          name="dizzy"
                          color={"red.700"}
                        />
                      }
                      onPress={() => setQuestion1("Đau đớn")}
                    />
                  </View>
                </View>
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
                  Triệu chứng đầu tiên mà bạn gặp phải là gì?
                </Text>
                <Button.Group
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                >
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find((item) => item === "Sốt")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find((item) => item === "Sốt")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion2("Sốt")}
                  >
                    Sốt
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find((item) => item === "Ho")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find((item) => item === "Ho")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion2("Ho")}
                  >
                    Ho
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find((item) => item === "Đau họng")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find((item) => item === "Đau họng")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion2("Đau họng")}
                  >
                    Đau họng
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find((item) => item === "Chảy nước mũi")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find((item) => item === "Chảy nước mũi")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion2("Chảy nước mũi")}
                  >
                    Chảy nước mũi
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find((item) => item === "Nghẹt mũi")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find((item) => item === "Nghẹt mũi")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion2("Nghẹt mũi")}
                  >
                    Nghẹt mũi
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find((item) => item === "Đau đầu")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find((item) => item === "Đau đầu")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion2("Đau đầu")}
                  >
                    Đau đầu
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find((item) => item === "Đau cơ")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find((item) => item === "Đau cơ")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion2("Đau cơ")}
                  >
                    Đau cơ
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find((item) => item === "Mệt mỏi")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find((item) => item === "Mệt mỏi")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion2("Mệt mỏi")}
                  >
                    Mệt mỏi
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2.find(
                        (item) => item === "Mất vị giác hoặc khứu giác"
                      )
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2.find(
                        (item) => item === "Mất vị giác hoặc khứu giác"
                      )
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() =>
                      handleInputQuestion2("Mất vị giác hoặc khứu giác")
                    }
                  >
                    Mất vị giác hoặc khứu giác
                  </Button>
                </Button.Group>
                <Input
                  rounded={"full"}
                  placeholder="Khác"
                  marginTop={5}
                  value={question2Other}
                  onChangeText={(text) => setQuestion2Other(text)}
                />
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
                  Triệu chứng này bắt đầu từ khi nào?
                </Text>
                <Button.Group
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                >
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question3 === "Một ngày qua"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question3 === "Một ngày qua"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion3("Một ngày qua")}
                  >
                    Một ngày qua
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question3 === "Ba ngày qua"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question3 === "Ba ngày qua"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion3("Ba ngày qua")}
                  >
                    Ba ngày qua
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question3 === "Một tuần qua"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question3 === "Một tuần qua"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion3("Một tuần qua")}
                  >
                    Một tuần qua
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question3 === "Một tháng qua"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question3 === "Một tháng qua"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion3("Một tháng qua")}
                  >
                    Một tháng qua
                  </Button>
                </Button.Group>
                <Input
                  rounded={"full"}
                  placeholder="Thời gian khác"
                  marginTop={2}
                  value={
                    question3 === "Một ngày qua" ||
                    question3 === "Ba ngày qua" ||
                    question3 === "Một tuần qua" ||
                    question3 === "Một tháng qua"
                      ? ""
                      : question3
                  }
                  onChangeText={(text) => setQuestion3(text)}
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
                  Từ lúc bắt đầu cho đến nay, triệu chứng gây cho bạn những điều
                  gì khó chịu?
                </Text>
                <Button.Group
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                >
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4.find((item) => item === "Khó ngủ")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4.find((item) => item === "Khó ngủ")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion4("Khó ngủ")}
                  >
                    Khó ngủ
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4.find((item) => item === "Mất tập trung")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4.find((item) => item === "Mất tập trung")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion4("Mất tập trung")}
                  >
                    Mất tập trung
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4.find((item) => item === "Giảm cân")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4.find((item) => item === "Giảm cân")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion4("Giảm cân")}
                  >
                    Giảm cân
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4.find((item) => item === "Yếu ớt")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4.find((item) => item === "Yếu ớt")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion4("Yếu ớt")}
                  >
                    Yếu ớt
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4.find((item) => item === "Khó chịu")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4.find((item) => item === "Khó chịu")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion4("Khó chịu")}
                  >
                    Khó chịu
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4.find((item) => item === "Lo lắng")
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4.find((item) => item === "Lo lắng")
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => handleInputQuestion4("Lo lắng")}
                  >
                    Lo lắng
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4.find(
                        (item) => item === "Mất cảm giác ngon miệng"
                      )
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4.find(
                        (item) => item === "Mất cảm giác ngon miệng"
                      )
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() =>
                      handleInputQuestion4("Mất cảm giác ngon miệng")
                    }
                  >
                    Mất cảm giác ngon miệng
                  </Button>
                </Button.Group>
                <Input
                  rounded={"full"}
                  placeholder="Triệu chứng khác"
                  marginTop={2}
                  value={question4Other}
                  onChangeText={(text) => setQuestion4Other(text)}
                />
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
                  Trước đó, bạn có làm gì để giảm nhẹ các triệu chứng này không?
                </Text>
                <Button.Group
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                >
                  <Button
                    width={"24"}
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question5 === "Có" ? Colors.primaryMintDark : "light.50"
                    }
                    _text={
                      question5 === "Có"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion5("Có")}
                  >
                    Có
                  </Button>
                  <Button
                    width={"24"}
                    textAlign={"center"}
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question5 === "Không"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question5 === "Không"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion5("Không")}
                  >
                    Không
                  </Button>
                </Button.Group>
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
                  Trước đó, bạn có sử dụng thuốc gì không?
                </Text>
                <Button.Group
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                >
                  <Button
                    width={"24"}
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question6 === "Có" ? Colors.primaryMintDark : "light.50"
                    }
                    _text={
                      question6 === "Có"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion6("Có")}
                  >
                    Có
                  </Button>
                  <Button
                    width={"24"}
                    textAlign={"center"}
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question6 === "Không"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question6 === "Không"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion6("Không")}
                  >
                    Không
                  </Button>
                </Button.Group>
              </Animated.View>
            )}
            {currentStep === 60 && (
              <Animated.View style={slideStyle}>
                <Text
                  marginBottom={10}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Thuốc đó có hiệu quả không?
                </Text>
                <Button.Group
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                >
                  <Button
                    width={"24"}
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question7 === "Có" ? Colors.primaryMintDark : "light.50"
                    }
                    _text={
                      question7 === "Có"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion7("Có")}
                  >
                    Có
                  </Button>
                  <Button
                    width={"24"}
                    textAlign={"center"}
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question7 === "Không"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question7 === "Không"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion7("Không")}
                  >
                    Không
                  </Button>
                </Button.Group>
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
          {/* {(currentStep === 10 &&
            (question2.length !== 0 || question2Other !== "")) ||
          (currentStep === 20 &&
            question3 !== "Một ngày qua" &&
            question3 !== "Ba ngày qua" &&
            question3 !== "Một tuần qua" &&
            question3 !== "Một tháng qua" &&
            question3 !== "") ||
          (currentStep === 30 &&
            (question4.length !== 0 || question4Other !== "")) ||
          (((currentStep === 0 && question1 !== "") ||
            (currentStep === 10 &&
              question2.length === 0 &&
              question2Other === "") ||
            (currentStep === 20 && question3 !== "") ||
            (currentStep === 30 &&
              question4.length === 0 &&
              question4Other === "") ||
            (currentStep === 40 && question5 !== "") ||
            (currentStep === 50 && question6 !== "") ||
            (currentStep === 60 && question7 !== "")) &&
            currentStep < step) ? ( */}
          {shouldRenderButton ? (
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
              onPress={handleNext}
            >
              Tiếp theo
            </Button>
          ) : (
            <Spacer />
          )}
          {isSubmit && currentStep === 60 && step === 60 && (
            <Button
              alignSelf={"flex-end"}
              rounded={"full"}
              bg={Colors.primaryMintDark}
              rightIcon={
                <Icon
                  as={AntDesign}
                  name="check"
                  size="sm"
                  color={Colors.white}
                />
              }
              onPress={handleDiagnostic}
            >
              Hoàn tất
            </Button>
          )}
          {/* {(currentStep === 0 && question1 !== "") ||
          (currentStep === 10 && question2 !== "") ||
          (currentStep === 20 && question3 !== "") ||
          (currentStep === 30 && question4 !== "") ||
          (currentStep === 40 && question5 !== "") ||
          (currentStep === 50 && question6 !== "") ||
          (currentStep === 60 && question7 !== "") ? (
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
              onPress={handleNext}
            >
              Tiếp theo
            </Button>
          ) : (
            <Spacer />
          )} */}
        </View>
        <Progress
          rounded={"full"}
          marginTop={3}
          size="sm"
          _filledTrack={{ bg: Colors.primaryMintDark }}
          value={currentStep}
          max={60}
        />
      </View>
    </View>
  );
};

export default Chat;
