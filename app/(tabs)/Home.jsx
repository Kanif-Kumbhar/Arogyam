import { View, Text, FlatList, Animated, Easing } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "./../../context/UserContext";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/home/HomeHeader";
import TodayProgress from "../../components/home/TodayProgress";
import GenerateRecipeCard from "../../components/home/GenerateRecipeCard";
import TodaysMealPlan from "../../components/home/TodaysMealPlan";
import Scanner from "../../components/home/Scanner";

export default function Home() {
	const { user } = useContext(UserContext);
	const router = useRouter();

	const translateY = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (!user?.weight) {
			router.replace("/preferance");
		}
	}, [user]);

	const handleScroll = (event) => {
		const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
		const isBottom =
			layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

		Animated.timing(translateY, {
			toValue: isBottom ? 150 : 0,
			duration: 300,
			easing: Easing.out(Easing.ease),
			useNativeDriver: true,
		}).start();
	};

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={[]}
				renderItem={() => null}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				ListHeaderComponent={
					<View style={{ padding: 20 }}>
						<HomeHeader />
						<TodayProgress />
						<GenerateRecipeCard />
						<TodaysMealPlan />
					</View>
				}
			/>

			<Animated.View
				style={{
					position: "absolute",
					bottom: 5,
					right: 10,
					zIndex: 100,
					transform: [{ translateY }],
				}}
			>
				<Scanner />
			</Animated.View>
		</View>
	);
}
