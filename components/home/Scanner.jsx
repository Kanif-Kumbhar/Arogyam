import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SearchVisualFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import Colors from "../../shared/Colors";
import { useRouter } from "expo-router";

export default function Scanner() {
    const router = useRouter();
    const handleNavigate = () => {
        router.push("know-your-food");
    }
    return (
			<View
				style={{
					backgroundColor: Colors.PRIMARY2,
					borderRadius: 99,
					borderColor: Colors.PRIMARY,
					borderWidth: 0.5,
					width: 65,
					height: 65,
					padding: 20,
					elevation: 5,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<TouchableOpacity onPress={handleNavigate}>
					<HugeiconsIcon
						icon={SearchVisualFreeIcons}
						size={40}
						color={Colors.PRIMARY}
					/>
				</TouchableOpacity>
			</View>
		);
}