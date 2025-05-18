import {
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
	Platform,
} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "./../../context/UserContext";
import Colors from "../../shared/Colors";
import {
	AnalyticsUpFreeIcons,
	CookBookFreeIcons,
	ServingFoodFreeIcons,
	Login03FreeIcons,
	Idea01FreeIcons,
	ArrowLeft01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "./../../services/FirebaseConfig";

const menuOptions = [
	{
		title: "My Progress",
		icon: AnalyticsUpFreeIcons,
		path: "/(tabs)/Progress",
	},
	{
		title: "Explore Recipes",
		icon: CookBookFreeIcons,
		path: "/(tabs)/Meals",
	},
	{
		title: "AI Recipe Generator",
		icon: ServingFoodFreeIcons,
		path: "/(tabs)/Progress",
	},
	{
		title: "My Progress",
		icon: AnalyticsUpFreeIcons,
		path: "/(tabs)/Progress",
	},
	{
		title: "Know Your Food",
		icon: Idea01FreeIcons,
		path: "/know-your-food",
	},
	{
		title: "Logout",
		icon: Login03FreeIcons,
		path: "logout",
	},
];

export default function Profile() {
	const { user, setUser } = useContext(UserContext);
	const router = useRouter();

	const formattedName = (() => {
		if (!user?.name) return "";

		const words = user.name.toLowerCase().split(" ");
		const capitalizedWords = words.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1)
		);

		if (capitalizedWords.length > 1) {
			// Insert line break after first word
			return capitalizedWords[0] + "\n" + capitalizedWords.slice(1).join(" ");
		}

		return capitalizedWords[0];
	})();

	onMenuOptionPress = (menu) => {
		if (menu.path == "logout") {
			console.log("Signing out...");
			signOut(auth)
				.then(() => {
					console.log("User signed out");
					setUser(null);
					console.log("Redirecting to /");
					router.replace("/");
				})
				.catch(console.error);
			return;
		}
		router.push(menu?.path);
	};

	return (
		<View
			style={{
				padding: 20,
				paddingTop: Platform.OS == "ios" ? 40 : 25,
			}}
		>
			<TouchableOpacity onPress={() => router.back()}>
				<HugeiconsIcon icon={ArrowLeft01FreeIcons} size={25} />
			</TouchableOpacity>
			<View
				style={{
					display: "flex",
					alignItems: "center",
					marginTop: 15,
				}}
			>
				<Image
					source={require("./../../assets/images/logo2.png")}
					style={{
						width: 120,
						height: 120,
						borderRadius: 99,
						borderWidth: 0.2,
					}}
				/>
				<Text
					style={{
						fontSize: 38,
						fontWeight: "bold",
						marginTop: 5,
						textAlign: "center",
					}}
				>
					{formattedName}
				</Text>
				<Text
					style={{
						fontSize: 15,
						color: Colors.GRAY,
						marginTop: 3,
					}}
				>
					{user?.email}
				</Text>
			</View>
			<FlatList
				data={menuOptions}
				numColumns={2}
				style={{ marginTop: 25 }}
				columnWrapperStyle={{
					justifyContent: "space-between",
					paddingHorizontal: 10,
				}}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => onMenuOptionPress(item)}
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							padding: 20,
							height: 120,
							margin: 5,
							borderWidth: 0.2,
							borderRadius: 15,
							backgroundColor: Colors.WHITE,
							elevation: 2,
						}}
					>
						<HugeiconsIcon icon={item.icon} size={40} color={Colors.PRIMARY} />
						<Text
							style={{
								fontSize: 16,
								fontWeight: "400",
								textAlign: "center",
								marginTop: 8,
							}}
						>
							{item.title}
						</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item, index) => `${item.title}-${index}`}
			/>
		</View>
	);
}
