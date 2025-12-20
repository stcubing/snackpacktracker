import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    label: string;
    theme?: 'icon';
    onPress?: () => void;
}

export default function Button({ label, theme, onPress }: Props) {

    // if (theme === 'primary') {
    //     return (
    //         <View style={[styles.buttonContainer, { borderRadius: 18 },]}>
    //             <Pressable
    //                 style={[styles.button, { backgroundColor: '#fff' }]}
    //                 onPress={onPress}>
    //                 <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
    //             </Pressable>
    //         </View>
    //     )
    // }

    if (theme === 'icon') {
        return (
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={onPress}>
                    {/* <Text style={styles.buttonLabel}>{label}</Text> */}
                </Pressable>
            </View>
        )
    }


    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: 68,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 25
    }
});