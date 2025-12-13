import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import * as MediaLibrary from 'expo-media-library';

import { saveEntry, loadEntries } from '@/lib/storage';
import { Entry } from '@/types/entry';
import { generateUUID } from '@/utils/uuid';
import { pickImageAsync } from "@/utils/imageUpload";

import Button from '@/components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import StarRating from 'react-native-star-rating-widget';


export default function media() {
    const { media, type, date, time } = useLocalSearchParams(); // params from camera
    const router = useRouter();
    const [notesText, setNotesText] = useState('');
    const [rating, setRating] = useState(0);

    const [meatOpen, setMeatOpen] = useState(false);
    const [meatValue, setMeatValue] = useState<string[]>([]);
    const [meatItems, setMeatItems] = useState([
        { label: 'Chicken', value: 'chicken' },
        { label: 'Beef', value: 'beef' },
        { label: 'Lamb', value: 'lamb' }
    ]);
    
    const [baseOpen, setBaseOpen] = useState(false);
    const [baseValue, setBaseValue] = useState<string[]>([]);
    const [baseItems, setBaseItems] = useState([
        { label: 'Chips', value: 'chips' },
        { label: 'Rice', value: 'rice' }
    ]);
    
    const [sauceOpen, setSauceOpen] = useState(false);
    const [sauceValue, setSauceValue] = useState<string[]>([]);
    const [sauceItems, setSauceItems] = useState([
        { label: 'BBQ', value: 'bbq' },
        { label: 'Chilli', value: 'chilli' },
        { label: 'Garlic', value: 'garlic' },
        { label: 'Mayo', value: 'mayo' },
        { label: 'Hummus', value: 'hummus' },
        { label: 'Tomato', value: 'tomato' },
        { label: 'Sweet Chilli', value: 'sweetchilli' },
    ]);


    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
        
    // use image picker function + permissions cos u cant put that inside the other thing apparently
    const pickImage = async () => {
        if (!permissionResponse?.granted) {
            await requestPermission();
        }
        pickImageAsync();
    }


    // taken or uploaded photo
    let isUpload;
    if (type === "photo") {
        isUpload = false;
    } else {
        isUpload = true;
    }

    // pushes the log into storage + goes home
    async function submit() {

        console.log("submit pressed")

        if (baseValue && meatValue) {
            const newEntry: Entry = {
                id: generateUUID(),
                photo: media,
                date: date,
                time: time,
                base: baseValue,
                meat: meatValue,
                sauce: sauceValue,
                rating: rating,
                notes: notesText,

            }

            // check if entries exist first (append new entry if so)
            let existing: Entry[] = await loadEntries();

            console.log(newEntry);
            // existing.push(newEntry);
            // console.log(existing);

            const newArray: Entry[] = [...existing, newEntry];
            console.log(newArray);

            saveEntry(newArray);
            
            router.push({
                pathname: "/",
                params: {}
            })


        }


        // if (meatValue) {
        //     saveEntry("meat", meatValue.toString());

        // }

            

    }

    // console.log(`displaying photo ${media}`)
    
    return (
        <View style={styles.container} >
            <ScrollView style={styles.scrollview}>
                <View style={styles.imageContainer} >
                    <Image source={{ uri: media }} style={styles.image} />
                </View>

                {isUpload ? (

                    <Pressable onPress={pickImage} style={styles.retakebutton}>
                        <Text style={styles.text}>reupload</Text>
                    </Pressable>

                ) : (

                    <Link href="/cameraPage" push asChild>
                        <Pressable style={styles.retakebutton}>
                            <Text style={styles.text}>retake</Text>
                        </Pressable>
                    </Link>

                )}

                <Text style={styles.text}>fill in details</Text>


                <DropDownPicker
                    multiple={true}
                    open={baseOpen}
                    value={baseValue}
                    items={baseItems}
                    setOpen={setBaseOpen}
                    setValue={setBaseValue}
                    setItems={setBaseItems}
                    placeholder="select base"
                    mode="BADGE"
                    badgeDotColors={["#fffddfff", "#ffe44cff", "#fffddfff"]}
                    zIndex={4}

                    // zIndex={1002}
                    />
                <DropDownPicker
                    multiple={true}
                    open={meatOpen}
                    value={meatValue}
                    items={meatItems}
                    setOpen={setMeatOpen}
                    setValue={setMeatValue}
                    setItems={setMeatItems}
                    placeholder="select meat"
                    mode="BADGE"
                    badgeDotColors={["#ff4141ff", "#ffe44cff", "#4753ffff"]}
                    zIndex={3}
                    />
                <DropDownPicker
                    multiple={true}
                    open={sauceOpen}
                    value={sauceValue}
                    items={sauceItems}
                    setOpen={setSauceOpen}
                    setValue={setSauceValue}
                    setItems={setSauceItems}
                    placeholder="select sauces"
                    mode="BADGE"
                    badgeDotColors={["#faffcbff", "#240c03ff", "#fff2eeff", "#ffe1b3ff", "#fffed4ff", "#ff7f6eff", "#ff304cff"]}
                    // 
                    zIndex={2}
                />



                <Text style={styles.text}>taken at</Text>
                <Text style={styles.h3}>date: {date}</Text>
                <Text style={styles.h3}>time: {time}</Text>

                <StarRating
                    rating={rating}
                    onChange={setRating}
                    starSize={50}
                    animationConfig={{
                        duration: 300,
                        scale: 1.02,
                        delay: 0
                    }}
                />

                <Text style={styles.h3}>additional notes</Text>
                <TextInput
                style={styles.input}
                onChangeText={setNotesText}
                value={notesText}
                multiline={true}
                placeholder="notes" />

                <Button theme="primary" label="submit" onPress={submit}/>
                {/* <Link href="/cameraPage" push asChild>
                </Link> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
	},
    scrollview: {
        width: '100%',
        backgroundColor: 'purple',
        padding: 10,
        
    },

    imageContainer: {
        width: '100%',
        height: 600,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    image: {
        // padding: 100,
        height: '100%',
        width: '100%',
        // resizeMode: "cover"
    },


    retakebutton: {
        position: 'absolute',
        backgroundColor: 'blue',
        padding: 10,
        // width: '50%',
        borderRadius: 20
    },


    text: {
        color: 'white',
        fontSize: 30
    },
    h3: {
        color: 'white',
        fontSize: 20,
    },
    input: {
        width: '100%',
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 15,
        color: 'white',
        fontSize: 20,
    }

})