import { Dimensions, Text, View, Image } from "react-native";
import Colors from "../shared/Colors.jsx";
import Button from "../components/shared/Button.jsx";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("./../assets/images/splash-icon.png")}
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
        }}
      />
      <View
        style={{
          position: "absolute",
          height: Dimensions.get("screen").height,
          width: "100%",
          backgroundColor: "#0707075e",
          display: "flex",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("./../assets/images/logo2.png")}
          style={{
            width: 250,
            height: 250,
            marginTop: 100,
            tintColor: "#FFD700",
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: Colors.WHITE,
            fontWeight: "bold",
          }}
        >
          Arogyam
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: Colors.WHITE,
            marginHorizontal: 20,
            marginTop: 15,
            opacity: 0.8,
          }}
        >
          Ahar Se Arogya Tak
        </Text>
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: 25,
            padding: 20,
            marginBottom: 40,
          }}
        >
          <Button
            title={"Get Started"}
            onPress={() => router.push("/auth/SignIn")}
          />
        </View>
      </View>
    </View>
  );
}
