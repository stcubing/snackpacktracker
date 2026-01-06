import { View, StyleSheet, Text } from 'react-native';
import { useFonts, FiraCode_400Regular, FiraCode_600SemiBold } from '@expo-google-fonts/fira-code';


import { MaterialIcons, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';


type Props = {
    size: string;
    stat: string;
    perc: number;
    value: number;
    width: any;
};

export default function StatBox({ size, stat, value, perc, width }: Props) {

    const [fontsLoaded] = useFonts({ FiraCode_400Regular, FiraCode_600SemiBold });
    useEffect(() => {
        if (fontsLoaded) {
        SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Keep splash screen visible
    }
    
    if (size === "large") {
        return (
            <View style={[styles.buttonWrapper, {flexGrow: width*100}]}>
                <Text style={styles.largePercText} >{perc}%</Text>
                <Text style={styles.largeValueText} >{value}</Text>
                <Text style={styles.largeStatText} >{stat}</Text>
            </View>
        );
    } else if (size === "small") {
        return (
            <View style={styles.buttonWrapper}>
                <Text style={styles.smallValueText} >{value}</Text>
                <Text style={styles.smallStatText} >{stat}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    buttonWrapper: {
        // flex: 1,
        flexBasis: 100,
        backgroundColor: '#141414', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,

        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 10,
    },
    largeStatText: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        fontSize: 15,
    },
    largePercText: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        fontSize: 15,
        opacity: 0.5,
    },
    largeValueText: {
        fontFamily: 'FiraCode_600SemiBold',
        color: 'white',
        fontSize: 55,
    },
    
    smallStatText: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        fontSize: 15,
    },
    smallValueText: {
        fontFamily: 'FiraCode_600SemiBold',
        color: 'white',
        fontSize: 25,
    },
    
});
