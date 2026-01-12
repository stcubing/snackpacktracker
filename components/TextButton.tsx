import { Pressable, StyleSheet, Text } from 'react-native';
import { useFonts, FiraCode_400Regular, FiraCode_600SemiBold } from '@expo-google-fonts/fira-code';


import { MaterialIcons, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';


type Props = {
    text: string;
    active?: boolean;
    onPress: () => void;
};

export default function TextButton({ text, active, onPress }: Props) {

    const [fontsLoaded] = useFonts({ FiraCode_400Regular, FiraCode_600SemiBold });

    if (active) {
        return (
            <Pressable style={[styles.buttonWrapper, styles.activeWrapper]} onPress={onPress}>
                <Text style={[styles.buttonText, styles.activeText]} >{text}</Text>
            </Pressable>
        );
    } else {
        return (
            <Pressable style={styles.buttonWrapper} onPress={onPress}>
                <Text style={styles.buttonText} >{text}</Text>
            </Pressable>
        );

    }
}

const styles = StyleSheet.create({
    buttonWrapper: {
        flex: 1,
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
        fontFamily: 'FiraCode_600SemiBold',
        color: 'white',
        fontSize: 20,
    },

    activeWrapper: {
        backgroundColor: '#e9e9e9',
    },
    activeText: {
        color: '#141414',
    }
    
});
