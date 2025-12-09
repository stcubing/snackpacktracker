
import { Link } from 'expo-router';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';


export default function homescreen() {
    
    // const navigation = useNavigation();
    
    return (
        <View>
            <Text style={styles.heading}>snack pack tracker</Text>

            <Link href="/cameraPage" push asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>take photo</Text>
                </Pressable>
            </Link>

            <Link href="/camera" push asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>from files</Text>
                </Pressable>
            </Link>
        </View>
    )
}


const styles = StyleSheet.create({
    heading: {
        color: "#000000",
        fontSize: 30,
    },
    button: {
        backgroundColor: 'blue',
        padding: 50,
        borderRadius: 20
    },
    text: {
        color: 'white',
        fontSize: 40
    }
})

