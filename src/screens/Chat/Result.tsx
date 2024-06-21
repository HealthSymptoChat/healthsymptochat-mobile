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
  useToast,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../theme/Theme";
import { AntDesign, FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import { useBackHandler } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";
import { AxiosContext } from "../../context/AxiosContext";
import CustomToast from "../../components/CustomToast";

const Result = ({ navigation, route }: any) => {
  const data: DiagnosisProps = route.params.data;
  const { authAxios }: any = useContext(AxiosContext);
  const toast = useToast();

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

  const handleSaveResult = async () => {
    try {
      console.log(data);
      const response = await authAxios.post("/diagnose", data);
      if (response.data.message === "success") {
        toast.show({
          render: () => (
            <CustomToast
              message="Lưu kết quả thành công!"
              state="success"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      } else {
        console.log("Error", response.data.message);
        toast.show({
          render: () => (
            <CustomToast
              message="Lưu kết quả không thành công!"
              state="error"
              onClose={() => {
                toast.closeAll();
              }}
            />
          ),
        });
      }
      returnToHome();
    } catch (error) {
      console.log("Error", error);
    }
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
        <View
          display={"flex"}
          flexDirection={"column"}
          bg={Colors.white}
          borderStyle={"solid"}
          borderRadius={"3xl"}
          shadow={6}
          padding={5}
        >
          <Text fontSize={22} textAlign={"center"} fontWeight={"bold"}>
            {data.disease}
          </Text>
          <Text fontSize={16} textAlign={"center"} marginTop={5}>
            {data.description}
          </Text>
        </View>
        <View marginTop={10}>
          <Text fontSize={20} fontWeight="bold">
            Đề xuất điều trị
          </Text>
          {data.treatment?.length > 0 &&
            data.treatment?.map((treatment, index) => (
              <View
                key={index}
                marginTop={5}
                display={"flex"}
                flexDirection={"column"}
              >
                <View
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <Icon
                    as={FontAwesome6}
                    name={"check-circle"}
                    size={7}
                    color={Colors.primaryMintDark}
                    marginRight={2}
                  />
                  <Text width={"90%"} fontSize={16} fontWeight={"semibold"}>
                    {treatment}
                  </Text>
                </View>
              </View>
            ))}
        </View>
        <View marginTop={10}>
          <Text fontSize={20} fontWeight="bold">
            Các trường hợp khác
          </Text>
          {data.otherDiseases?.length > 0 &&
            data.otherDiseases?.map((disease, index) => (
              <View
                key={index}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                flexWrap={"wrap"}
                marginTop={5}
              >
                <View
                  width={"95%"}
                  // height={100}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  bg={Colors.white}
                  borderStyle={"solid"}
                  borderRadius={"3xl"}
                  shadow={2}
                  padding={5}
                >
                  <Text
                    fontSize={16}
                    textAlign={"center"}
                    fontWeight={"semibold"}
                  >
                    {disease.name}
                  </Text>
                  <Text marginTop={5}>{disease.description}</Text>
                </View>
              </View>
            ))}
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
