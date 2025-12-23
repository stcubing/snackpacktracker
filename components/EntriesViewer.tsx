import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';

import { saveEntry, loadEntries, clearEntries } from '@/lib/storage';
import { pickImageAsync } from '@/utils/imageUpload';
import { Entry } from '@/types/Entry';


export default function EntriesViewer() {

    // const views = []

    loadEntries().then(entries => {
        console.log(entries.length);
        // for (let i = 0; i < entries.length; i++) {

        //     let currentEntry = entries[i]
        //     console.log(i);
        //     console.log(currentEntry);

        //     // views.push(
        //     //     <View>
        //     //         <Text>{i}</Text>
        //     //         <Text>1</Text>
        //     //     </View>
        //     // )

            
        // }
    })
    
    return (
        <View>
            {entries[0]["id"]}
        </View>

    )
    // return (
    // )

}