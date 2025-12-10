
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Exif from 'react-native-exif';

import { saveEntry, loadEntries, clearEntries } from '@/lib/storage';


export default function homescreen() {

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const imageRef = useRef<View>(null);
    
    // const navigation = useNavigation();
    // console.log("hi");

    

    const pickImageAsync = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileName = result.assets[0].fileName;
            // const path = result;
            console.log(fileName);



            // const date = await Exif.getExif(fileName);

            setSelectedImage(uri);
            setShowAppOptions(true);

            console.log(uri);
            // console.log(date);
            


            // router.push({
            //     pathname: "/media",
            //     params: { media: result, type: "photo", date: date, time: time }
            // })

        } else {
            // alert("no images selected");
        }

    };
    
    useEffect(() => {
        loadEntries();
        if (!permissionResponse?.granted) {
            requestPermission();
        }
    }, []);


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
            <Button onPress={pickImageAsync} title="from files" />
            
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

