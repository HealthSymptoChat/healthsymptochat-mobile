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
import React, { useContext, useEffect, useRef, useState } from "react";
import { Colors } from "../../theme/Theme";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Alert, Animated, Dimensions } from "react-native";
import WaveHeader from "../../components/WaveHeader";
import { AuthContext } from "../../context/AuthContext";

const { width, height } = Dimensions.get("window");

const Chat = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const slideAnimation = new Animated.Value(0);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);
  const authContext: any = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // answer data
  const [question1, setQuestion1] = useState<string>("");
  const [question2, setQuestion2] = useState<string>("");
  const [question3, setQuestion3] = useState<string>("");
  const [question4, setQuestion4] = useState<string>("");
  const [question5, setQuestion5] = useState<string>("");
  const [question6, setQuestion6] = useState<string>("");
  const [question7, setQuestion7] = useState<string>("");

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
      case 10:
        return question2 !== "";
      case 20:
        return question3 !== "";
      case 30:
        return question4 !== "";
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

  const clearInput = () => {
    setQuestion1("");
    setQuestion2("");
    setQuestion3("");
    setQuestion4("");
    setQuestion5("");
    setQuestion6("");
    setQuestion7("");
  };

  useEffect(() => {
    if (checkInput()) {
      if (currentStep === 60) {
        setIsLoading(true);
        // loop this loading for 4 seconds
        setTimeout(() => {
          setIsLoading(false);
          clearInput();
          navigation.navigate("Result", { canGoBack: false });
        }, 4000);
        return;
      }
      handleNext();
    }
  }, [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      if (currentStep === 0) {
        return;
      }
      e.preventDefault();
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
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, currentStep]);

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
      {/* <IconButton
        position={"absolute"}
        top={5}
        right={5}
        bg={Colors.primaryMint}
        rounded={"full"}
        zIndex={99}
        _pressed={{ bg: "coolGray.400" }}
        icon={<Icon as={AntDesign} name="close" color={Colors.white} />}
        onPress={() => setIsOpen(true)}
      /> */}
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
                      question2 === "Sốt" ? Colors.primaryMintDark : "light.50"
                    }
                    _text={
                      question2 === "Sốt"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Sốt")}
                  >
                    Sốt
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2 === "Ho" ? Colors.primaryMintDark : "light.50"
                    }
                    _text={
                      question2 === "Ho"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Ho")}
                  >
                    Ho
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2 === "Đau họng"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2 === "Đau họng"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Đau họng")}
                  >
                    Đau họng
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2 === "Chảy nước mũi"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2 === "Chảy nước mũi"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Chảy nước mũi")}
                  >
                    Chảy nước mũi
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2 === "Nghẹt mũi"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2 === "Nghẹt mũi"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Nghẹt mũi")}
                  >
                    Nghẹt mũi
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2 === "Đau đầu"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2 === "Đau đầu"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Đau đầu")}
                  >
                    Đau đầu
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2 === "Đau cơ"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2 === "Đau cơ"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Đau cơ")}
                  >
                    Đau cơ
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2 === "Mệt mỏi"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2 === "Mệt mỏi"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Mệt mỏi")}
                  >
                    Mệt mỏi
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question2 === "Mất vị giác hoặc khứu giác"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question2 === "Mất vị giác hoặc khứu giác"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion2("Mất vị giác hoặc khứu giác")}
                  >
                    Mất vị giác hoặc khứu giác
                  </Button>
                </Button.Group>
                <Input
                  rounded={"full"}
                  placeholder="Khác"
                  marginTop={5}
                  value={
                    question2 === "Sốt" ||
                    question2 === "Ho" ||
                    question2 === "Đau họng" ||
                    question2 === "Chảy nước mũi" ||
                    question2 === "Nghẹt mũi" ||
                    question2 === "Đau đầu" ||
                    question2 === "Đau cơ" ||
                    question2 === "Mệt mỏi" ||
                    question2 === "Mất vị giác hoặc khứu giác"
                      ? ""
                      : question2
                  }
                  onChangeText={(text) => setQuestion2(text)}
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
                  // value={question3}
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
                      question4 === "Khó ngủ"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4 === "Khó ngủ"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion4("Khó ngủ")}
                  >
                    Khó ngủ
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4 === "Mất tập trung"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4 === "Mất tập trung"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion4("Mất tập trung")}
                  >
                    Mất tập trung
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4 === "Giảm cân"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4 === "Giảm cân"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion4("Giảm cân")}
                  >
                    Giảm cân
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4 === "Yếu ớt"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4 === "Yếu ớt"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion4("Yếu ớt")}
                  >
                    Yếu ớt
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4 === "Khó chịu"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4 === "Khó chịu"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion4("Khó chịu")}
                  >
                    Khó chịu
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4 === "Lo lắng"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4 === "Lo lắng"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion4("Lo lắng")}
                  >
                    Lo lắng
                  </Button>
                  <Button
                    rounded={"full"}
                    marginY={1}
                    bg={
                      question4 === "Mất cảm giác ngon miệng"
                        ? Colors.primaryMintDark
                        : "light.50"
                    }
                    _text={
                      question4 === "Mất cảm giác ngon miệng"
                        ? { color: Colors.white }
                        : { color: Colors.primaryMintDark }
                    }
                    variant={"outline"}
                    borderColor={Colors.primaryMintDark}
                    onPress={() => setQuestion4("Mất cảm giác ngon miệng")}
                  >
                    Mất cảm giác ngon miệng
                  </Button>
                </Button.Group>
                <Input
                  rounded={"full"}
                  placeholder="Triệu chứng khác"
                  marginTop={2}
                  // value={question4}
                  onChangeText={(text) => setQuestion4(text)}
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
                <Input
                  rounded={"full"}
                  placeholder="Khác"
                  marginTop={2}
                  // value={question5}
                  onChangeText={(text) => setQuestion5(text)}
                />
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
                <Input
                  rounded={"full"}
                  placeholder="Khác"
                  marginTop={2}
                  // value={question6}
                  onChangeText={(text) => setQuestion6(text)}
                />
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
                <Input
                  rounded={"full"}
                  placeholder="Khác"
                  marginTop={2}
                  // value={question7}
                  onChangeText={(text) => setQuestion7(text)}
                />
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
          {/* {currentStep === 60 && question7 !== "" ? (
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
              onPress={() => navigation.navigate("Result")}
            >
              Kết thúc
            </Button>
          ) : (
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
      {/* <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Thoát khỏi chẩn đoán</AlertDialog.Header>
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

export default Chat;
