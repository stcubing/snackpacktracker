import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';

import { saveEntry, loadEntries, clearEntries } from '@/lib/storage';
import { pickImageAsync } from '@/utils/imageUpload';
import { Entry } from '@/types/Entry';
import IconButton from '@/components/IconButton';
import TextButton from '@/components/TextButton';
import EntryButton from '@/components/EntryButton';



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

    function back() {
        router.back()
    }
    
    async function toEntry(date: string) {
        console.log("pressed", date);
    }

    return (
        <View style={styles.background}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>


                <View style={styles.top} >
                    <IconButton onPress={back} icon="arrow-back" size="small" />
                    <Text style={styles.heading}>library</Text>
                </View>

                <View style={styles.entryContainer}>
                    { entryList.map(entry => (
                        <EntryButton key={entry.id} image={entry.photo} date={entry.date} onPress={toEntry(entry.date)} />
                    ))}
                </View>

                <TextButton onPress={clear} text="clear all"/>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    heading: {
        fontFamily: 'FiraCode_400Regular',
        color: "#ffffff",
        fontSize: 30,
        lineHeight: 40,
    },
  
    background: {
        backgroundColor: '#070707',
        height: '100%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    container: {
        // backgroundColor: 'green',
        width: '90%',
        marginTop: 50,
        paddingBottom: 100
    },

    top: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginVertical: 50,
    },

    entryContainer: {
        // width: '100%',
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // flex
        gap: 5,
        marginBottom: 30
    },
  

    

})