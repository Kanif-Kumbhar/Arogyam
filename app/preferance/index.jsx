import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useContext } from "react";
import Colors from "../../shared/Colors";
import { CalculateCaloriesAI } from "../../services/AiModel";
import Input from "../../components/shared/Input";
import Button from "./../../components/shared/Button";
import Loader from "./../../components/shared/Loader";
import ActivitySlider from "./../../components/shared/ActivitySlider";
import {
  FemaleSymbolIcon,
  MaleSymbolIcon,
  WeightScaleIcon,
  PlusSignSquareIcon,
  Dumbbell01Icon,
  VegetarianFoodFreeIcons,
  ChickenThighsFreeIcons,
  BroccoliFreeIcons,
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
  const [age, setAge] = useState();
  const [foodType, setFoodType] = useState();
  const [medicalCondition, setMedicalCondition] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const UpdateUserPref = useMutation(api.Users.UpdateUserPref);
  const CreateNutrition = useMutation(
    api.NutritionProfile.CreateNutritionProfile
  );
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const onContinue = async () => {
    console.log("Clicked continue");

    if (!weight || !height || !gender || !goal) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in your weight, height, gender, age and goal before continuing."
      );
      return;
    }
    console.log(activityLevel);

    setLoading(true);

    const data = {
      uid: user?._id,
      height: parseFloat(height),
      weight: parseFloat(weight),
      gender: gender,
      goal: goal,
      age: parseFloat(age),
      foodType: foodType,
      medicalCondition: medicalCondition,
      activityLevel: activityLevel,
    };

    const PROMPT = JSON.stringify(data) + Prompt.CALORIES_PROMPT;
    try {
      const AIResult = await CalculateCaloriesAI(PROMPT);
      const AIResponse = AIResult.choices[0].message.content;
      const JSONContent = JSON.parse(
        AIResponse.replace("```json", "").replace("```", "")
      );

      const result = await UpdateUserPref({
        ...data,
      });

      await CreateNutrition({
        userId: user._id,
        ...JSONContent,
      });
    } catch (error) {
      console.log("Error in AI calculation:", error);
    } finally {
      setLoading(false);
    }
    setUser((prev) => ({
      ...prev,
      ...data,
    }));

    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)/Home");
    }, 500);
  };

  const LoaderModal = ({ visible }) => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <Loader />
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
                backgroundColor:
                  gender == "Male" ? Colors.LIGHTBLUE : "transparent",
                backgroundOpacity: 0.4,
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
                backgroundColor:
                  gender == "Female" ? Colors.LIGHTPINK : "transparent",
                backgroundOpacity: 0.4,
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
              placeholder={"eg. 21"}
              label="Age (years)"
              onChangeText={setAge}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Input
              placeholder={"eg. Diabetes"}
              label="Medical Condition"
              onChangeText={setMedicalCondition}
            />
          </View>
        </View>

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
            <Text
              style={{
                fontWeight: 500,
                fontSize: 18,
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Activity Level
            </Text>
            <ActivitySlider onChangeValue={setActivityLevel} />
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
            Dietary Nature (आहार प्रकृति)
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setFoodType("Sativk")}
              onLongPress={() =>
                Alert.alert(
                  "Satvik (सात्त्विक)",
                  "A satvic diet is pure, fresh, and easy to digest. It calms the mind, boosts energy naturally, and promotes clarity. \n\nBenefits:\n" +
                    "• Improves digestion and gut health\n" +
                    "• Enhances mental calmness and focus\n" +
                    "• Supports overall vitality and immunity"
                )
              }
              style={{
                borderWidth: foodType == "Sativk" ? 2 : 1,
                padding: 15,
                borderColor:
                  foodType == "Sativk" ? Colors.DARKGOLDEN : Colors.GRAY,
                borderRadius: 10,
                flex: 1,
                alignItems: "center",
                backgroundColor:
                  foodType == "Sativk" ? Colors.LIGHTGOLDEN : "transparent",
                backgroundOpacity: 0.4,
              }}
            >
              <HugeiconsIcon
                icon={VegetarianFoodFreeIcons}
                size={40}
                color={foodType == "Sativk" ? Colors.DARKGOLDEN : Colors.GOLDEN}
              />

              <Text
                style={{
                  fontWeight: foodType == "Sativk" ? "bold" : "medium",
                  color:
                    foodType == "Sativk" ? Colors.DARKGOLDEN : Colors.GOLDEN,
                }}
              >
                Satvik
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFoodType("Rajsik")}
              onLongPress={() =>
                Alert.alert(
                  "Rajsik (राजसिक)",
                  "A rajsik diet is stimulating and energizing. It includes spicy, hot, and flavorful foods that boost metabolism and activity. \n\nBenefits:\n" +
                    "• Increases alertness and drive\n" +
                    "• Boosts metabolic rate\n" +
                    "• Fuels physical performance"
                )
              }
              style={{
                borderWidth: foodType == "Rajsik" ? 2 : 1,
                padding: 15,
                borderColor:
                  foodType == "Rajsik" ? Colors.DARKGREEN : Colors.GRAY,
                borderRadius: 10,
                flex: 1,
                alignItems: "center",
                backgroundColor:
                  foodType == "Rajsik" ? Colors.LIGHTGREEN : "transparent",
                backgroundOpacity: 0.4,
              }}
            >
              <HugeiconsIcon
                icon={BroccoliFreeIcons}
                size={40}
                color={foodType == "Rajsik" ? Colors.DARKGREEN : Colors.GREEN}
              />

              <Text
                style={{
                  fontWeight: foodType == "Rajsik" ? "bold" : "medium",
                  color: foodType == "Rajsik" ? Colors.DARKGREEN : Colors.GREEN,
                }}
              >
                Rajsik
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFoodType("Tamsik")}
              onLongPress={() =>
                Alert.alert(
                  "Tamsik (तामसिक)",
                  "A tamsik diet is heavy and grounding, often including meat and fermented foods. It provides deep nourishment and strength. \n\nBenefits:\n" +
                    "• Builds muscle and body mass\n" +
                    "• Provides sustained energy\n" +
                    "• Supports recovery and repair"
                )
              }
              style={{
                borderWidth: foodType == "Tamsik" ? 2 : 1,
                padding: 15,
                borderColor:
                  foodType == "Tamsik" ? Colors.DARKRED : Colors.GRAY,
                borderRadius: 10,
                flex: 1,
                alignItems: "center",
                backgroundColor:
                  foodType == "Tamsik" ? Colors.LIGHTRED : "transparent",
                backgroundOpacity: 0.4,
              }}
            >
              <HugeiconsIcon
                icon={ChickenThighsFreeIcons}
                size={40}
                color={foodType == "Tamsik" ? Colors.DARKRED : Colors.RED}
              />

              <Text
                style={{
                  fontWeight: foodType == "Tamsik" ? "bold" : "medium",
                  color: foodType == "Tamsik" ? Colors.DARKRED : Colors.RED,
                }}
              >
                Tamsik
              </Text>
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
                borderColor:
                  goal == "Weight Loss" ? Colors.PRIMARY : Colors.GRAY,
                borderWidth: goal == "Weight Loss" ? 2 : 1,
                backgroundColor:
                  goal == "Weight Loss" ? Colors.PRIMARY2 : "transparent",
                backgroundOpacity: 0.4,
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
                borderColor:
                  goal == "Muscle Gain" ? Colors.PRIMARY : Colors.GRAY,
                borderWidth: goal == "Muscle Gain" ? 2 : 1,
                backgroundColor:
                  goal == "Muscle Gain" ? Colors.PRIMARY2 : "transparent",
                backgroundOpacity: 0.4,
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
                borderColor:
                  goal == "Weight Gain" ? Colors.PRIMARY : Colors.GRAY,
                borderWidth: goal == "Weight Gain" ? 2 : 1,
                backgroundColor:
                  goal == "Weight Gain" ? Colors.PRIMARY2 : "transparent",
                backgroundOpacity: 0.4,
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
          <LoaderModal visible={loading} />
          <Button title="Continue" onPress={onContinue} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goalSubText: {
    color: Colors.GRAY,
  },
  goalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});
