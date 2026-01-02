import { Pressable, StyleSheet, Text } from 'react-native';

import { MaterialIcons, FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';


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
        small: styles.small,
        shutter: styles.shutter,
    };

    // ionicons
    if (icon === 'dice' || icon === 'stats-chart') {
        return (
            <Pressable style={[styles.iconButton, sizeStyles[size]]} onPress={onPress}>
                <Ionicons name={icon} color="white" size={50} />
            </Pressable>
        );
    }

    // smaller
    if (size === 'small') {
        return (
            <Pressable style={[styles.iconButton, sizeStyles[size]]} onPress={onPress}>
                <MaterialIcons name={icon} color="white" size={30} />
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
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 10,
    },

    square: {
        height: 200,
        flex: 1,
    },
    smallRect: {
        flex: 1,
        height: 100,
    },
    largeRect: {
        width: '100%',
        height: 100,
    },
    small: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(15px)',
    },
    shutter: {
        padding: 30,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(15px)',
    }
});
