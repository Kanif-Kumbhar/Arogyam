import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Modal,
	StyleSheet,
} from "react-native";
import ADDITIVE_INFO from "../../shared/AdditiveInfo";
import Colors from "./../../shared/Colors";

export default function ProductInfo({ additives, ingredients }) {
	const [selectedAdditive, setSelectedAdditive] = useState(null);

	const containsPalmOil = ingredients?.some((ing) =>
		ing.text?.toLowerCase().includes("palm oil")
	);

	const renderAdditive = ({ item }) => {
		const code = item.replace("en:", "").toUpperCase();
		return (
			<TouchableOpacity
				style={styles.additiveItem}
				onPress={() => setSelectedAdditive(code)}
			>
				<Text style={styles.additiveText}>{code}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.row}>
			{containsPalmOil && (
				<View style={[styles.additiveItem, styles.palmOilItem]}>
					<Text style={styles.additiveText}>PALM OIL</Text>
				</View>
			)}

			<FlatList
				data={additives}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, idx) => item + idx}
				renderItem={renderAdditive}
			/>

			<Modal
				visible={!!selectedAdditive}
				animationType="slide"
				transparent
				onRequestClose={() => setSelectedAdditive(null)}
			>
				<View style={styles.modalBackground}>
					<View style={styles.modalContent}>
						{selectedAdditive && ADDITIVE_INFO[selectedAdditive] ? (
							<>
								<Text style={styles.modalTitle}>
									{ADDITIVE_INFO[selectedAdditive].name}
								</Text>
								{ADDITIVE_INFO[selectedAdditive].description && (
									<Text style={styles.modalDesc}>
										{ADDITIVE_INFO[selectedAdditive].description}
									</Text>
								)}
								<Text style={styles.modalHarmTitle}>Harm / Safety:</Text>
								<Text style={styles.modalHarm}>
									{ADDITIVE_INFO[selectedAdditive].harm}
								</Text>
							</>
						) : (
							<Text>No information available for {selectedAdditive}</Text>
						)}

						<TouchableOpacity
							onPress={() => setSelectedAdditive(null)}
							style={styles.closeButton}
						>
							<Text style={{ color: "white" }}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingVertical: 10,
	},
	additiveItem: {
		backgroundColor: Colors.PRIMARY2,
		borderWidth: 0.5,
		borderRadius: 25,
        borderColor: Colors.PRIMARY,
		padding: 10,
		marginRight: 6,
		marginBottom: 6,
	},
	additiveText: {
		fontSize: 8,
		fontWeight: "bold",
		color: "#333",
	},
	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		padding: 20,
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 20,
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalDesc: {
		fontSize: 16,
		marginBottom: 10,
	},
	modalHarmTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	modalHarm: {
		fontSize: 14,
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: "#8837FF",
		borderRadius: 8,
		padding: 10,
		alignItems: "center",
	},
	palmOilItem: {
		backgroundColor: "#FFCCCB",
		borderColor: "#FF4444",
	},
});
