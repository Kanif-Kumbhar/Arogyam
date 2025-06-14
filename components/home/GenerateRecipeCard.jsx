import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../shared/Colors";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { useRouter } from "expo-router";

export default function GenerateRecipeCard() {
	const router = useRouter();
	return (
		<LinearGradient
			colors={[Colors.BLUE, Colors.PRIMARY]}
			style={{
				marginTop: 15,
				padding: 15,
				borderRadius: 10,
				elevation: 5,
			}}
		>
			<Text
				style={{
					fontSize: 23,
					fontWeight: "bold",
					color: Colors.WHITE,
				}}
			>
				Need meal ideas?
			</Text>

			<Text
				style={{
					color: Colors.WHITE,
					fontSize: 18,
					opacity: 0.8,
					marginTop: 7,
				}}
			>
				Let our AI generate personalized recipes just for you.
			</Text>
			<TouchableOpacity
				onPress={() => router.push("/generate_ai_recipe")}
				style={{
					padding: 8,
					backgroundColor: Colors.WHITE,
					marginTop: 10,
					borderRadius: 10,
					width: 180,
					display: "flex",
					alignItems: "center",
					gap: 7,
					flexDirection: "row",
				}}
			>
				<Text
					style={{
						fontSize: 18,
						color: Colors.PRIMARY,
					}}
				>
					Generate with AI
				</Text>
				<HugeiconsIcon icon={ArrowRight02FreeIcons} color={Colors.PRIMARY} />
			</TouchableOpacity>
		</LinearGradient>
	);
}
