import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { jsonToCSV } from 'react-native-csv';

import { loadEntries, clearEntries, saveEntry } from '@/lib/storage';
import { Entry } from '@/types/entry';
import IconButton from '@/components/IconButton';
import TextButton from '@/components/TextButton';
import EntryButton from '@/components/EntryButton';



export default function library() {


    // const entryList: Entry[] = [];
    const [entryList, setEntrylist] = useState<Entry[]>([]);

    const [latestSort, setLatestSort] = useState<boolean>();
    const [oldestSort, setOldestSort] = useState<boolean>();
    const [bestSort, setBestSort] = useState<boolean>();
    const [worstSort, setWorstSort] = useState<boolean>();

    const [sortType, setSortType] = useState<string>('');


    let data: Entry[];
    
    useFocusEffect(
        useCallback(() => {
            
            const refreshData = async () => {
                console.log("refreshing data");
                switchSort(sortType);
            }

            refreshData();
            
        }, [])
    );
    
    useEffect(() => {
        // default sort type if none are selected
        if (!latestSort && !oldestSort && !bestSort && !worstSort) {
            console.log("no sorting method selected");
            switchSort("latest");
        }
        
    }, []);

    const switchSort = async (switchTo: string) => {
        data = await loadEntries();

        if (!data) {
            return;
        }
        switch (switchTo) {
            case "latest":
                data.sort((a, b) => a.ms - b.ms).reverse();
                setEntrylist(data);
        
                setLatestSort(true);
                setOldestSort(false);
                setBestSort(false);
                setWorstSort(false);
                break;
                
            case "oldest":
                data.sort((a, b) => a.ms - b.ms);
                setEntrylist(data);
                
                setLatestSort(false);
                setOldestSort(true);
                setBestSort(false);
                setWorstSort(false);
                break;

            case "best":
                data.sort((a, b) => a.rating - b.rating).reverse();
                setEntrylist(data);
                
                setLatestSort(false);
                setOldestSort(false);
                setBestSort(true);
                setWorstSort(false);
                break;
            
            case "worst":
                data.sort((a, b) => a.rating - b.rating);
                setEntrylist(data);
                
                setLatestSort(false);
                setOldestSort(false);
                setBestSort(false);
                setWorstSort(true);
                break;
        }
        setSortType(switchTo);
    }

    const importData = async (importType: string) => {

        // open documentpicker or whatveer to pick a file
        // read that file and convert it into an Entry[]

        
        // for each of these entries, make an image file in internal storage asw
        // oh actually idk how importing images works lol wtf
        
        // let importedEntries: Entry[]; // maybe define the shape first and for each thingy in the file fill out that shape IDK

        // if (importType == "overwrite") {
        //     console.log("overwrite");

        //     clearEntries();
            
            
        //     saveEntry(importedEntries); // instead of adding just save directly

        //     // replace thing with thing

        // } else {
        //     console.log("merge");
        //     // do the add thing
        //     let existing: Entry[] = await loadEntries();
        //     const newArray: Entry[] = [...existing, importedEntries];
        //     saveEntry(newArray);
        // }
        // router.replace("/library");
    }
    const exportData = async () => {
        data = await loadEntries();
        const csvData = jsonToCSV(data);
        console.log("exporting", csvData);

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();

        const filename = `spt${day}-${month}-${year}.csv`

        try {
            const file = new File(Paths.cache, filename);
            file.write(csvData);
            console.log("file says:", file.textSync());
            Sharing.shareAsync(file.uri);
        } catch (error) {
            console.error(error);
        }
        
    }

    
    return (
        <View style={styles.background}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.top} >
                    <IconButton onPress={() => router.push("/")} icon="arrow-back" size="small" />
                    <Text style={styles.heading}>library</Text>
                </View>

                <View style={styles.btnRow}>
                    <TextButton text="latest" onPress={() => switchSort("latest")} active={latestSort}/>
                    <TextButton text="oldest" onPress={() => switchSort("oldest")} active={oldestSort} />
                    <TextButton text="best" onPress={() => switchSort("best")} active={bestSort} />
                    <TextButton text="worst" onPress={() => switchSort("worst")} active={worstSort} />
                </View>

                <View style={styles.entryContainer}>
                    { entryList.map(entry => (
                        <EntryButton key={entry.id} id={entry.id} image={entry.photo} date={entry.date} />
                    ))}
                </View>

                <TextButton onPress={clearEntries} text="clear all"/>
                <View style={[styles.btnRow, styles.ioRow]}>
                    <TextButton text="overwrite" onPress={() => importData("overwrite")}/>
                    <TextButton text="merge" onPress={() => importData("merge")}/>
                    <TextButton text="export" onPress={exportData}/>
                </View>
                
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
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginBottom: 30,
    },

    btnRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 10,

    },
    ioRow: {
        marginTop: 10,
    }
  

    

})
