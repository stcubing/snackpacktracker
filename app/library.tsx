import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';

import { saveEntry, loadEntries, clearEntries } from '@/lib/storage';
import { pickImageAsync } from '@/utils/imageUpload';
import { Entry } from '@/types/entry';



export default function library() {


    // const entryList: Entry[] = [];
    const [entryList, setEntrylist] = useState<Entry[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                let data: Entry[] = await loadEntries();

                setEntrylist(data);

            } catch (error) {
                console.log("error fetching data", error);
            }
            
        }

        fetchData();
        
    }, []);
    

    return (
        <ScrollView>

            <Text style={styles.h1}>library</Text>
            <Button onPress={clearEntries} title="clear entries" />

            { entryList.map(entry => (

                <View style={styles.entry}>

                    <View style={styles.imageContainer}>
                        <Image source={entry.photo} style={styles.image} />
                    </View>

                    <View style={styles.entryInfo}>
                        <Text>{entry.time} {entry.date}</Text>
                        <Text>{entry.id}</Text>
                        {/* <Text>uri starts with {entry.photo[0]}</Text> */}

                        <Text>base: {(entry.base).join(", ")}</Text>
                        <Text>meat: {(entry.meat).join(", ")}</Text>
                        <Text>sauce: {(entry.sauce).join(", ")}</Text>

                        <Text>rating: {entry.rating}</Text>
                        <Text>notes: {entry.notes}</Text>

                    </View>

                </View>

            ))}
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 30,
    },
    entry: {
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        padding: 10,
        // width: '80%',
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: 100,
        // height: '100%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
    },
    entryInfo: {
        
    },

})