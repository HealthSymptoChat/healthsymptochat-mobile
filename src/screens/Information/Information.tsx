import { SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Heading,
  Image,
  View,
  Text,
  Button,
  Pressable,
} from "native-base";
import { Colors } from "../../theme/Theme";

const data = [
  {
    id: 1,
    title: "Chăm sóc sức khỏe mùa mưa",
    date: "2024-06-01",
    description:
      "Mùa mưa là thời điểm các bệnh như cảm cúm, viêm họng, sốt xuất hiện nhiều nhất. Để phòng tránh, bạn cần chú ý đến cách chăm sóc sức khỏe mùa mưa.",
    image: require("../../../assets/rain.png"),
  },
  {
    id: 2,
    title: "Cảnh báo nắng nóng 'Kỷ Lục' mùa hè 2024",
    date: "2024-04-12",
    description:
      "Khi thời tiết khô, cơ thể dễ bị mất nước, gây ra nhiều vấn đề về sức khỏe. Để chăm sóc sức khỏe mùa khô, bạn cần chú ý đến việc uống nhiều nước, bổ sung vitamin và khoáng chất.",
    image: require("../../../assets/summer.png"),
  },
  {
    id: 3,
    title: "Cảnh báo gia tăng bệnh da liễu vào mùa hè",
    date: "2024-03-01",
    description:
      "Mùa hè là thời điểm cơ thể dễ bị nổi mụn, ngứa ngáy, viêm da. Để chăm sóc sức khỏe mùa hè, bạn cần chú ý ăn uống cân đối, giữ ấm cơ thể, tăng cường vận động.",
    image: require("../../../assets/fall.png"),
  },
  {
    id: 4,
    title: "Chăm sóc sức khỏe mùa đông",
    date: "2023-12-01",
    description:
      "Mùa đông là thời điểm cơ thể dễ bị cảm lạnh, cảm cúm, viêm họng. Để chăm sóc sức khỏe mùa đông, bạn cần chú ý ăn uống cân đối, giữ ấm cơ thể, tăng cường vận động.",
    image: require("../../../assets/winter.png"),
  },
];

const Information = () => {
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const toggleShowFullText = (id: number) => {
    setSelectedId(
      selectedId.includes(id)
        ? selectedId.filter((i) => i !== id)
        : [...selectedId, id]
    );
  };

  return (
    // <SafeAreaView style={styles.container}>
    <View
      _dark={{
        bg: "dark.100",
      }}
      _light={{
        bg: "light.50",
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <Heading size="md" marginBottom={10} marginLeft={5}>
        Thông tin
      </Heading>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            borderRadius={"xl"}
            padding={5}
            borderStyle={"solid"}
            borderWidth={1}
            marginX={2}
            marginY={3}
          >
            <View style={{ width: "70%" }}>
              <Heading size="sm" marginBottom={2} fontWeight={"bold"}>
                {item.title}
              </Heading>
              <Text
                fontSize={"sm"}
                marginBottom={2}
                color={Colors.primaryMintDark}
              >
                {item.date}
              </Text>
              <Text fontSize={"md"} fontWeight={"normal"}>
                {selectedId.includes(item.id)
                  ? item.description
                  : item.description.slice(0, 100)}
              </Text>
              {!selectedId.includes(item.id) && (
                <Pressable onPress={() => toggleShowFullText(item.id)}>
                  <Text color={Colors.primaryMintDark}>Read more</Text>
                </Pressable>
              )}
            </View>
            <View style={{ width: "20%" }}>
              <Image
                width={"100%"}
                borderRadius={"xl"}
                source={item.image}
                alt="Seasonal disease"
                size="sm"
                resizeMode="cover"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 35,
  },
});
