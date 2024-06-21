import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Modal,
  Icon,
  Button,
} from "native-base";
import { useEffect, useState } from "react";
import { Colors } from "../../../theme/Theme";
import UserAssessmentProps from "./UserAssessmentProps";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

const AssessmentDetail = ({ navigation, route }: any) => {
  const assessment: UserAssessmentProps = route.params;
  return (
    <ScrollView width={"100%"}>
      <Image
        source={require("../../../../assets/assessment.png")}
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
            {assessment.disease}
          </Text>
          <Text fontSize={16} textAlign={"center"} marginTop={5}>
            {assessment.description}
          </Text>
        </View>
        <View marginTop={10}>
          <Text fontSize={20} fontWeight="bold">
            Đề xuất điều trị
          </Text>
          {assessment.treatment?.length > 0 &&
            assessment.treatment?.map((treatment, index) => (
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
            Các khả năng khác
          </Text>
          {assessment.otherDiseases?.length > 0 &&
            assessment.otherDiseases?.map((disease, index) => (
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
      </View>
    </ScrollView>
  );
};

export default AssessmentDetail;
