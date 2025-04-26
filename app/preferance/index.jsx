import { View, Text, StyleSheet, Touchable, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext } from "react";
import Colors from "../../shared/Colors";
import { CalculateCaloriesAI } from "../../services/AiModel";
import Input from "../../components/shared/Input";
import Button from "./../../components/shared/Button";
import {
  FemaleSymbolIcon,
  MaleSymbolIcon,
  WeightScaleIcon,
  PlusSignSquareIcon,
  Dumbbell01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UserContext } from "./../../context/UserContext";
import { useRouter } from "expo-router";
import Prompt from "../../shared/Prompt";

export default function Preferance() {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [gender, setGender] = useState();
  const [goal, setGoal] = useState();
  const UpdateUserPref = useMutation(api.Users.UpdateUserPref);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const onContinue = async () => {
    console.log("Clicked continue");

    if (!weight || !height || !gender || !goal) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in your weight, height, gender, and goal before continuing."
      );
      return;
    }

    const data = {
      uid: user?._id,
      height: parseFloat(height),
      weight: parseFloat(weight),
      gender: gender,
      goal: goal,
      age: 23,
    };

    const PROMPT = JSON.stringify(data) + Prompt.CALORIES_PROMPT;
    try {
      const AIResult = await CalculateCaloriesAI(PROMPT);
      const AIResponse = AIResult.choices[0].message.content;
      const JSONContent = JSON.parse(
        AIResponse.replace("```json", "").replace("```", "")
      );
      console.log(JSONContent);
    } catch (error) {
      console.log("Error in AI calculation:", error);
    }

    const result = await UpdateUserPref({
      ...data,
    });

    setUser((prev) => ({
      ...prev,
      ...data,
    }));

    router.replace("/(tabs)/Home");
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 26,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        Let's get to know you better
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: Colors.GRAY,
        }}
      >
        This helps us make a meal plan that suits you best
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Input
            placeholder={"eg. 70"}
            label="Weight (kg)"
            onChangeText={setWeight}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Input
            placeholder={"eg. 5.10"}
            label="Height (ft)"
            onChangeText={setHeight}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          Gender
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setGender("Male")}
            style={{
              borderWidth: gender == "Male" ? 2 : 1,
              padding: 15,
              borderColor: gender == "Male" ? Colors.PRIMARY : Colors.GRAY,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={MaleSymbolIcon}
              size={40}
              color={Colors.BLUE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender("Female")}
            style={{
              borderWidth: gender == "Female" ? 2 : 1,
              padding: 15,
              borderColor: gender == "Female" ? Colors.PRIMARY : Colors.GRAY,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={FemaleSymbolIcon}
              size={40}
              color={Colors.PINK}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text
          style={{
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          What's your fitness goal?
        </Text>
        <TouchableOpacity
          onPress={() => setGoal("Weight Loss")}
          style={[
            styles.goalContainer,
            {
              borderColor: goal == "Weight Loss" ? Colors.PRIMARY : Colors.GRAY,
              borderWidth: goal == "Weight Loss" ? 2 : 1,
            },
          ]}
        >
          <HugeiconsIcon icon={WeightScaleIcon} />
          <View>
            <Text style={styles.goalText}>Weight Loss</Text>
            <Text>Reduce body fat & get leaner</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGoal("Muscle Gain")}
          style={[
            styles.goalContainer,
            {
              borderColor: goal == "Muscle Gain" ? Colors.PRIMARY : Colors.GRAY,
              borderWidth: goal == "Muscle Gain" ? 2 : 1,
            },
          ]}
        >
          <HugeiconsIcon icon={Dumbbell01Icon} />
          <View>
            <Text style={styles.goalText}>Muscle Gain</Text>
            <Text>Build muscle & get stronger</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGoal("Weight Gain")}
          style={[
            styles.goalContainer,
            {
              borderColor: goal == "Weight Gain" ? Colors.PRIMARY : Colors.GRAY,
              borderWidth: goal == "Weight Gain" ? 2 : 1,
            },
          ]}
        >
          <HugeiconsIcon icon={PlusSignSquareIcon} />
          <View>
            <Text style={styles.goalText}>Weight Gain</Text>
            <Text>Increase healthy body mass</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 25 }}>
        <Button title="Continue" onPress={onContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalText:{
    fontSize: 20,
    fontWeight: "bold",
  },
  goalSubText:{
    color: Colors.GRAY,
  },
  goalContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 10,
  }
})
