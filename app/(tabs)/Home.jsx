import { View, Text } from 'react-native'
import React, { useContext, useEffect } from "react";
import { UserContext } from "./../../context/UserContext";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/home/HomeHeader";
import TodayProgress from "../../components/home/TodayProgress";
import GenerateRecipeCard from "../../components/home/GenerateRecipeCard";
import TodaysMealPlan from "../../components/home/TodaysMealPlan";

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!user?.weight) {
      router.replace("/preferance");
    }
  }, [user]);
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <HomeHeader />
      <TodayProgress />
      <GenerateRecipeCard />
      <TodaysMealPlan />
    </View>
  );
}