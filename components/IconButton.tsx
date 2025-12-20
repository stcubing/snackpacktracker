import { Pressable, StyleSheet, Text } from 'react-native';

import { MaterialIcons, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';

type ButtonSize = 'square' | 'smallRect' | 'largeRect';


type Props = {
    icon: keyof typeof MaterialIcons.glyphMap | keyof typeof Ionicons.glyphMap;
    size: string;
    onPress: () => void;
};

export default function IconButton({ icon, size, onPress }: Props) {
    const sizeStyles = {
        square: styles.square,
        smallRect: styles.smallRect,
        largeRect: styles.largeRect,
    };

    if (icon === 'dice') {
        return (
            <Pressable style={[styles.iconButton, sizeStyles[size]]} onPress={onPress}>
                <Ionicons name="dice" color="white" size={50} />
            </Pressable>
        );
    } else if (icon === 'stats-chart') {
        return (
            <Pressable style={[styles.iconButton, sizeStyles[size]]} onPress={onPress}>
                <Ionicons name="stats-chart" color="white" size={50} />
            </Pressable>
        );
    }

    return (
        <Pressable style={[styles.iconButton, sizeStyles[size]]} onPress={onPress}>
            <MaterialIcons name={icon} color="white" size={50} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        backgroundColor: '#141414', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#505050',
        borderWidth: 2,
        
    },
    square: {
        height: 200,
        width: '49%',
    },
    smallRect: {
        width: '49%',
        // width: 200,
        height: 100,
    },
    largeRect: {
        width: '100%',
        height: 100,
    }
});
