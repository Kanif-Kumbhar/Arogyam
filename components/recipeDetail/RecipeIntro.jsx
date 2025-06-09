import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../shared/Colors';
import { HugeiconsIcon } from "@hugeicons/react-native";

import {Fire03FreeIcons, PlusSignSquareFreeIcons, ServingFoodFreeIcons, TimeQuarter02FreeIcons } from '@hugeicons/core-free-icons';

export default function RecipeIntro({ recipeDetail }) {

  const recipeJson = recipeDetail?.jsonData;
  
  return (
		<View>
			{recipeDetail?.imageUrl && (
				<Image
					source={{ uri: recipeDetail.imageUrl }}
					style={{
						width: "100%",
						height: 200,
						borderRadius: 20,
					}}
				/>
			)}
			<View
				style={{
					marginTop: 15,
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
					{recipeDetail?.recipeName}
				</Text>
				<HugeiconsIcon
					icon={PlusSignSquareFreeIcons}
					size={30}
					color={Colors.PRIMARY}
				/>
			</View>
			<Text
				style={{
					fontSize: 16,
					marginTop: 6,
					color: Colors.GRAY,
					lineHeight: 25,
					textAlign: "justify",
				}}
			>
				{recipeJson?.description}
			</Text>

			<View
				style={{
					marginTop: 15,
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					gap: 7,
				}}
			>
				<View style={styles.propertiesContainer}>
					<HugeiconsIcon
						icon={Fire03FreeIcons}
						size={30}
						color={Colors.PRIMARY}
						style={styles.iconBg}
					/>
					<Text style={styles.subText}>Calories</Text>
					<Text style={styles.counts}>{recipeJson?.calories}</Text>
				</View>
				<View style={styles.propertiesContainer}>
					<HugeiconsIcon
						icon={TimeQuarter02FreeIcons}
						size={30}
						color={Colors.PRIMARY}
						style={styles.iconBg}
					/>
					<Text style={styles.subText}>Time</Text>
					<Text style={styles.counts}>{recipeJson?.cookTime}</Text>
				</View>
				<View style={styles.propertiesContainer}>
					<HugeiconsIcon
						icon={ServingFoodFreeIcons}
						size={30}
						color={Colors.PRIMARY}
						style={styles.iconBg}
					/>
					<Text style={styles.subText}>Serve</Text>
					<Text style={styles.counts}>{recipeJson?.serveTo}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  iconBg:{
    padding: 10,
  },
  propertiesContainer:{
    display: "flex",
    alignItems: "center",
    backgroundColor: '#fbf5ff',
    padding: 6,
    borderRadius: 10,
    flex: 1,
  },
  subText:{
    fontSize: 16,
  },
  counts: {
    fontSize: 22,
    color: Colors.PRIMARY
  }
})