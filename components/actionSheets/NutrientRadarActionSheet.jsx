import { View, Text } from 'react-native'
import React from 'react'
import {
	BarChart,
	LineChart,
	PieChart,
	PopulationPyramid,
	RadarChart,
} from "react-native-gifted-charts";
import Colors from '../../shared/Colors';

export default function NutrientRadarActionSheet() {

    const nutrients = {
			Calories: 62,
			Protein: 45,
			Carbs: 70,
			Fats: 20,
            Fiber: 18,
			Sugar: 10,
		};
    

    const labels = Object.keys(nutrients);
		const data = Object.values(nutrients);
		const dataLabels = data.map((v) => `${v}g`);
          
  return (
		<View style={{
            width: "100%",
        }}>
            <Text style={{
                margin: 15,
                color: Colors.PRIMARY,
                fontSize: 20,
                fontWeight: "bold",
            }}>Nutrient Values</Text>
			<RadarChart
				data={data}
				labels={labels}
				dataLabels={dataLabels}
				maxValue={100}
				dataLabelsPositionOffset={12}
				labelConfig={{
					stroke: Colors.PRIMARY,
					fontSize: 12,
					fontWeight: "600",
				}}
				dataLabelsConfig={{
					stroke: Colors.PRIMARY,
					fontSize: 12,
				}}
				polygonConfig={{
					stroke: Colors.PRIMARY,
					strokeWidth: 2,
					fill: Colors.PRIMARY2,
					opacity: 0.4,
					gradientColor: Colors.PRIMARY,
					showGradient: true,
					gradientOpacity: 0.6,
					showDataValuesAsLabels: true,
					isAnimated: true,
					animationDuration: 1000,
				}}
			/>
		</View>
	);
}