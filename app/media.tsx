import { useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useFonts, FiraCode_400Regular } from '@expo-google-fonts/fira-code';
import * as MediaLibrary from 'expo-media-library';
import { saveEntry, loadEntries, deleteEntry } from '@/lib/storage';
import { Entry } from '@/types/entry';
import { generateUUID } from '@/utils/uuid';
import { pickImageAsync } from "@/utils/imageUpload";

import StarRating from 'react-native-star-rating-widget';
import DropDownPicker from 'react-native-dropdown-picker';

import IconButton from "@/components/IconButton";
import TextButton from "@/components/TextButton";
import { File, Paths } from "expo-file-system";


export default function media() {

    const [fontsLoaded] = useFonts({ FiraCode_400Regular });

    const imageRef = useRef<View>(null);

    const { type, id, media, date, time, ms, location, base, meat, sauce, rating, notes } = useGlobalSearchParams(); // params from camera
    const router = useRouter();
    const [notesText, setNotesText] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [locationValue, setLocationValue] = useState('loading location...');
    
    
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
    

    let isUpload;
    let isView;
    useEffect(() => {

        if (type === "view") {
        
            // viewing as entry page
    
            setBaseValue((base.toString()).split(","));
            setMeatValue((meat.toString()).split(","));
            setSauceValue((sauce.toString()).split(","));
    
            setStarRating(Number(rating));

            setLocationValue(location.toString());
    
            setNotesText(notes.toString());

            isView = true;
            isUpload = false;
    
        } else {
            // taken or uploaded photo
            isView = false;
            if (type === "photo") {
                isUpload = false;
            } else {
                isUpload = true;
            }
        }
    }, []);

    useEffect(() => {
        // console.log("locagtion is this:", location);

        // async function brah() {
        //     let updLocation = await getLocation();

        //     if (updLocation) {
        //         console.log("setting location")
        //         setLocationValue(updLocation);
        //     } else {
        //         console.log("NO LOCATRION AJKAJSKLASDJKDJKDSAJKLDADJKL")
        //     }

        // }
        // brah();
        // // console.log('hi');


        // getLocation();

        if (location) {
            console.log('late updating location to', location);
            setLocationValue(location.toString());
        }

    }, [location]);


    // pushes the log into storage + goes home
    async function submit() {

        console.log("submit pressed")

        const permission = await MediaLibrary.requestPermissionsAsync();
        console.log(permission);


            
        let newUri = media;
        // save file
        if (Platform.OS !== 'web') {
            
            const newItem = await MediaLibrary.createAssetAsync(media);
            let newFile;

            const existingFolder = await MediaLibrary.getAlbumAsync("snackpacktracker");
            if (!existingFolder) {
                await MediaLibrary.createAlbumAsync("snackpacktracker", newItem, true); // make folder if it doesnt already exist, move to that
            } else {
                MediaLibrary.addAssetsToAlbumAsync(media, existingFolder.id, true); // otherwise just move
            }
            await MediaLibrary.deleteAssetsAsync(media); // delete old one

            newUri = media;

            console.log("new uri", newUri);
        }

        if (locationValue == "loading location...") {
            setLocationValue("unknown location");
        }

        const newEntry: Entry = {
            id: generateUUID(),
            photo: newUri,
            date: date,
            time: time,
            ms: ms,
            location: locationValue,
            base: baseValue,
            meat: meatValue,
            sauce: sauceValue,
            rating: starRating,
            notes: notesText,

        }

        let existing: Entry[] = await loadEntries();
        const newArray: Entry[] = [...existing, newEntry];
        saveEntry(newArray);

        router.push("/");

    }


    function retake() {
        router.push('/cameraPage');
    }

    async function remove(id: string) {
        console.log("deleting", id);
        await deleteEntry(id);
        router.push("/library");
    }
    async function update(id: string) {
        console.log("updating", id);
        await deleteEntry(id);
        
        const newEntry: Entry = {
            id: id,
            photo: media,
            date: date,
            time: time,
            ms: ms,
            location: locationValue,
            base: baseValue,
            meat: meatValue,
            sauce: sauceValue,
            rating: starRating,
            notes: notesText,

        }

        // check if entries exist first (append new entry if so)
        let existing: Entry[] = await loadEntries();

        const newArray: Entry[] = [...existing, newEntry];
        console.log(newArray);

        saveEntry(newArray);

        router.back();

    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
            <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={styles.imageContainer} >
                    <Image ref={imageRef} source={{ uri: media }} style={styles.image} />
                    <View style={styles.metadataWrapper} >
                        <View style={styles.datetimeWrapper}>
                            <Text style={styles.metadataText}>{time}</Text>
                            <Text style={styles.metadataText}>{date}</Text>
                        </View>
                        <TextInput
                            style={styles.locationField}
                            onChangeText={setLocationValue}
                            value={locationValue}
                            multiline={true}   
                            autoCorrect={false}
                        />
                    </View>
                </View>
                <View style={styles.cornerbtn}>

                    {type === "view" && <IconButton onPress={() => remove(id)} icon="delete" size="small" />}
                    {type === "photo" && <IconButton onPress={retake} icon="loop" size="small" />}
                    {type === "" && <IconButton onPress={pickImageAsync} icon="add-to-photos" size="small" />}
      
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
                        rating={starRating}
                        onChange={setStarRating}
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
                    {type === "view" ? (
                        <TextButton onPress={() => update(id)} text="update"/>
                    ) : (
                        <TextButton onPress={submit} text="submit"/>
                    )}
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
    
    metadataWrapper: {
        position: 'absolute',
        // backgroundColor: 'red',
        width: '100%',
        
        padding: 20,
        bottom: 0
    },
    metadataText: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        fontSize: 15,

        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },
    locationField: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        fontSize: 15,

        paddingVertical: 4,
        paddingHorizontal: 8,
        marginTop: 5,

        borderColor: 'rgba(255,255,255,0.3)',
        // borderWidth: 2,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.3)',

        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },
    datetimeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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