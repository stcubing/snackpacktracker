import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { useIsFocused } from "@react-navigation/native";

import IconButton from '@/components/IconButton';

export default function CameraPage() {

	const cameraRef = useRef<Camera>(null);
	const router = useRouter();

	const [facing, setFacing] = useState<CameraType>('back');
	const [permission, requestPermission] = useCameraPermissions();

	const [locationValue, setLocationValue] = useState('');

	const isFocused = useIsFocused();

	useEffect(() => {
		async function getLocation() {
            const { status } = await Location.requestForegroundPermissionsAsync();
    		if (status !== "granted") return;
      

            let coords = await Location.getCurrentPositionAsync({});
            const latitude = coords["coords"]["latitude"];
            const longitude = coords["coords"]["longitude"];
            
            let location = await Location.reverseGeocodeAsync({latitude, longitude});
            
			let formattedAddress: string;
            if (location.length > 0) {
                const address = location[0];
                formattedAddress = address["street"] + ", " + address["city"] + ", " + address["country"]
                console.log(formattedAddress);
				
            } else {
				formattedAddress = "unknown location"
			};
			setLocationValue(formattedAddress);

			console.log("location getting finished");

			router.setParams({
				location: formattedAddress,
			});

        }
        console.log("getting location");
        getLocation();

	}, [location]);

	// cam permissions not loaded yet
	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
		<View style={styles.container}>
			<Text style={styles.message}>give permission to use camera</Text>
			<Button onPress={requestPermission} title="grant permission" />
		</View>
		);
	}

	// go back
	function back() {
		router.back();
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

			const currentDate = new Date();

			const ms = Date.now();

			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1;
			const day = currentDate.getDate();

			const hours = currentDate.getHours().toString().padStart(2, '0');
			const minutes = currentDate.getMinutes().toString().padStart(2, '0');
			const seconds = currentDate.getSeconds().toString().padStart(2, '0');

			const date = `${day}/${month}/${year}`;
			const time = `${hours}:${minutes}:${seconds}`;

			console.log("date:", date);
			console.log("time:", time);
			console.log("location:", locationValue);

			// pass result
			router.push({
				pathname: "/media",
				params: {media: photo.uri, type: "photo", date: date, time: time, ms: ms, location: locationValue}
			})
		}

	}
	

	return (
		<View style={styles.container}>
			<View style={styles.cameraContainer}>
				{isFocused && (
					<CameraView style={styles.camera} facing={facing} ref={cameraRef} />
				)}
			</View>

			<View style={styles.buttonContainer}>
				<IconButton onPress={back} icon="arrow-back" size="small" />
				<IconButton onPress={takePhoto} icon="circle" size="shutter" />
				<IconButton onPress={flipCamera} icon="flip-camera-ios" size="small" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#070707',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	
	cameraContainer: {
		width: '90%',
		height: '90%',
		// padding: 10	
	},
	camera: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		borderRadius: 10,
	},
	
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',

		// backgroundColor: 'green',
		width: '80%',
		position: 'absolute',
		bottom: 70,
		// backgroundColor: 'transparent',
	},

	shutterbutton: {
		backgroundColor: 'blue',
		padding: 50,
		width: 100,
		borderRadius: '100%',

		borderColor: 'black',
		borderWidth: 20,
	},

	text: {
		fontSize: 24,
		color: 'white',
	},
});
