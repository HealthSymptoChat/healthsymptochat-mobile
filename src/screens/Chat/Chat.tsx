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
} from "native-base";
import React, { useRef, useState } from "react";
import { Colors } from "../../theme/Theme";
import { AntDesign } from "@expo/vector-icons";
import { Path, Svg } from "react-native-svg";
import { Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Chat = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const slideAnimation = new Animated.Value(0);
  const [isOpen, setIsOpen] = useState(false);
  // const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

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

  const handleEscape = () => {
    setCurrentStep(0);
    setIsOpen(false);
    navigation.navigate("TabBar");
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
      <IconButton
        position={"absolute"}
        top={5}
        right={5}
        bg={Colors.primaryMint}
        rounded={"full"}
        zIndex={99}
        _pressed={{ bg: "coolGray.400" }}
        icon={<Icon as={AntDesign} name="close" color={Colors.white} />}
        onPress={() => setIsOpen(true)}
      />
      <View height={150}>
        <View>
          <View style={{ backgroundColor: Colors.primaryMintDark, height: 70 }}>
            <Svg height={150} width={width} viewBox="0 0 1440 115">
              <Path
                fill={Colors.primaryMintDark}
                d="M0,64L34.3,101.3C68.6,139,137,213,206,245.3C274.3,277,343,267,411,229.3C480,192,549,128,617,96C685.7,64,754,64,823,106.7C891.4,149,960,235,1029,256C1097.1,277,1166,235,1234,208C1302.9,181,1371,171,1406,165.3L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
              />
            </Svg>
          </View>
        </View>
      </View>
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
                Bạn bị triệu chứng gì?
              </Text>
              <Input placeholder="Nhập câu trả lời" rounded={"full"} />
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
                Bạn đã từng bị bệnh này chưa?
              </Text>
              <Button.Group
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-around"}
              >
                <Button
                  rounded={"full"}
                  variant={"outline"}
                  borderColor={Colors.primaryMintDark}
                >
                  Rồi
                </Button>
                <Button
                  rounded={"full"}
                  variant={"outline"}
                  borderColor={Colors.primaryMintDark}
                >
                  Chưa
                </Button>
              </Button.Group>
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
                Bạn đã bị bệnh này bao lâu rồi?
              </Text>
              <Button.Group
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-around"}
              >
                <Button
                  rounded={"full"}
                  variant={"outline"}
                  borderColor={Colors.primaryMintDark}
                >
                  Dưới 1 tuần
                </Button>
                <Button
                  rounded={"full"}
                  variant={"outline"}
                  borderColor={Colors.primaryMintDark}
                >
                  1-2 tuần
                </Button>
                <Button
                  rounded={"full"}
                  variant={"outline"}
                  borderColor={Colors.primaryMintDark}
                >
                  Trên 2 tuần
                </Button>
              </Button.Group>
            </Animated.View>
          )}
        </View>
        <View>
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
            {currentStep === 100 ? (
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
                onPress={() => alert("Finish")}
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
            )}
          </View>
          <Progress
            rounded={"full"}
            marginTop={3}
            size="sm"
            _filledTrack={{ bg: Colors.primaryMintDark }}
            value={currentStep}
          />
        </View>
      </View>
      <AlertDialog
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
      </AlertDialog>
    </View>
  );
};

export default Chat;
