import { Pressable, StyleSheet, Text } from 'react-native';
import { useFonts, FiraCode_400Regular } from '@expo-google-fonts/fira-code';


import { MaterialIcons, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';


type Props = {
    text: string;
    onPress: () => void;
};

export default function IconButton({ text, onPress }: Props) {

    const [fontsLoaded] = useFonts({ FiraCode_400Regular });

    return (
        <Pressable style={styles.buttonWrapper} onPress={onPress}>
            <Text style={styles.buttonText} >{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        backgroundColor: '#141414', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,

        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 10,
    },
    buttonText: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
    
});
