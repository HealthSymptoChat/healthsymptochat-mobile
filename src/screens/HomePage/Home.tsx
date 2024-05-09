import { View, Text } from "native-base";
import React from "react";

const Home = ({ navigation }: any) => {
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
      <Text>Home</Text>
    </View>
  );
};

export default Home;
