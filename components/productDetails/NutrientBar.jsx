import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Animated,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";
import Colors from "./../../shared/Colors";

const levelColors = {
	low: "#3AD29F",
	moderate: "#FADB14",
	high: "#F5222D",
};

const nutrientInfo = {
	Fat: {
		title: "What you need to know",
		description:
			"A high consumption of fat, especially saturated fats, can raise cholesterol, which increases the risk of heart diseases.",
		recommendations: [
			"Limit the consumption of fat and saturated fat",
			"Choose products with lower fat and saturated fat content",
		],
		source: "Source: National Health Service UK (NHS) - Fat: the facts",
	},
	"Saturated Fat": {
		title: "What you need to know",
		description:
			"A high consumption of fat, especially saturated fats, can raise cholesterol, which increases the risk of heart diseases.",
		recommendations: [
			"Limit the consumption of fat and saturated fat",
			"Choose products with lower fat and saturated fat content",
		],
		source: "Source: National Health Service UK (NHS) - Fat: the facts",
	},
	Sugars: {
		title: "What you need to know",
		description:
			"A high consumption of sugar can cause weight gain and tooth decay. It also augments the risk of type 2 diabetes and cardio-vascular diseases.",
		recommendations: [
			"Limit the consumption of sugar and sugary drinks",
			"Sugary drinks (such as sodas, fruit beverages, fruit juices, and nectars) should be limited as much as possible (no more than 1 glass a day)",
			"Choose products with lower sugar content",
			"Reduce the consumption of products with added sugars",
		],
		source: "Source: National Health Service UK (NHS) - Sugar: the facts",
	},
	Salt: {
		title: "What you need to know",
		description:
			"A high consumption of salt (or sodium) can cause raised blood pressure, which can increase the risk of heart disease and stroke. Many people who have high blood pressure do not know it, as there are often no symptoms. Most people consume too much salt (on average 9 to 12 grams per day), around twice the recommended maximum level of intake.",
		recommendations: [
			"Limit the consumption of salt and salted food",
			"Reduce the quantity of salt used when cooking, and don't salt again at the table",
			"Limit the consumption of salty snacks",
			"Choose products with lower salt content",
		],
		source:
			"Source: World Health Organization (WHO) - Fact sheet - Salt reduction\nSource: National Health Service UK (NHS) - Salt: the facts",
	},
};

const NutrientBar = ({ label, level, onLongPress }) => {
	return (
		<View style={styles.row}>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity
				style={[
					styles.bar,
					{ backgroundColor: levelColors[level?.toLowerCase()] || "#ccc" },
				]}
				onLongPress={() => onLongPress(label)}
			>
				<Text style={styles.level}>{level?.toUpperCase() || "N/A"}</Text>
			</TouchableOpacity>
		</View>
	);
};

const NutrientLevels = ({ levels }) => {
	const [visible, setVisible] = useState(false);
	const [selectedNutrient, setSelectedNutrient] = useState(null);
	const [fadeAnim] = useState(new Animated.Value(0));

	const openModal = (label) => {
		setSelectedNutrient(label);
		setVisible(true);
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	const closeModal = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			setVisible(false);
			setSelectedNutrient(null);
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Nutrient Levels</Text>
			<NutrientBar label="Fat" level={levels?.fat} onLongPress={openModal} />
			<NutrientBar
				label="Saturated Fat"
				level={levels?.["saturated-fat"]}
				onLongPress={openModal}
			/>
			<NutrientBar
				label="Sugars"
				level={levels?.sugars}
				onLongPress={openModal}
			/>
			<NutrientBar label="Salt" level={levels?.salt} onLongPress={openModal} />

			<Modal
				visible={visible}
				transparent
				animationType="slide"
				onRequestClose={closeModal}
			>
				<TouchableWithoutFeedback onPress={closeModal}>
					<View style={styles.overlay}>
						<Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
							<ScrollView>
								<Text style={styles.modalTitle}>
									{nutrientInfo[selectedNutrient]?.title}
								</Text>
								<Text style={styles.modalText}>
									{nutrientInfo[selectedNutrient]?.description}
								</Text>

								<Text style={[styles.modalTitle, { marginTop: 15 }]}>
									Recommendation:
								</Text>
								{nutrientInfo[selectedNutrient]?.recommendations.map(
									(rec, i) => (
										<Text key={i} style={styles.bulletPoint}>
											{"\u2022"} {rec}
										</Text>
									)
								)}

								<Text style={[styles.modalText, { marginTop: 15 }]}>
									{nutrientInfo[selectedNutrient]?.source}
								</Text>
							</ScrollView>
						</Animated.View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

export default NutrientLevels;

const styles = StyleSheet.create({
	container: {
		marginTop: 15,
		padding: 15,
		backgroundColor: Colors.WHITE,
		borderRadius: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 6,
	},
	label: {
		width: 120,
		fontSize: 16,
	},
	bar: {
		flex: 1,
		padding: 8,
		borderRadius: 6,
		alignItems: "center",
	},
	level: {
		fontWeight: "bold",
		color: "#fff",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	modal: {
		width: "100%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalText: {
		textAlign: "justify",
		fontSize: 15,
		marginBottom: 10,
	},
	bulletPoint: {
		fontSize: 15,
		marginLeft: 10,
		marginBottom: 5,
		textAlign: "justify",
	},
});
