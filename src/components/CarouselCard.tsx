import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Easing,
  ViewToken,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../theme/Theme";
import { useColorMode, Text } from "native-base";

const { width, height } = Dimensions.get("screen");

const Pagination = ({
  data,
  scrollX,
}: {
  data: Array<Object>;
  scrollX: Animated.Value;
}) => {
  return (
    <View style={styles.pagination}>
      {data.map((_, idx) => {
        const dotWidth = scrollX.interpolate({
          inputRange: [width * (idx - 1), width * idx, width * (idx + 1)],
          outputRange: [12, 30, 12],
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
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

const SlideItem = ({ item }: any) => {
  return (
    <View style={styles.group}>
      <Animated.Image
        style={styles.image}
        source={item.image}
        resizeMode="contain"
      />
      <Text
        _light={{
          color: "dark.100",
        }}
        _dark={{
          color: "light.50",
        }}
        style={styles.title}
      >
        {item.title}
      </Text>
      <Text
        _light={{
          color: "dark.100",
        }}
        _dark={{
          color: "light.50",
        }}
        style={styles.description}
      >
        {item.description}
      </Text>
    </View>
  );
};

const CarouselCard = ({ data }: { data: Array<Object> }) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
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
  //   const viewabilityConfig = useRef({
  //     itemVisiblePercentThreshold: 50,
  //   }).current;
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

  const flatListRef = useRef<FlatList<any>>(null);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        // style={styles.flatList}
        data={data}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => handleOnScroll(e)}
        onViewableItemsChanged={handleOnViewableItemsChanged}
      />
      <Pagination data={data} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  flatList: {
    width: width,
    // height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  group: {
    width: width,
    marginTop: 20,
    height: height * 0.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    marginBottom: 20,
    width: 320,
    height: 250,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    textAlign: "center",
  },
  description: {
    width: 320,
    fontSize: 14,
    textAlign: "center",
  },
  pagination: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.grey,
    margin: 4,
  },
  dotActive: {
    backgroundColor: "primary.100",
  },
});
export default CarouselCard;
