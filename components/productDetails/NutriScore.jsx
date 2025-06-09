import {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Modal,
	Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "./../../shared/Colors";
import { InformationCircleFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";

const NUTRI_COLORS = {
	A: "#3AD29F",
	B: "#A0D911",
	C: "#FADB14",
	D: "#FA8C16",
	E: "#F5222D",
};

export default function NutriScore({ grade = "C" }) {
	const scale = useRef(new Animated.Value(1)).current;
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		Animated.spring(scale, {
			toValue: 1.2,
			friction: 4,
			useNativeDriver: true,
		}).start();
	}, [grade]);

	const grades = ["A", "B", "C", "D", "E"];

	return (
		<View
			style={{
				padding: 15,
				backgroundColor: Colors.WHITE,
				borderRadius: 10,
			}}
		>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
					}}
				>
					Nutriscore
				</Text>
				<Modal
					visible={visible}
					transparent
					animationType="fade"
					onRequestClose={() => setVisible(false)}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: "rgba(0,0,0,0.4)",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View
							style={{
								backgroundColor: "white",
								padding: 20,
								borderRadius: 10,
								width: "85%",
							}}
						>
							<Text style={{ textAlign: "justify", fontSize: 16 }}>
								Nutri-Score rates food from A (healthiest) to E (least healthy):
								{"\n\n"}
								🟢 A – Excellent: High in fiber, fruits, and vegetables; low in
								sugar and saturated fats. Ideal for daily consumption.{"\n\n"}
								🟢 B – Good: Generally healthy with moderate levels of less
								desirable nutrients.{"\n\n"}
								🟡 C – Moderate: Balanced but may have noticeable sugar, salt,
								or fat. Eat in moderation.{"\n\n"}
								🟠 D – Poor: High in calories, sugar, or salt. Limit intake.
								{"\n\n"}
								🔴 E – Very Poor: Ultra-processed or high in unhealthy
								ingredients. Occasional consumption only.
							</Text>
							<Pressable
								onPress={() => setVisible(false)}
								style={{ marginTop: 20, alignSelf: "flex-end" }}
							>
								<Text style={{ color: "blue" }}>Close</Text>
							</Pressable>
						</View>
					</View>
				</Modal>
				<TouchableOpacity onPress={() => setVisible(true)}>
					<HugeiconsIcon icon={InformationCircleFreeIcons} />
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
				{grades.map((g) => (
					<Animated.View
						key={g}
						style={[
							styles.block,
							{
								backgroundColor: NUTRI_COLORS[g],
								transform: [{ scale: grade === g ? scale : 1 }],
								opacity: grade === g ? 1 : 0.5,
							},
						]}
					>
						<Text style={styles.text}>{g}</Text>
					</Animated.View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "flex-end",
		marginVertical: 20,
	},
	block: {
		width: 50,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 6,
		marginHorizontal: 4,
	},
	text: {
		color: 'black',
		fontWeight: "bold",
	},
});
