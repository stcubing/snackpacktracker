import React from 'react';
import {StyleSheet, ScrollView, Text, Button} from 'react-native';


const styles = StyleSheet.create({
	h1: {
		fontSize: 30,
		color: 'white',
		marginTop: 150,
		textAlign: 'center',
	}
});



export default function index() {

	const onPress = () => {
		alert("hi");
	};

	return (

		<ScrollView>
			<Text style={styles.h1}>snack pack tracker</Text>
			<Text>text</Text>
			<Button onPress={onPress} title="Hello"/>
		</ScrollView>

	)
}