import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { getEntry } from '@/lib/storage';


// type Props = {
//     image: string | string[]
//     date: string
//     onPress: () => any;
// };

export default function EntryButton({ id, image, date }) {

    async function toEntry(id: any) {
        console.log("pressed", id);

        const entry = await getEntry(id);
        console.log(entry);

        if (!entry) return;

        router.push({
            pathname: "/media",
            params: {
                id: id,
                media: image,
                type: "view",
                date: entry["date"],
                time: entry["time"],
                ms: entry["ms"],
                location: entry["location"],
                base: entry["base"],
                meat: entry["meat"],
                sauce: entry["sauce"],
                rating: entry["rating"],
                notes: entry["notes"]
            }
        })
    }

    return (
        <Pressable onPress={() => toEntry(id)} style={styles.entry}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
            </View>
            <Text style={styles.entryDate}>{date}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    
    entry: {
        marginVertical: 5,
        // backgroundColor: 'lightgrey',
        borderRadius: 10,
        width: '32%',
        // height: '100%',
        // margin: 5,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },

    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: '100%',
        // height: '100%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
    },
    entryDate: {
        fontFamily: 'FiraCode_400Regular',
        color: "#ffffff",
        fontSize: 15,
    },

})