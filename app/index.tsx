
import { Link } from 'expo-router';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

import { saveEntry, loadEntries, clearEntries } from '@/lib/storage';
import { useEffect } from 'react';


export default function homescreen() {
    
    // const navigation = useNavigation();
    // console.log("hi");

    useEffect(() => {
        loadEntries();
    })
    
    return (
        <View>
            <Text style={styles.heading}>snack pack tracker</Text>

            <Link href="/cameraPage" push asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>take photo</Text>
                </Pressable>
            </Link>

            <Link href="/camera" push asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>from files</Text>
                </Pressable>
            </Link>
            
            <Button onPress={clearEntries} title="clear entries" />
            {/* <Text style={styles.heading}>{loadEntries}</Text> */}
        </View>
    )
}


const styles = StyleSheet.create({
    heading: {
        color: "#000000",
        fontSize: 30,
    },
    button: {
        backgroundColor: 'blue',
        padding: 50,
        borderRadius: 20
    },
    text: {
        color: 'white',
        fontSize: 40
    }
})

