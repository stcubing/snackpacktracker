import { View, StyleSheet, Text } from 'react-native';
import { useFonts, FiraCode_400Regular, FiraCode_600SemiBold } from '@expo-google-fonts/fira-code';


import { MaterialIcons, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';


type Props = {
    text: string;
};

export default function TextBox({ text }: Props) {

    const [fontsLoaded] = useFonts({ FiraCode_400Regular, FiraCode_600SemiBold });
    useEffect(() => {
        if (fontsLoaded) {
        SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Keep splash screen visible
    }
    

    return (
        <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText} >{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        backgroundColor: '#141414', 
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 15,

        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 10,
    },
    buttonText: {
        fontFamily: 'FiraCode_600SemiBold',
        color: 'white',
        fontSize: 35,
    }
    
});
