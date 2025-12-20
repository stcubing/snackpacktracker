
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React from "react";


export default function RootLayout() {

	// const Stack = createStackNavigator();

	return (
		// <Stack.Navigator>
		// </Stack.Navigator>
		<React.Fragment>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerShown: false,
				}}

			/>
		</React.Fragment>
	);
}
