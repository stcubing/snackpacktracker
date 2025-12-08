import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraPage() {

	const cameraRef = useRef<Camera>(null);
	const router = useRouter();

	const [facing, setFacing] = useState<CameraType>('back');
	const [permission, requestPermission] = useCameraPermissions();

	// cam permissions not loaded yet
	if (!permission) {
		return <View />;
	}

	// Camera permissions are not granted yet.
	if (!permission.granted) {
		return (
		<View style={styles.container}>
			<Text style={styles.message}>We need your permission to show the camera</Text>
			<Button onPress={requestPermission} title="grant permission" />
		</View>
		);
	}

	// flip camera
	function flipCamera() {
		if (facing === 'back') {
			setFacing('front');
		} else {
			setFacing('back');
		}
		console.log("flipping camera")
	}

	// take the actual picture
	async function takePhoto() {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			console.log(photo.uri);

			// pass result
			router.push({
				pathname: "/media",
				params: {media: photo.uri, type: "photo"}
			})
		}

	}

	return (
		<View style={styles.container}>
		<CameraView style={styles.camera} facing={facing} ref={cameraRef} />
		<View style={styles.buttonContainer}>
			<TouchableOpacity style={styles.button} onPress={flipCamera}>
				<Text style={styles.text}>flip</Text>
			</TouchableOpacity>
			<Button title="take photo" onPress={takePhoto} />
		</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 64,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		width: '100%',
		paddingHorizontal: 64,
	},
	button: {
		flex: 1,
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
