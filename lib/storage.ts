import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entry } from '@/types/entry';


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
