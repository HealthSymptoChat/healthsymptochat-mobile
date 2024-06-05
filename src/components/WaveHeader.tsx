import { View, Text } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { Path, Svg } from "react-native-svg";
import { Colors } from "../theme/Theme";

const { width, height } = Dimensions.get("window");

const WaveHeader = () => {
  return (
    <View position={"absolute"} zIndex={1} height={150}>
      <View>
        <View style={{ backgroundColor: Colors.primaryMintDark, height: 70 }}>
          <Svg height={150} width={width + 5} viewBox="0 0 1440 115">
            <Path
              fill={Colors.primaryMintDark}
              d="M0,64L34.3,101.3C68.6,139,137,213,206,245.3C274.3,277,343,267,411,229.3C480,192,549,128,617,96C685.7,64,754,64,823,106.7C891.4,149,960,235,1029,256C1097.1,277,1166,235,1234,208C1302.9,181,1371,171,1406,165.3L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

export default WaveHeader;
