
import { FiraCode_400Regular, FiraCode_600SemiBold, useFonts } from '@expo-google-fonts/fira-code';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import IconButton from '@/components/IconButton';
import { pickImageAsync } from '@/utils/imageUpload';




export default function index() {


    const [fontsLoaded] = useFonts({ FiraCode_400Regular, FiraCode_600SemiBold });

    async function toCamera() {
        router.push({pathname: "/cameraPage"})
    }
    async function toRandom() {
        router.push({pathname: "/random"})
    }
    async function toStats() {
        router.push({pathname: "/stats"})
        console.log("to stats")
    }
    async function toLibrary() {
        router.push({pathname: "/library"})
    }
    

    return (
        <View style={styles.background}>

            <View style={styles.container}>

                <View style={styles.headerText} >
                    <Text style={styles.heading}>snackpacktracker</Text>
                    <Text style={styles.version}>v0.1</Text>
                </View>
            
                <View style={styles.btnRow}>
                    <IconButton onPress={toCamera} icon="camera-alt" size="square" />
                    <IconButton onPress={pickImageAsync} icon="add-to-photos" size="square" />
                </View>

                <View style={styles.btnRow}>
                    <IconButton onPress={toRandom}  icon="dice" size="smallRect" />
                    <IconButton onPress={toStats} icon="stats-chart" size="smallRect" />
                </View>
                
                <View style={styles.btnRow}>
                    <IconButton onPress={toLibrary} icon="photo-library" size="smallRect" />
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

