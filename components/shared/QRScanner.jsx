import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Button from "../../components/shared/Button";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const QRScanner = () => {
	const [facing, getFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);
	const [scannedData, setScannedData] = useState(null);
	const router = useRouter();

	useEffect(() => {
		if (scannedData) {
			router.push({
				pathname: "/product-details",
				params: { code: scannedData },
			});
		}
	}, [scannedData]);

	// Load and play beep sound
	const playBeep = async () => {
		try {
			const { sound } = await Audio.Sound.createAsync(
				require("../../assets/sounds/beep.mp3")
			);
			await sound.playAsync();
			// Unload sound after playing to free resources
			sound.setOnPlaybackStatusUpdate((status) => {
				if (!status.isPlaying) {
					sound.unloadAsync();
				}
			});
		} catch (error) {
			console.log("Error playing sound:", error);
		}
	};

	if (!permission) return <View />;

	if (!permission.granted) {
		return (
			<View style={styles.permissionContainer}>
				<Text style={styles.message}>
					We need your permission to access the camera
				</Text>
				<Button title="Grant Permission" onPress={requestPermission} />
			</View>
		);
	}

	const handleScan = ({ data }) => {
		if (!scanned) {
			setScanned(true);
			setScannedData(data);
			playBeep();
			setTimeout(() => setScanned(false), 3000);
		}
	};
	

	const handleNavigate = () => {
		if (scannedData) {
			router.push({
				pathname: "/product-details",
				params: { code: scannedData },
			});
		} else {
			alert("Please scan a barcode before proceeding.");
		}
	};
    

	return (
		<View>
			<View style={styles.wrapper}>
				<CameraView
					style={styles.camera}
					facing={facing}
					barcodeScannerSettings={{
						barcodeTypes: [
							"qr",
							"ean13",
							"ean8",
							"upc_a",
							"upc_e",
							"code39",
							"code128",
						],
					}}
					onBarcodeScanned={handleScan}
				>
					<View style={styles.overlay}>
						<View style={styles.scanArea} />
					</View>
				</CameraView>
			</View>
			<View style={{ marginTop: 10 }}>
				<Button title={"Explore Product Insights"} onPress={handleNavigate} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: 280,
		height: 320,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "#000",
	},
	camera: {
		width: "100%",
		height: "100%",
	},
	permissionContainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	message: {
		textAlign: "center",
		marginBottom: 10,
	},
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	scanArea: {
		width: 250,
		height: 250,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 10,
	},
});

export default QRScanner;
