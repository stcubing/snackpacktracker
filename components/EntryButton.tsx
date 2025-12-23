import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';


// type Props = {
//     image: string | string[]
//     date: string
//     onPress: () => any;
// };

export default function EntryButton({ image, date, onPress }) {

    return (
        <Pressable onPress={onPress} style={styles.entry}>
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