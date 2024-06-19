import { View, Text, Divider, Icon, Heading, Pressable } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../../theme/Theme";
import { Dimensions } from "react-native";
import { Octicons, FontAwesome6 } from "@expo/vector-icons";
import { AxiosContext } from "../../../context/AxiosContext";
import { useIsFocused } from "@react-navigation/native";
import { ExtractTime, FormatDate } from "../../../utils/DateFormatter";
import UserAssessmentProps from "./UserAssessmentProps";

const { width, height } = Dimensions.get("window");

const AssessmentHistory = ({ navigation }: any) => {
  const { authAxios }: any = useContext(AxiosContext);
  const focus = useIsFocused();
  const [userAssessments, setUserAssessments] = useState<UserAssessmentProps[]>(
    []
  );

  const fetchUserAssessment = async () => {
    try {
      const response = await authAxios.get("/diagnose");
      if (response.data.message === "success") {
        setUserAssessments(response.data.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (focus) {
      fetchUserAssessment();
    }
  }, [focus]);
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
      {userAssessments.length > 0 ? (
        <View style={{ height: "100%", width: "100%", padding: 10 }}>
          <Divider
            position={"absolute"}
            orientation="vertical"
            bg={Colors.black}
            left={"24"}
          />
          <View
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-end"}
          >
            {/* Timeline list */}
            {userAssessments.map((assessment: UserAssessmentProps, index) => (
              <View
                key={index}
                w="full"
                marginY={5}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"flex-start"}
              >
                <Text
                  width={"10"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  marginRight={"9"}
                  marginTop={2}
                >
                  {FormatDate(assessment.createdDate.toString())}
                </Text>
                <Icon
                  as={Octicons}
                  name={"dot-fill"}
                  size={12}
                  color={Colors.primaryMintDark}
                />
                <Pressable
                  w={"2/3"}
                  onPress={() =>
                    navigation.navigate("AssessmentDetail", assessment)
                  }
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
                          {assessment.disease}
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
                            {ExtractTime(assessment.createdDate.toString())}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={{ height: "100%", width: "100%", padding: 10 }}>
          <Text
            fontSize={"md"}
            fontWeight={"bold"}
            marginRight={"8"}
            marginTop={2}
            alignSelf={"center"}
          >
            Không có dữ liệu
          </Text>
        </View>
      )}
    </View>
  );
};

export default AssessmentHistory;
