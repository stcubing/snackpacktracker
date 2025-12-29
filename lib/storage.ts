import { Entry } from '@/types/entry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';



export async function saveEntry(value: Entry[]) {
    try {
        await AsyncStorage.setItem("entries", JSON.stringify(value));
        console.log(`saved array!!`);
    } catch (e) {
        console.error('error: ', e);
    }
}

export async function loadEntries(): Promise<Entry[]> {
    const encoded = await AsyncStorage.getItem("entries");

    // check if empty
    if (encoded === null) {
        return [];
    }

    try {
        return JSON.parse(encoded) as Entry[];
    } catch (e) {
        console.error('error: ', e);
        return [];
    }
}

export async function clearEntries(): Promise<void> {
    
    AsyncStorage.setItem("entries", "");
    console.log("successfully cleared entries");
}

// get specific entry from id (library -> entry page)
export async function getEntry(id: string) {
    const entries = await Promise.all(await loadEntries());

    const matching = entries.find(item => item.id == id);

    if (matching) {    
        console.log("found");
    
        const foundEntry: Entry = {
            id: matching["id"],
            photo: matching["photo"],
            date: matching["date"],
            time: matching["time"],
            ms: matching["ms"],
            base: matching["base"],
            meat: matching["meat"],
            sauce: matching["sauce"],
            rating: matching["rating"],
            notes: matching["notes"],

        }
        return foundEntry;
    }
}

// delete specific entry based on id
export async function deleteEntry(id: string) {
    const entries = await Promise.all(await loadEntries());
    const matching = entries.find(item => item.id == id); // gets entry with matching id
    
    if (matching) {
        const uri: string = matching["photo"];

        if (Platform.OS !== 'web') {
            console.log("deleting image", uri);

            // BROKEN DELETING SYSTEM.. doesnt work unless i make a dev build 
            try {
                const { status } = await MediaLibrary.requestPermissionsAsync(false, ['photo']);
    
                if (status === 'granted') {
                    console.log("deleting access granted");
                    const asset = await MediaLibrary.getAssetsAsync(uri);
                    await MediaLibrary.deleteAssetsAsync([asset])
                }

            } catch {
                console.log("error adsfjhdfja")
            }

        }

        
        const index = entries.indexOf(matching);
        console.log("removing at index", index);

        entries.splice(index, 1);
        await AsyncStorage.setItem("entries", JSON.stringify(entries));
        console.log(entries);
    }
}
