
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';

import { saveEntry, loadEntries, clearEntries } from '@/lib/storage';
import { pickImageAsync } from '@/utils/imageUpload';


export default function index() {

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    
    // use image picker function + permissions cos u cant put that inside the other thing apparently
    const pickImage = async () => {
        if (!permissionResponse?.granted) {
            await requestPermission();
        }
        pickImageAsync();
    }
    
    // useEffect(() => {
    //     loadEntries();
        
    // }, []);


    return (
        <View>
            <Text style={styles.heading}>snack pack tracker</Text>

            <Link href="/cameraPage" push asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>take photo</Text>
                </Pressable>
            </Link>

            {/* <Link href="/camera" push asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>from files</Text>
                </Pressable>
            </Link> */}
            <Button onPress={pickImage} title="from files" />
            
            <Link href="/library" push asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>library</Text>
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

