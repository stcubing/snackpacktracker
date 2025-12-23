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

                data.sort((a, b) => a.ms - b.ms).reverse(); // sort chronologically
                console.log(data);

                setEntrylist(data);

            } catch (error) {
                console.log("error fetching data", error);
            }
            
        }

        fetchData();
        
    }, []);

    async function clear() {
        clearEntries();
        router.replace({ pathname: "/library" })
    }
    

    return (
        <View style={styles.background}>
            <ScrollView>

                <Text style={styles.h1}>library</Text>

                <View style={styles.entryContainer}>
                    { entryList.map(entry => (
                    
                        <View style={styles.entry}>
                            <View style={styles.imageContainer}>
                                <Image source={entry.photo} style={styles.image} />
                            </View>
                            <Text>{entry.date}</Text>
                            {/* <View style={styles.entryInfo}>
                                <Text>{entry.time} {entry.date}</Text>
                                <Text>{entry.id}</Text>
                    
                                <Text>base: {(entry.base).join(", ")}</Text>
                                <Text>meat: {(entry.meat).join(", ")}</Text>
                                <Text>sauce: {(entry.sauce).join(", ")}</Text>
                    
                                <Text>rating: {entry.rating}</Text>
                                <Text>notes: {entry.notes}</Text>
                    
                                </View> */}
                        </View>
                    ))}
                </View>
                <Button onPress={clear} title="clear entries" />
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    background: {
        backgroundColor: '#070707',
        height: '100%',
        // paddingTop: 150,
        // paddingLeft: 25,
        // paddingRight: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    h1: {
        fontSize: 30,
        color: 'white',
    },


    entryContainer: {
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    entry: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        // width: '30%',
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
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