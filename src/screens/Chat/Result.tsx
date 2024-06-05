import { View, Text, Image, IconButton, Icon } from "native-base";
import React, { useEffect } from "react";
import { Colors } from "../../theme/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useBackHandler } from "@react-native-community/hooks";

const Result = ({ navigation }: any) => {
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
  //     e.preventDefault();
  //     navigation.navigate("TabBar");
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  useBackHandler(() => {
    navigation.navigate("TabBar");
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
      <IconButton
        position={"absolute"}
        top={5}
        right={5}
        bg={Colors.primaryMintDark}
        rounded={"full"}
        zIndex={99}
        _pressed={{ bg: "coolGray.400" }}
        icon={<Icon as={AntDesign} name="close" color={Colors.white} />}
        onPress={() => navigation.navigate("TabBar")}
      />
      <Image
        source={require("../../../assets/assessment.png")}
        alt="doctor"
        width={"100%"}
        height={"30%"}
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
          // backgroundColor: "#f0f0f0",
          marginTop: -30,
        }}
      >
        <Text fontSize={20} fontWeight="bold" textAlign={"center"}>
          Result
        </Text>
      </View>
    </View>
  );
};

export default Result;
