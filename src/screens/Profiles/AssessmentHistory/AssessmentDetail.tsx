import { View, Text, ScrollView, Image, Pressable, Modal } from "native-base";
import { useState } from "react";
import { Colors } from "../../../theme/Theme";

const AssessmentDetail = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
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
                source={require("../../../../assets/medicine.png")}
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
                source={require("../../../../assets/medicine.png")}
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
                source={require("../../../../assets/medicine.png")}
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
      </View>
    </ScrollView>
  );
};

export default AssessmentDetail;
