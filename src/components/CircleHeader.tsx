import { View, Text } from "native-base";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { Colors } from "../theme/Theme";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CircleHeader = () => {
  return (
    <View position={"absolute"} zIndex={1} height={150}>
      <View>
        <View style={{ backgroundColor: Colors.primaryMintDark, height: 70 }}>
          <Svg height={150} width={width + 5} viewBox="0 0 1440 115">
            <Path
              fill={Colors.primaryMintDark}
              d="M0,32L120,53.3C240,75,480,117,720,112C960,107,1200,53,1320,26.7L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

export default CircleHeader;
