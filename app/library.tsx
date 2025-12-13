import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';

import { saveEntry, loadEntries, clearEntries } from '@/lib/storage';
import { pickImageAsync } from '@/utils/imageUpload';
import { Entry } from '@/types/entry';

import EntriesViewer from '@/components/EntriesViewer';


// async function fetchData() {


//     const resultsArray = [];

//     const promArray = await Promise.all(await loadEntries());

//     for (let i = 0; i < promArray.length; i++) {
//         resultsArray.push(promArray[i]);
//     }

//     return resultsArray;

// }

export default function library() {

    // useEffect(() => {
    //     const init = async () => {

    //     }
    // }, []);
    // console.log("jkahsdlkasdjhhdasjkkjhldasljhkasdhjkldaslkhj")

 

    // const views = []

    // loadEntries().then(entries => {
    //     console.log(entries.length);
    //     for (let i = 0; i < entries.length; i++) {

    //         let currentEntry = entries[i]
    //         console.log(i);
    //         console.log(currentEntry);

    //         views.push(
    //             <View>
    //                 <Text>{i}</Text>
    //                 <Text>1</Text>
    //             </View>
    //         )

    //         // return (
    //         //     <View>
    //         //         <Text>hi</Text>
    //         //         <Text>{currentEntry["id"]}</Text>
    //         //     </View>
    //         // )
    //     }
    // })
    // console.log(loadEntries().then(data => data));

    // console.log(fetchData);
    // console.log(gurt);
    // console.log(fetchData().length);

    // console.log(`number of entries: ${loadEntries().then[Promise].length}`);
    // console.log(loadEntries);

    // const views = [];
    // for (let i = 0; i < loadEntries().then.length; i++) {
    //     console.log(`gurt: ${i}`)
    //     views.push(
    //         <View key={i}>
    //             <Text>{i}</Text>
    //         </View>
    //     )
    // }

    return (
        <ScrollView>

            <Text>library</Text>
            <EntriesViewer />
            
        </ScrollView>
    )
}