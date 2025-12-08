import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, View, Text, StyleSheet } from "react-native";



export default function mediaPage() {
    const { media, type } = useLocalSearchParams(); // params from camera
    const router = useRouter();

    console.log(`displaying photo ${media}`)
    
    return (
        <View>
            <Text>your image</Text>
            <Image source={{ uri: media }} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    }

})