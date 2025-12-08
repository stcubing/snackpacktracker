
import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function homescreen() {
    
    // const navigation = useNavigation();
    
    return (
        <View>
            <Text style={styles.heading}>snack pack tracker</Text>
            <Link href="/cameraPage" push asChild>
                <Button title="take pic" />
            </Link>
            <Link href="/camera" push asChild>
                <Button title="select image" />
            </Link>
        </View>
    )
}


const styles = StyleSheet.create({
    heading: {
        color: "#000000",
        fontSize: 30,
    }
})

