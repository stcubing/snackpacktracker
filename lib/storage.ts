import { Entry } from '@/types/entry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';



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

    try {
        const assets = await MediaLibrary.getAssetsAsync();
        const confirmation = await MediaLibrary.deleteAssetsAsync(assets["assets"]);
    
        if (confirmation) {
            AsyncStorage.setItem("entries", "");
            console.log("successfully cleared entries");
            router.replace({ pathname: "/library" });
        }
        
    } catch {
        console.log("clearing cancelled");
    }
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
            location: matching["location"],
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

                const assets = await MediaLibrary.getAssetsAsync();
                const specificAsset = assets["assets"].find(item => item.uri === uri);

                if (specificAsset) {
                    console.log("specific asset:", specificAsset);
                    const confirmation = await MediaLibrary.deleteAssetsAsync([specificAsset]);

                    if (confirmation) {
                        console.log("deletion proceed");
    
                        const index = entries.indexOf(matching);
                        console.log("removing at index", index);
                
                        entries.splice(index, 1);
                        await AsyncStorage.setItem("entries", JSON.stringify(entries));
                        console.log(entries);
                    }
                }

            } catch {
                console.log("deletion denied")
            }

        }

        
    }
}
