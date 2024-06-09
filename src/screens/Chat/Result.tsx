import {
  View,
  Text,
  Image,
  IconButton,
  Icon,
  ScrollView,
  Pressable,
  PresenceTransition,
  Center,
  Modal,
  Button,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Colors } from "../../theme/Theme";
import { AntDesign, FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import { useBackHandler } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

const Result = ({ navigation, route }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { data } = route.params;

  const returnToChat = () => {
    navigation.navigate("Chat");
  };

  const returnToHome = () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "TabBar" }],
    // });
    navigation.navigate("TabBar");
  };

  const handleReChat = () => {
    returnToChat();
  };

  const handleSaveResult = () => {
    console.log(data);

    returnToHome();
  };

  useBackHandler(() => {
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
          onPress: () => navigation.navigate("TabBar"),
        },
      ]
    );

    return true;
  });
  return (
    // <View>
    <ScrollView width={"100%"}>
      <Image
        source={require("../../../assets/assessment.png")}
        alt="doctor"
        style={{ height: 300 }}
        resizeMode="contain"
        background={Colors.primaryMint}
      />
      <View
        _dark={{
          bg: "gray.900",
        }}
        _light={{
          bg: "gray.100",
        }}
        style={{
          width: "100%",
          height: "100%",
          padding: 20,
          borderStyle: "solid",
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          marginTop: -30,
        }}
      >
        <Text
          fontSize={20}
          marginBottom={10}
          fontWeight="bold"
          textAlign={"center"}
        >
          Kết quả
        </Text>

        <Pressable onPress={() => setIsOpened(!isOpened)}>
          {({ isPressed }) => {
            return (
              <View
                style={{
                  transform: [{ scale: isPressed ? 0.95 : 1 }],
                }}
                display={"flex"}
                flexDirection={"column"}
                bg={Colors.white}
                borderStyle={"solid"}
                borderRadius={"3xl"}
                shadow={6}
                padding={5}
              >
                <Text fontSize={22} textAlign={"center"} fontWeight={"bold"}>
                  Cảm cúm
                </Text>
                <Text fontSize={16} textAlign={"center"} marginTop={5}>
                  Bạn có triệu chứng cảm cúm, bạn cần nghỉ ngơi và uống nhiều
                  nước
                </Text>
              </View>
            );
          }}
        </Pressable>
        <Modal isOpen={isOpened} size={"md"} onClose={() => setIsOpened(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              <Text fontSize={20} fontWeight={"bold"}>
                Cảm cúm
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur
              </Text>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
            </Modal.Footer> */}
          </Modal.Content>
        </Modal>
        <View marginTop={10}>
          <Text fontSize={20} fontWeight="bold">
            Các khả năng khác
          </Text>
          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            marginTop={5}
          >
            <View
              width={"95%"}
              height={100}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              bg={Colors.white}
              borderStyle={"solid"}
              borderRadius={"3xl"}
              shadow={2}
            >
              <Image
                source={require("../../../assets/medicine.png")}
                resizeMode="cover"
                alt="doctor"
                width={"30%"}
                height={"100%"}
                rounded={"3xl"}
              />
              <View
                width={"70%"}
                display={"flex"}
                flexDirection={"column"}
                padding={5}
              >
                <Text fontSize={16} textAlign={"center"} fontWeight={"bold"}>
                  Cảm cúm
                </Text>
                <Text marginTop={5} color={Colors.primaryMintDark}>
                  Bạn cần nghỉ ngơi và uống nhiều nước
                </Text>
              </View>
            </View>
          </View>
          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            marginTop={5}
          >
            <View
              width={"95%"}
              height={100}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              bg={Colors.white}
              borderStyle={"solid"}
              borderRadius={"3xl"}
              shadow={2}
            >
              <Image
                source={require("../../../assets/medicine.png")}
                resizeMode="cover"
                alt="doctor"
                width={"30%"}
                height={"100%"}
                rounded={"3xl"}
              />
              <View
                width={"70%"}
                display={"flex"}
                flexDirection={"column"}
                padding={5}
              >
                <Text fontSize={16} textAlign={"center"} fontWeight={"bold"}>
                  Cảm cúm
                </Text>
                <Text marginTop={5} color={Colors.primaryMintDark}>
                  Bạn cần nghỉ ngơi và uống nhiều nước
                </Text>
              </View>
            </View>
          </View>
          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            marginTop={5}
          >
            <View
              width={"95%"}
              height={100}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              bg={Colors.white}
              borderStyle={"solid"}
              borderRadius={"3xl"}
              shadow={2}
            >
              <Image
                source={require("../../../assets/medicine.png")}
                resizeMode="cover"
                alt="doctor"
                width={"30%"}
                height={"100%"}
                rounded={"3xl"}
              />
              <View
                width={"70%"}
                display={"flex"}
                flexDirection={"column"}
                padding={5}
              >
                <Text fontSize={16} textAlign={"center"} fontWeight={"bold"}>
                  Cảm cúm
                </Text>
                <Text marginTop={5} color={Colors.primaryMintDark}>
                  Bạn cần nghỉ ngơi và uống nhiều nước
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          marginTop={10}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Button
            width={"48%"}
            variant={"outline"}
            borderColor={Colors.primaryMintDark}
            rounded={"full"}
            leftIcon={
              <Icon
                as={FontAwesome5}
                name="undo"
                size={"md"}
                color={Colors.primaryMintDark}
              />
            }
            onPress={handleReChat}
          >
            <Text
              color={Colors.primaryMintDark}
              fontSize={16}
              fontWeight={"medium"}
            >
              Chẩn đoán lại
            </Text>
          </Button>
          <Button
            width={"48%"}
            variant={"outline"}
            borderColor={Colors.primaryMintDark}
            rounded={"full"}
            rightIcon={
              <Icon
                as={FontAwesome6}
                name="download"
                size={"md"}
                color={Colors.primaryMintDark}
              />
            }
            onPress={handleSaveResult}
          >
            <Text
              color={Colors.primaryMintDark}
              fontSize={16}
              fontWeight={"medium"}
            >
              Lưu kết quả
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
    // </View>
  );
};

export default Result;
