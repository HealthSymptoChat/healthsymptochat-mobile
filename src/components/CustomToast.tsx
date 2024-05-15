import {
  View,
  Text,
  Center,
  Button,
  Box,
  useToast,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Alert,
  Icon,
} from "native-base";
import React from "react";
import { Colors } from "../theme/Theme";
import { AntDesign } from "@expo/vector-icons";

interface CustomToastProps {
  state: "success" | "error" | "warning" | "info";
  message: string;
  onClose: () => void;
}
const CustomToast = (props: CustomToastProps) => {
  const toast = useToast();
  return (
    <Alert
      width="80%"
      alignSelf="center"
      flexDirection="row"
      status={
        props.state === "success"
          ? "success"
          : props.state === "error"
          ? "error"
          : props.state === "warning"
          ? "warning"
          : "info"
      }
      variant={"solid"}
    >
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Icon
              as={AntDesign}
              name={
                props.state === "success"
                  ? "checkcircle"
                  : props.state === "error"
                  ? "closecircle"
                  : props.state === "warning"
                  ? "exclamationcircle"
                  : "infocirlce"
              }
              color={"lightText"}
              size="5"
            />
            <Text
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={"lightText"}
            >
              {props.message}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            icon={<Icon as={AntDesign} name="close" />}
            _icon={{
              color: "lightText",
            }}
            size={"md"}
            onPress={() => {
              props.onClose();
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default CustomToast;
