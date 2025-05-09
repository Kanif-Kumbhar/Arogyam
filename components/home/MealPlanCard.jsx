import { View, Text, Image, StyleSheet } from 'react-native'
import Colors from '../../shared/Colors'

export default function MealPlanCard({mealPlanInfo}) {
  return (
    <View style={{
        padding: 10,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        backgroundColor: Colors.WHITE,
        marginTop: 10,
        borderRadius: 15,
    }}>
      <Image source = {{uri: mealPlanInfo?.recipe?.imageUrl}}
      style ={{
        width: 70,
        height: 70,
        borderRadius: 15,
      }}
      />
      <View>
        <Text style={styles.mealType}>{mealPlanInfo?.mealPlan?.mealType}</Text>
        <Text style={styles.recipeName}>{mealPlanInfo?.recipe?.recipeName}</Text>
        <Text style={styles.calories}>{mealPlanInfo?.recipe?.jsonData?.calories} kcal</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
	mealType: {
		backgroundColor: Colors.SECONDARY,
		color: Colors.PRIMARY,
		padding: 1,
		paddingHorizontal: 10,
		borderRadius: 99,
		alignSelf: "flex-start",
	},
	recipeName: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 5,
	},
	calories: {
		fontSize: 16,
		fontWeight: "500",
		marginTop: 5,
		color: Colors.GRAY,
	},
});