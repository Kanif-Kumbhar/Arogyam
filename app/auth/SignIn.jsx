import { View, Text, Image } from "react-native";
import React from "react";

export default function SignIn() {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/logo2.png")}
        style={{
          width: 150,
          height: 150,
          marginTop: 60,
        }}
      />

      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Welcome Back
      </Text>
    </View>
  );
}
