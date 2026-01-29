
import { FiraCode_400Regular, FiraCode_600SemiBold, useFonts } from '@expo-google-fonts/fira-code';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import IconButton from '@/components/IconButton';
import { pickImageAsync } from '@/utils/imageUpload';




export default function index() {

    // ensure the font actually loads fskjhsklsdja
    const [fontsLoaded] = useFonts({ FiraCode_400Regular, FiraCode_600SemiBold });
    if (!fontsLoaded) {
        return (
            <View></View>
        );
    }

    return (
        <View style={styles.background}>

            <View style={styles.container}>

                <View style={styles.headerText} >
                    <Text style={styles.heading}>snackpacktracker</Text>
                    <Text style={styles.version}>v0.3 (beta)</Text>
                </View>
            
                <View style={styles.btnRow}>
                    <IconButton onPress={() => router.push("/cameraPage")} icon="camera-alt" size="square" />
                    <IconButton onPress={pickImageAsync} icon="add-to-photos" size="square" />
                </View>

                <View style={styles.btnRow}>
                    <IconButton onPress={() => router.push("/random")}  icon="dice" size="smallRect" />
                    <IconButton onPress={() => router.push("/stats")} icon="stats-chart" size="smallRect" />
                </View>
                
                <View style={styles.btnRow}>
                    <IconButton onPress={() => router.push("/library")} icon="photo-library" size="smallRect" />
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    background: {
        backgroundColor: '#070707',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },

    headerText: {
        paddingTop: 100,
        paddingBottom: 100,
    },
    heading: {
        fontFamily: 'FiraCode_400Regular',
        color: "#ffffff",
        fontSize: 35,
        lineHeight: 40,
        // fontWeight: 'bold',
        // fontWeight: 'normal',
    },
    version: {
        fontFamily: 'FiraCode_400Regular',
        color: '#ffffff',
        opacity: 0.5,
        fontSize: 15,
    },
    button: {
        backgroundColor: 'blue',
        padding: 50,
        borderRadius: 20
    },
    text: {
        color: 'white',
        fontSize: 40
    },


    btnRow: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
    }


})

