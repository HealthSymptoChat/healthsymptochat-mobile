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
    title: "Chăm sóc sức khỏe mùa đông",
    description: "Chăm sóc sức khỏe mùa ...",
    image: "https://via.placeholder.com/320x196.png",
  },
  {
    title: "Chăm sóc sức khỏe mùa đông",
    description: "Chăm sóc sức khỏe mùa ...",
    image: "https://via.placeholder.com/320x196.png",
  },
  {
    title: "Chăm sóc sức khỏe mùa đông",
    description: "Chăm sóc sức khỏe mùa ...",
    image: "https://via.placeholder.com/320x196.png",
  },
  {
    title: "Chăm sóc sức khỏe mùa đông",
    description: "Chăm sóc sức khỏe mùa ...",
    image: "https://via.placeholder.com/320x196.png",
  },
];

const ads = [
  {
    title: "Giảm 40%",
    description: "Thuốc giảm đau",
    image: "https://via.placeholder.com/320x196.png",
  },
  {
    title: "Giảm 40%",
    description: "Thuốc giảm đau",
    image: "https://via.placeholder.com/320x196.png",
  },
  {
    title: "Giảm 40%",
    description: "Thuốc giảm đau",
    image: "https://via.placeholder.com/320x196.png",
  },
  {
    title: "Giảm 40%",
    description: "Thuốc giảm đau",
    image: "https://via.placeholder.com/320x196.png",
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
    }
  }, [focus]);

  const fetchUserInfo = () => {
    const user = authContext.authState?.user;
    setUsername(user?.firstName);
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
        <View padding={5}>
          <View>
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
                source={{
                  uri: "https://img.lovepik.com/free_png/28/84/14/15C58PICmdQ758PICAc4jCZ4g_PIC2018.png_860.png",
                }}
                alt="Healthy"
                size={150}
              />
            </View>
          </View>
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
                bg={Colors.primaryMint}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Image
                  width={"1/2"}
                  height={150}
                  alignSelf={"center"}
                  source={{
                    uri: item.item.image,
                  }}
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
              <View
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Text color={Colors.primaryMintDark}>Xem tất cả</Text>
                <Icon
                  as={AntDesign}
                  name="right"
                  size="md"
                  color={Colors.primaryMintDark}
                />
              </View>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              snapToInterval={320}
              data={data}
              renderItem={(item) => (
                <Pressable
                  w={300}
                  marginX={2}
                  // onPress={() => navigation.navigate("Package")}
                >
                  {({ isPressed }) => {
                    return (
                      <View
                        style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}
                      >
                        <Image
                          w={300}
                          h={170}
                          source={{
                            uri: item.item.image,
                          }}
                          rounded={"lg"}
                          alt="Healthy"
                          resizeMode="cover"
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
