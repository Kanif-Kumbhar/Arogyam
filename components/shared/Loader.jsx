import React from "react";
import { StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";

export default function SimpleLottie() {
  return (
    <View>
      <LottieView
        source={require("../../assets/animation/loader.json")}
        style={styles.animation}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});
