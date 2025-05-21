import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	Image,
	FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import NutriScore from "../../components/productDetails/NutriScore";
import NutrientBar from "../../components/productDetails/NutrientBar";
import IngredientChart from "../../components/productDetails/IngredientChart";
import NutritionRadarChart from "../../components/productDetails/NutritionRadarChart";
import ProductInfo from "../../components/productDetails/ProductInfo";
import { SpoonFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import Colors from "../../shared/Colors";

export default function ProductDetails() {
	const { code } = useLocalSearchParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [ingredients, setIngredients] = useState([]);
	const [nutriments, setNutriments] = useState(null);

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await fetch(
					`https://world.openfoodfacts.org/api/v2/product/${8901719125478}`
				);
				const json = await response.json();
				if (json.status === 1) {
					setProduct(json.product);
					setIngredients(json.product.ingredients || []);
					setNutriments(json.product.nutriments || null);
				} else {
					setError("Product not found.");
				}
			} catch (err) {
				setError("Error fetching product data.");
			} finally {
				setLoading(false);
			}
		};

		if (code) {
			fetchProductDetails();
		}
	}, [code]);

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" />
				<Text>Loading product details...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.center}>
				<Text style={{ color: "red" }}>{error}</Text>
			</View>
		);
	}

	const getSugarSpoons = () => {
		if (nutriments?.sugars_100g) {
			const grams = nutriments.sugars_100g;
			const spoons = grams / 4;
			return spoons.toFixed(1);
		}
		return null;
	};
	

	return (
		<FlatList
			data={null}
			keyExtractor={(item) => item.key}
			renderItem={null}
			ListHeaderComponent={
				<View style={styles.container}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text style={styles.title}>
							{product.product_name || "No Name Available"}
						</Text>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								borderWidth: 0.5,
								borderRadius: 5,
								borderColor: Colors.PRIMARY,
								elevation: 2,
								backgroundColor: Colors.PRIMARY2,
								padding: 5,
							}}
						>
							<Text
								style={{
									fontSize: 16,
									color: Colors.PRIMARY,
									marginRight: 5,
								}}
							>
								{getSugarSpoons() || "N/A"}
							</Text>
							<HugeiconsIcon
								icon={SpoonFreeIcons}
								size={18}
								color={Colors.PRIMARY}
							/>
						</View>
					</View>

					<ProductInfo
						additives={product.additives_tags}
						ingredients={ingredients}
					/>

					<View style={styles.imageRow}>
						<View style={styles.imageContainer}>
							<Image
								source={{ uri: product.image_front_url }}
								style={styles.image}
							/>
						</View>
						<View style={styles.imageContainer}>
							<Image
								source={{ uri: product.image_nutrition_url }}
								style={styles.image}
							/>
						</View>
					</View>

					<IngredientChart ingredients={ingredients} />
					{nutriments ? (
						<NutritionRadarChart nutriments={nutriments} />
					) : (
						<Text>No nutritional information available.</Text>
					)}
					<NutriScore
						grade={product.nutriscore_grade?.toUpperCase() || "N/A"}
					/>
					<NutrientBar levels={product.nutrient_levels} />
				</View>
			}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 10,
	},
	imageRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: Colors.WHITE,
		borderRadius: 10,
	},
	imageContainer: {
		flex: 1,
		height: 200,
		marginHorizontal: 5,
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
});
