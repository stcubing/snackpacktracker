import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, View, Text, StyleSheet, Pressable, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { useFonts, FiraCode_400Regular } from '@expo-google-fonts/fira-code';

import { saveEntry, loadEntries } from '@/lib/storage';
import { Entry } from '@/types/Entry';
import { generateUUID } from '@/utils/uuid';
import { pickImageAsync } from "@/utils/imageUpload";
import StarRating from 'react-native-star-rating-widget';
import Button from '@/components/Button';
import DropDownPicker from 'react-native-dropdown-picker';

import IconButton from "@/components/IconButton";
import TextButton from "@/components/TextButton";


export default function media() {

    const [fontsLoaded] = useFonts({ FiraCode_400Regular });

    const { media, type, date, time, ms } = useLocalSearchParams(); // params from camera
    const router = useRouter();
    const [notesText, setNotesText] = useState('');
    const [rating, setRating] = useState(0);

    const handleChange = useCallback(
        (value: number) => setRating(Math.round((rating + value) * 5) / 10),
        [rating],
    );
    
    
    const [baseOpen, setBaseOpen] = useState(false);
    const [baseValue, setBaseValue] = useState<string[]>([]);
    const [baseItems, setBaseItems] = useState([
        { label: 'chips', value: 'chips' },
        { label: 'rice', value: 'rice' }
    ]);
    
    const [meatOpen, setMeatOpen] = useState(false);
    const [meatValue, setMeatValue] = useState<string[]>([]);
    const [meatItems, setMeatItems] = useState([
        { label: 'chicken', value: 'chicken' },
        { label: 'beef', value: 'beef' },
        { label: 'lamb', value: 'lamb' }
    ]);
    
    const [sauceOpen, setSauceOpen] = useState(false);
    const [sauceValue, setSauceValue] = useState<string[]>([]);
    const [sauceItems, setSauceItems] = useState([
        { label: 'bbq', value: 'bbq' },
        { label: 'chilli', value: 'chilli' },
        { label: 'garlic', value: 'garlic' },
        { label: 'mayo', value: 'mayo' },
        { label: 'hummus', value: 'hummus' },
        { label: 'tomato', value: 'tomato' },
        { label: 'sweet chilli', value: 'sweet chilli' },
    ]);
    
    
    // close other pickers when one is open
    const onBaseOpen = useCallback(() => {
        setMeatOpen(false);
        setSauceOpen(false);
    }, []);
    const onMeatOpen = useCallback(() => {
        setBaseOpen(false);
        setSauceOpen(false);
    }, []);
    const onSauceOpen = useCallback(() => {
        setBaseOpen(false);
        setMeatOpen(false);
    }, []);
    

    

    
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
                ms: ms,
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

    }

    function ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    function retake() {
        router.push('/cameraPage');
    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer} >
                    <Image source={{ uri: media }} style={styles.image} />
                    <View style={styles.dateTimeWrapper} >
                        <Text style={styles.dateTimeText}>{time}</Text>
                        <Text style={styles.dateTimeText}>{date}</Text>
                    </View>
                </View>
                <View style={styles.cornerbtn}>
                    {/* add onto this!!
                    conditional if viewing from library or not
                    retake/reupload or delete
                    */}
                    {isUpload ? (
                        <IconButton onPress={pickImage} icon="loop" size="small" />
                    ) : (
                        <IconButton onPress={retake} icon="loop" size="small" />
                    )}
                </View>
                <View style={styles.dropdownWrapper}>
                    <DropDownPicker
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        listItemLabelStyle={styles.dropdownListText}
                        selectedItemLabelStyle={styles.dropdownListContainer}
        
                        badgeTextStyle={styles.dropdownBadgeText}
                        badgeStyle={styles.dropdownBadge}
                        showBadgeDot={false}
                        dropDownContainerStyle={styles.dropdownContainer}
                        arrowIconStyle={styles.dropdownArrow}
                        tickIconStyle={styles.dropdownTick}
        
                        theme='DARK'
                        multiple={true}
                        open={baseOpen}
                        value={baseValue}
                        items={baseItems}
                        setOpen={setBaseOpen}
                        setValue={setBaseValue}
                        setItems={setBaseItems}
                        placeholder="base"
                        mode="BADGE"
                        // badgeDotColors={["#fffddfff", "#ffe44cff", "#fffddfff"]}
                        zIndex={4}
                        onOpen={onBaseOpen}
                        />
                    <DropDownPicker
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        listItemLabelStyle={styles.dropdownListText}
                        selectedItemLabelStyle={styles.dropdownListContainer}
                        badgeTextStyle={styles.dropdownBadgeText}
                        badgeStyle={styles.dropdownBadge}
                        showBadgeDot={false}
                        dropDownContainerStyle={styles.dropdownContainer}
                        arrowIconStyle={styles.dropdownArrow}
                        tickIconStyle={styles.dropdownTick}
                        theme='DARK'
                        multiple={true}
                        open={meatOpen}
                        value={meatValue}
                        items={meatItems}
                        setOpen={setMeatOpen}
                        setValue={setMeatValue}
                        setItems={setMeatItems}
                        placeholder="meat"
                        mode="BADGE"
                        // badgeDotColors={["#ff4141ff", "#ffe44cff", "#4753ffff"]}
                        zIndex={3}
                        onOpen={onMeatOpen}
                        />
                    <DropDownPicker
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        listItemLabelStyle={styles.dropdownListText}
                        selectedItemLabelStyle={styles.dropdownListContainer}
                        badgeTextStyle={styles.dropdownBadgeText}
                        badgeStyle={styles.dropdownBadge}
                        showBadgeDot={false}
                        dropDownContainerStyle={styles.dropdownContainer}
                        arrowIconStyle={styles.dropdownArrow}
                        tickIconStyle={styles.dropdownTick}
                        theme='DARK'
                        maxHeight={500}
                        multiple={true}
                        open={sauceOpen}
                        value={sauceValue}
                        items={sauceItems}
                        setOpen={setSauceOpen}
                        setValue={setSauceValue}
                        setItems={setSauceItems}
                        placeholder="sauce"
                        mode="BADGE"
                        // badgeDotColors={["#faffcbff", "#240c03ff", "#fff2eeff", "#ffe1b3ff", "#fffed4ff", "#ff7f6eff", "#ff304cff"]}
                        zIndex={2}
                        onOpen={onSauceOpen}
                    />
                </View>
                
              
                <View style={styles.rating}>
                    <StarRating
                        style={styles.rating}
                        rating={rating}
                        onChange={setRating}
                        color='white'
                        emptyColor='rgba(255,255,255,0.3)'
                        starStyle={{
                            margin: -2,
                        }}
                        starSize={70}
                        animationConfig={{
                            duration: 300,
                            scale: 0.9,
                            delay: 0
                        }}
                    />
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={setNotesText}
                    value={notesText}
                    multiline={true}
                    placeholderTextColor='rgba(255,255,255,0.3)'
                    placeholder="notes"
        
                    autoCorrect={false}
                />
                <View style={styles.submitbtn}>
                    <TextButton onPress={submit} text="submit"/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: '#070707',
	},
    scrollview: {
        width: '90%',
        // marginTop: 60,

    },
    
    dateTimeWrapper: {
        position: 'absolute',
        // backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        bottom: 0
    },
    dateTimeText: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        fontSize: 15,

        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },

    imageContainer: {
        width: '100%',
        height: 600,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
    },


    cornerbtn: {
        position: 'absolute',
        // backgroundColor: 'blue',
        padding: 20,
        // width: '50%',
        borderRadius: 20
    },


    dropdownWrapper: {
        display: 'flex',
        gap: 10,
        paddingVertical: 20,
    },
    dropdown: {
        backgroundColor: '#141414',

        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,

        paddingVertical: 10,
    },
    dropdownText: {
        color: 'rgba(255,255,255,0.3)',
        fontFamily: 'FiraCode_400Regular',
        fontSize: 20,
        paddingHorizontal: 5,
    },
    dropdownContainer: { // the list
        backgroundColor: '#141414',
        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,
        paddingVertical: 10,
    },
    dropdownListText: {
        color: 'white',
    },
    dropdownListContainer: {
        color: 'rgba(255,255,255,0.3)'
    },
    dropdownBadgeText: {
        color: 'black',
        marginVertical: -5,
        marginHorizontal: -10,
        paddingHorizontal: 10
    },
    dropdownBadge: {
        borderRadius: 10,
    },
    dropdownArrow: {
        opacity: 0.5,
        width: 25
    },
    dropdownTick: {
        opacity: 0.5,
        width: 20
    },



    rating: {
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
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
        backgroundColor: '#141414',

        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,

        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        
        fontSize: 20,

        padding: 15,
        marginTop: 20,
        marginBottom: 10
    },
    submitbtn: {
        marginBottom: 50
    }



})