import { View, Text, Image } from 'react-native'
import React, {useContext} from 'react'
import { UserContext } from "../../context/UserContext";

export default function HomeHeader() {
    const {user} = useContext(UserContext);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 60,
          height: 60,
          borderRadius: 90,
          borderWidth: 1,
        }}
      />
      <View>
        <Text>Hello, 👋</Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {user?.name}
        </Text>
      </View>
    </View>
  );
}