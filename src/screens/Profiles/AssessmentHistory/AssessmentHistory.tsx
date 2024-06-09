import { View, Text, Divider, Icon, Heading, Pressable } from "native-base";
import React from "react";
import { Colors } from "../../../theme/Theme";
import { Dimensions } from "react-native";
import { Octicons, FontAwesome6 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const AssessmentHistory = ({ navigation }: any) => {
  return (
    <View
      _dark={{
        bg: "dark.100",
      }}
      _light={{
        bg: "light.50",
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <View style={{ height: "100%", width: "100%", padding: 10 }}>
        <Divider
          position={"absolute"}
          orientation="vertical"
          bg={Colors.black}
          left={"24"}
        />
        <View display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
          {/* Timeline list */}
          <View
            w="full"
            marginY={5}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"flex-start"}
          >
            <Text
              fontSize={"md"}
              fontWeight={"bold"}
              marginRight={"8"}
              marginTop={2}
            >
              12/05
            </Text>
            <Icon
              as={Octicons}
              name={"dot-fill"}
              size={12}
              color={Colors.primaryMintDark}
            />
            <Pressable
              w={"2/3"}
              onPress={() => navigation.navigate("AssessmentDetail")}
            >
              {({ isPressed }) => {
                return (
                  <View
                    // _light={{
                    //   bg: "dark.100",
                    // }}
                    // _dark={{
                    //   bg: "light.50",
                    // }}
                    bg={isPressed ? Colors.grey : Colors.white}
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}
                    padding={5}
                    shadow={6}
                    borderRadius={20}
                  >
                    <Heading
                      _dark={{
                        color: "dark.100",
                      }}
                      //   _light={{
                      //     color: "light.50",
                      //   }}
                      fontSize={"lg"}
                      fontWeight={"bold"}
                    >
                      Cảm cúm
                    </Heading>
                    <View
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <Icon
                        _dark={{
                          color: "dark.100",
                        }}
                        // _light={{
                        //   color: "light.50",
                        // }}
                        as={FontAwesome6}
                        name={"clock"}
                        size={5}
                      />
                      <Text
                        _dark={{
                          color: "dark.100",
                        }}
                        // _light={{
                        //   color: "light.50",
                        // }}
                        marginLeft={2}
                        fontSize={"sm"}
                      >
                        12:30
                      </Text>
                    </View>
                  </View>
                );
              }}
            </Pressable>
          </View>
        </View>
      </View>
      {/* <View style={{ height: "100%", width: "100%", padding: 10 }}>
        <Text
          fontSize={"md"}
          fontWeight={"bold"}
          marginRight={"8"}
          marginTop={2}
          alignSelf={"center"}
        >
          Không có dữ liệu
        </Text>
      </View> */}
    </View>
  );
};

export default AssessmentHistory;
