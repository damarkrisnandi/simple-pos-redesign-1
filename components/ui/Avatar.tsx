import { Colors } from '@/constants/Colors';
import { FontSizes, FontWeights } from '@/constants/Layout';
import React from 'react';
import { Image, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface AvatarProps {
    source?: { uri: string } | number;
    name?: string;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    variant?: 'circle' | 'square';
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;
    imageStyle?: ImageStyle;
    textStyle?: TextStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
    source,
    name,
    size = 'medium',
    variant = 'circle',
    backgroundColor = Colors.primary,
    textColor = Colors.white,
    style,
    imageStyle,
    textStyle,
}) => {
    const getInitials = (name: string) => {
        const names = name.trim().split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const containerStyle = [
        styles.container,
        styles[size],
        styles[variant],
        !source && { backgroundColor },
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`${size}Text`],
        { color: textColor },
        textStyle,
    ];

    const imageStyles = [
        styles.image,
        styles[size],
        styles[variant],
        imageStyle,
    ];

    if (source) {
        return (
            <View style={containerStyle}>
                <Image source={source} style={imageStyles} />
            </View>
        );
    }

    return (
        <View style={containerStyle}>
            <Text style={textStyles}>
                {name ? getInitials(name) : '?'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontWeight: FontWeights.semibold,
    },

    // Variants
    circle: {
        borderRadius: 9999,
    },
    square: {
        borderRadius: 8,
    },

    // Sizes
    small: {
        width: 32,
        height: 32,
    },
    medium: {
        width: 48,
        height: 48,
    },
    large: {
        width: 64,
        height: 64,
    },
    xlarge: {
        width: 96,
        height: 96,
    },

    // Text sizes
    smallText: {
        fontSize: FontSizes.xs,
    },
    mediumText: {
        fontSize: FontSizes.md,
    },
    largeText: {
        fontSize: FontSizes.lg,
    },
    xlargeText: {
        fontSize: FontSizes.xxl,
    },
});
