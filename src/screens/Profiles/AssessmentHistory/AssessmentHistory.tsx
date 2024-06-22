import {
  View,
  Text,
  Divider,
  Icon,
  Heading,
  Pressable,
  Spinner,
  ScrollView,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../../theme/Theme";
import { Dimensions } from "react-native";
import { Octicons, FontAwesome6, AntDesign } from "@expo/vector-icons";
import { AxiosContext } from "../../../context/AxiosContext";
import {
  ExtractTime,
  FormatDateWithoutYear,
} from "../../../utils/DateFormatter";
import UserAssessmentProps from "./UserAssessmentProps";

const AssessmentHistory = ({ navigation }: any) => {
  const { authAxios }: any = useContext(AxiosContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userAssessments, setUserAssessments] = useState<UserAssessmentProps[]>(
    []
  );

  const fetchUserAssessment = async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get("/diagnose");
      if (response.data.message === "success") {
        setUserAssessments(response.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Error: ", response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchUserAssessment();
  }, []);

  if (isLoading) {
    return (
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
    );
  }
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
        <ScrollView style={{ height: "100%", width: "100%", padding: 10 }}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <Divider
            position={"absolute"}
            orientation="vertical"
            bg={Colors.black}
            left={"20"}
          />
          <View
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-end"}
          >
            {/* Timeline list */}
            {userAssessments
              .filter(
                (assessment: UserAssessmentProps) =>
                  assessment.createdDate !== null
              )
              .sort(
                (a, b) =>
                  new Date(b.createdDate).getTime() -
                  new Date(a.createdDate).getTime()
              )
              .map((assessment: UserAssessmentProps, index) => (
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
                    marginRight={"7"}
                    marginTop={2}
                  >
                    {FormatDateWithoutYear(assessment.createdDate.toString())}
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
          {/* </ScrollView> */}
        </ScrollView>
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            as={AntDesign}
            name="exclamationcircle"
            size={24}
            color={"orange.600"}
          />
          <Text fontSize="lg" textAlign="center">
            Không có dữ liệu
          </Text>
        </View>
      )}
    </View>
  );
};

export default AssessmentHistory;
