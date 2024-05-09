import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Heading, Icon, Text, View } from "native-base";
import { Colors } from "../../theme/Theme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Profiles = ({ navigation }: any) => {
  return (
    // <SafeAreaView style={styles.container}>
    <View
      _dark={{
        bg: "dark.100",
      }}
      _light={{
        bg: "light.50",
      }}
      style={{ height: "100%", width: "100%", padding: 20 }}
    >
      <Heading size="md" style={{ marginBottom: 10 }}>
        Thông tin cá nhân
      </Heading>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("UserInfo")}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            as={AntDesign}
            name={"idcard"}
            size={5}
            color={Colors.primaryMintDark}
            marginRight={2}
          />
          <Text fontSize="sm">Thông tin cơ bản</Text>
        </View>
        <Icon
          as={AntDesign}
          name={"right"}
          size={5}
          color={Colors.primaryMintDark}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("HealthInfo")}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            as={AntDesign}
            name={"medicinebox"}
            size={5}
            color={Colors.primaryMintDark}
            marginRight={2}
          />
          <Text fontSize="sm">Thông tin sức khỏe</Text>
        </View>
        <Icon
          as={AntDesign}
          name={"right"}
          size={5}
          color={Colors.primaryMintDark}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("MedicationSchedule")}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            as={MaterialIcons}
            name={"medication"}
            size={5}
            color={Colors.primaryMintDark}
            marginRight={2}
          />
          <Text fontSize="sm">Lịch uống thuốc</Text>
        </View>
        <Icon
          as={AntDesign}
          name={"right"}
          size={5}
          color={Colors.primaryMintDark}
        />
      </TouchableOpacity>
      <Heading size="md" style={{ marginVertical: 10 }}>
        Hoạt động
      </Heading>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("HistoryDiagnostic")}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            as={MaterialIcons}
            name={"history"}
            size={5}
            color={Colors.primaryMintDark}
            marginRight={2}
          />
          <Text fontSize="sm">Lịch sử chẩn đoán</Text>
        </View>
        <Icon
          as={AntDesign}
          name={"right"}
          size={5}
          color={Colors.primaryMintDark}
        />
      </TouchableOpacity>
      <Heading size="md" style={{ marginVertical: 10 }}>
        Đăng ký
      </Heading>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Package")}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            as={MaterialIcons}
            name={"workspace-premium"}
            size={5}
            color={Colors.primaryMintDark}
            marginRight={2}
          />
          <Text fontSize="sm">Xem các gói nâng cao</Text>
        </View>
        <Icon
          as={AntDesign}
          name={"right"}
          size={5}
          color={Colors.primaryMintDark}
        />
      </TouchableOpacity>
    </View>
    // </SafeAreaView>
  );
};

export default Profiles;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 35,
  },
});
