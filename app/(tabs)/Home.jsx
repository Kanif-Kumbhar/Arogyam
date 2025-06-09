import {
	View,
	FlatList,
	Animated,
	Easing,
	Modal,
	StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./../../context/UserContext";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/home/HomeHeader";
import TodayProgress from "../../components/home/TodayProgress";
import GenerateRecipeCard from "../../components/home/GenerateRecipeCard";
import TodaysMealPlan from "../../components/home/TodaysMealPlan";
import Scanner from "../../components/home/Scanner";
import Loader from "../../components/shared/Loader";

export default function Home() {
	const { user } = useContext(UserContext);
	const router = useRouter();
	const translateY = useRef(new Animated.Value(0)).current;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (user && !user.weight) {
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

	const LoaderModal = ({ visible }) => (
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

	return (
		<View style={{ flex: 1 }}>
			<LoaderModal visible={loading} />

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

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "center",
		alignItems: "center",
	},
});
