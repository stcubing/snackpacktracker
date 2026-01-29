import { Entry } from '@/types/entry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { router } from 'expo-router';



export async function saveEntry(values: Entry[]) {
    try {
        await AsyncStorage.setItem("entries", JSON.stringify(values));
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

export async function clearEntries(from?: string): Promise<void> {


    // if on web, skip internal storage management
    if (Platform.OS !== "web") {
        // const perm = await MediaLibrary.requestPermissionsAsync()  whatever bro
        try {
            // const album = await MediaLibrary.getAlbumAsync("snackpacktracker");
            // const album = await MediaLibrary.getAlbumAsync();
            // MediaLibrary.deleteAlbumsAsync([album]);
            
            const assets = await MediaLibrary.getAssetsAsync();
            await MediaLibrary.deleteAssetsAsync(assets["assets"]);
            
        } catch (error) {
            console.log("clearing cancelled", error);
            return; // comment out if in go UNCOMMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!UNCOMMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!UNCOMMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    }
    await AsyncStorage.setItem("entries", JSON.stringify([]));
    console.log("successfully cleared entries");

    if (from == "direct") {
        router.replace("/library")
    };

    
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


    console.log("matching:", matching);
    
    if (matching) {
        const uri: string = matching["photo"];

        if (Platform.OS !== 'web') {
            console.log("deleting image", uri);

            try {
                // const album = await MediaLibrary.getAlbumAsync("snackpacktracker");
                // const assets = await MediaLibrary.getAssetsAsync({album});
                const assets = await MediaLibrary.getAssetsAsync();
                console.log("assets", assets)
                const specificAsset = assets["assets"].find(item => item.uri === uri);

                if (specificAsset) {
                    console.log("specific asset:", specificAsset);
                    await MediaLibrary.deleteAssetsAsync([specificAsset]);
                } else {
                    console.log("cannot find asset");
                }
                
            } catch (error) {
                console.log("deletion denied", error);
                return; // UNCOMMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!UNCOMMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!UNCOMMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!UNCOMMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }
    
        }
        console.log("deletion proceed");

        const index = entries.indexOf(matching);
        console.log("removing at index", index);

        entries.splice(index, 1);
        await AsyncStorage.setItem("entries", JSON.stringify(entries));
        console.log(entries);

        
    }
}

// export async function saveLocation(loc: string) {
//     try {
//         console.log('saved LOCAIOTN!! as', loc);
//         await AsyncStorage.setItem("location", loc);
//     } catch (e) {
//         console.error('error: ', e);
//     }
// }
// export async function getLocation() {
//     console.log("trying to fetch location");
//     const fetchedLocation = await AsyncStorage.getItem("location");

//     if (fetchedLocation) {
//         console.log("location found from storage");
//         return fetchedLocation;
//     } else {
//         console.log("n location found");
//     }
// }
// export async function clearLocation() {
//     console.log("clearing location");
//     await AsyncStorage.setItem("location", "");
// }
