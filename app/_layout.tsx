
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React from "react";

export default function RootLayout() {

  return (
    <React.Fragment>
      <StatusBar style="dark"/>
      <Stack />
    </React.Fragment>
  );
}
