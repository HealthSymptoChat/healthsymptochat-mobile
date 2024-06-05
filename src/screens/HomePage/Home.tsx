import {
  View,
  Text,
  Heading,
  Button,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  IconButton,
  Icon,
  Box,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../../theme/Theme";
import { Animated, Dimensions, ViewToken } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const data = [
  {
    title: "Chăm sóc sức khỏe mùa mưa",
    description: "Chăm sóc sức khỏe mùa ...",
    image: require("../../../assets/rain.png"),
  },
  {
    title: "Chăm sóc sức khỏe mùa mưa",
    description: "Chăm sóc sức khỏe mùa ...",
    image: require("../../../assets/summer.png"),
  },
  {
    title: "Chăm sóc sức khỏe mùa mưa",
    description: "Chăm sóc sức khỏe mùa ...",
    image: require("../../../assets/fall.png"),
  },
  {
    title: "Chăm sóc sức khỏe mùa mưa",
    description: "Chăm sóc sức khỏe mùa ...",
    image: require("../../../assets/winter.png"),
  },
];

const ads = [
  {
    title: "Giảm 40%",
    description: "Probiotics",
    image: require("../../../assets/medicine.png"),
  },
  {
    title: "Giảm 40%",
    description: "Probiotics",
    image: require("../../../assets/medicine1.png"),
  },
  {
    title: "Giảm 40%",
    description: "Probiotics",
    image: require("../../../assets/medicine.png"),
  },
  {
    title: "Giảm 40%",
    description: "Probiotics",
    image: require("../../../assets/medicine1.png"),
  },
];

const Pagination = ({
  data,
  scrollX,
}: {
  data: Array<Object>;
  scrollX: Animated.Value;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      {data.map((_, idx) => {
        const dotWidth = scrollX.interpolate({
          inputRange: [width * (idx - 1), width * idx, width * (idx + 1)],
          outputRange: [8, 18, 8],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange: [width * (idx - 1), width * idx, width * (idx + 1)],
          outputRange: [Colors.grey, Colors.primaryMint, Colors.grey],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={idx}
            style={[
              {
                width: 8,
                height: 8,
                borderRadius: 6,
                backgroundColor: Colors.grey,
                margin: 2,
              },
              { width: dotWidth, backgroundColor },
            ]}
          />
        );
      })}
    </View>
  );
};

const Home = ({ navigation }: any) => {
  const focus = useIsFocused();
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<any>(null);
  const { authAxios }: any = useContext(AxiosContext);
  const authContext: any = useContext(AuthContext);
  const [username, setUsername] = React.useState<string>("");
  const [patientHistory, setPatientHistory] = React.useState<Object>({});

  const handleOnScroll = (e: any) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(e);
  };
  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems && viewableItems.length > 0) {
        setIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = (index + 1) % data.length;
      setIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [index]);
  useEffect(() => {
    if (focus) {
      fetchUserInfo();
      fetchPatientHistory();
    }
  }, [focus]);

  const fetchUserInfo = async () => {
    // const user = authContext.authState?.user;
    try {
      const user = await authAxios.get("/user/me");
      if (user.data.message === "success") {
        const expirePackage: Date = user.data?.data.expirePackages;
        const packageId = user.data?.data.packageId;
        if (expirePackage && packageId) {
          if (new Date() > expirePackage) {
            const userPackage = await authAxios.post("/user/resetPackageId");
            if (userPackage.data?.message === "success") {
              console.log("Reset package to null success");
              authContext.setAuthState({
                ...authContext.authState,
                user: userPackage.data.data,
              });
              setUsername(userPackage.data?.data.firstName);
            } else {
              console.log("Reset package to null failed");
            }
          }
        } else {
          console.log("Empty package");
          setUsername(user.data?.data.firstName);
        }
      }
    } catch (error: Error | any) {
      console.log("Error loading user", error);
    }
  };

  const fetchPatientHistory = async () => {
    try {
      const res = await authAxios.get("/patient/getPatientByUserId");
      if (res.data.message === "success") {
        setPatientHistory(res.data?.data || {});
      } else {
        console.log("Empty patient history");
        setPatientHistory({});
      }
    } catch (error: Error | any) {
      console.log("Error loading patient history", error);
      setPatientHistory({});
    }
  };

  const handleCheckUserCondition = async () => {
    // have > 10 assetsent or create account > 10 days
    const user = authContext.authState?.user;
    const packageId = user?.packageId;
    const expirePackage = user?.expirePackages;

    // check if user fill in health info
    if (Object.keys(patientHistory).length === 0) {
      navigation.navigate("HealthInfoInput");
    } else {
      navigation.navigate("Chat");
    }
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
        // paddingHorizontal: 15,
        // padding: 15,
      }}
      // bg={"cyan.50"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          bg={Colors.primaryMint}
          width={"170%"}
          height={260}
          borderBottomRadius={"full"}
          // position={"absolute"}
          // top={0}
          left={"-35%"}
        >
          <View
            width={"40%"}
            height={160}
            position={"relative"}
            top={10}
            left={"23%"}
          >
            <View width={"70%"} p={2} bg={Colors.white} borderRadius={"3xl"}>
              <Heading fontSize={"lg"}>Chào {username || "bạn"} !</Heading>
              <Text fontStyle={"normal"} color={"gray.500"}>
                Hôm nay bạn cảm thấy thế nào?
              </Text>
            </View>
          </View>
          <View
            position={"relative"}
            bottom={"24"}
            left={"48%"}
            width={10}
            height={10}
            zIndex={-2}
            borderStyle={"solid"}
            borderLeftWidth={30}
            borderBottomWidth={30}
            borderLeftColor={"transparent"}
            borderRightColor={"transparent"}
            borderBottomColor={Colors.white}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
          <Image
            alignSelf={"center"}
            source={require("../../../assets/welcome1.png")}
            alt="Healthy"
            position={"relative"}
            top={-170}
            right={-130}
            size={200}
            // zIndex={1}
            resizeMode="contain"
          />
          <View
            width={"40%"}
            height={160}
            position={"relative"}
            top={"-100%"}
            left={"23%"}
          >
            <View width={"70%"} p={2} bg={Colors.white} borderRadius={"3xl"}>
              <Text fontSize={"lg"} fontWeight={"semibold"}>
                Đánh giá tình hình sức khỏe của bạn
              </Text>
            </View>
          </View>
          <View
            position={"relative"}
            bottom={"153%"}
            left={"48%"}
            width={10}
            height={10}
            zIndex={-2}
            borderStyle={"solid"}
            borderLeftWidth={30}
            borderBottomWidth={30}
            borderLeftColor={"transparent"}
            borderRightColor={"transparent"}
            borderBottomColor={Colors.white}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </View>
        <Button
          width={"80%"}
          alignSelf={"center"}
          marginTop={5}
          rounded={"full"}
          variant={"outline"}
          borderColor={Colors.primaryMintDark}
          _text={{ fontWeight: "bold", fontSize: "lg" }}
          onPress={() => handleCheckUserCondition()}
          leftIcon={
            <Image
              source={require("../../../assets/Logo_no_text.png")}
              alt="Chat"
              size={7}
              resizeMode="contain"
            />
          }
        >
          Chẩn đoán ngay
        </Button>
        <View padding={5}>
          {/* <View>
            <Heading fontSize={"lg"}>Chào {username}!</Heading>
            <Text fontStyle={"normal"} color={"gray.500"}>
              {" "}
              Hôm nay bạn cảm thấy thế nào?
            </Text>
          </View>
          <View
            marginTop={20}
            borderRadius={"3xl"}
            borderStyle={"dashed"}
            padding={4}
            bg={Colors.primaryMint}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <View w={"1/3"}>
              <Text fontSize={"lg"}>Đánh giá tình hình sức khỏe của bạn</Text>
              <Button
                marginTop={2}
                rounded={"full"}
                bg={"blue.900"}
                _text={{ fontWeight: "bold" }}
                // onPress={() => navigation.navigate("Assessment")}
              >
                Chẩn đoán
              </Button>
            </View>
            <View w={"2/3"}>
              <Image
                alignSelf={"center"}
                source={require("../../../assets/welcome1.png")}
                alt="Healthy"
                position={"absolute"}
                bottom={"-60"}
                right={-10}
                size={250}
                resizeMode="contain"
              />
            </View>
          </View> */}
          <FlatList
            scrollEnabled={false}
            ref={flatListRef}
            borderRadius={"3xl"}
            borderStyle={"dashed"}
            marginTop={5}
            width={width - 40}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={width - 40}
            data={ads}
            renderItem={(item) => (
              // <View paddingX={6}>
              <View
                width={width - 50}
                marginX={2}
                borderRadius={"3xl"}
                borderStyle={"dashed"}
                bg={Colors.grey}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Image
                  width={"1/2"}
                  height={150}
                  alignSelf={"center"}
                  source={item.item.image}
                  roundedLeft={"3xl"}
                  alt="Healthy"
                  resizeMode="cover"
                />
                <View paddingX={3} w={"1/2"}>
                  <Heading fontSize={"xl"}>{item.item.title}</Heading>
                  <Text fontStyle={"normal"}>{item.item.description}</Text>
                  <Button
                    marginTop={2}
                    rounded={"full"}
                    bg={"blue.500"}
                    _text={{ fontWeight: "bold" }}
                    // onPress={() => navigation.navigate("Assessment")}
                  >
                    Mua ngay
                  </Button>
                </View>
              </View>
              // </View>
            )}
            onScroll={(e) => handleOnScroll(e)}
            onViewableItemsChanged={handleOnViewableItemsChanged}
          />
          <Pagination data={ads} scrollX={scrollX} />
          <View marginTop={5}>
            <View
              marginBottom={5}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Heading fontSize={"lg"}>Thông tin các bệnh theo mùa</Heading>
              <Pressable
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                onPress={() => navigation.navigate("Information")}
              >
                <Text color={Colors.primaryMintDark}>Xem tất cả</Text>
                <Icon
                  as={AntDesign}
                  name="right"
                  size="md"
                  color={Colors.primaryMintDark}
                />
              </Pressable>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              snapToInterval={320}
              data={data}
              renderItem={(item) => (
                <Pressable w={300} marginX={2}>
                  {({ isPressed }) => {
                    return (
                      <View
                        style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
                      >
                        <Image
                          width={300}
                          height={170}
                          source={item.item.image}
                          rounded={"lg"}
                          alt="Healthy"
                          resizeMode="contain"
                        />
                        <Text fontWeight={"semibold"} fontSize="lg">
                          {item.item.title}
                        </Text>
                        <Text fontStyle={"normal"} color={"gray.500"}>
                          {item.item.description}
                        </Text>
                      </View>
                    );
                  }}
                </Pressable>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
