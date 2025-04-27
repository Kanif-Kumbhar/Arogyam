import { View, Text, Animated, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import Slider from "@react-native-community/slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const activityLevels = [
  {
    label: "Sedentary",
    iconName: "bed-empty",
    iconColor: "#B0BEC5",
    sliderColor: "#B0BEC5",
  },
  {
    label: "Lightly Active",
    iconName: "walk",
    iconColor: "#FFB74D",
    sliderColor: "#FFB74D",
  },
  {
    label: "Moderately Active",
    iconName: "bike",
    iconColor: "#FFEB3B",
    sliderColor: "#FFEB3B",
  },
  {
    label: "Very Active",
    iconName: "run",
    iconColor: "#43A047",
    sliderColor: "#43A047",
  },
  {
    label: "Super Active",
    iconName: "dumbbell",
    iconColor: "#E64A19",
    sliderColor: "#E64A19",
  },
];

export default function ActivitySlider({ onChangeValue = () => {} }) {
  const [value, setValue] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const currentLevel = activityLevels[Math.round(value)];

  const sliderWidth = 300;
  const maxSliderValue = activityLevels.length - 1;
  const translateX = animatedValue.interpolate({
    inputRange: [0, maxSliderValue],
    outputRange: [0, sliderWidth - 50],
    extrapolate: "clamp",
  });

  const handleValueChange = (val) => {
    setValue(val);
    animatedValue.setValue(val);
    onChangeValue(activityLevels[Math.round(val)].label);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.badge, { transform: [{ translateX }] }]}>
        <MaterialCommunityIcons
          name={currentLevel.iconName}
          size={28}
          color={currentLevel.iconColor}
        />
        <Text style={styles.badgeText}>{currentLevel.label}</Text>
      </Animated.View>

      <Slider
        style={{ width: sliderWidth, marginTop: 30 }}
        minimumValue={0}
        maximumValue={maxSliderValue}
        value={value}
        onValueChange={handleValueChange}
        onSlidingComplete={handleValueChange}
        minimumTrackTintColor={currentLevel.sliderColor}
        maximumTrackTintColor="#CCCCCC"
        thumbTintColor={currentLevel.sliderColor}
        thumbTouchSize={{ width: 50, height: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -30,
    left: 0,
    backgroundColor: "white",
    padding: 6,
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  badgeText: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "500",
  },
});
