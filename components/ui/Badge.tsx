import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { BorderRadius, FontSizes, Spacing } from '../../constants/Layout';

interface BadgeProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'small' | 'medium' | 'large';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
    label,
    variant = 'primary',
    size = 'medium',
    style,
    textStyle,
}) => {
    const badgeStyle = [
        styles.base,
        styles[variant],
        styles[size],
        style,
    ];

    const textStyleCombined = [
        styles.text,
        styles[`${size}Text`],
        textStyle,
    ];

    return (
        <View style={badgeStyle}>
            <Text style={textStyleCombined}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: BorderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },

    // Variants
    primary: {
        backgroundColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    success: {
        backgroundColor: Colors.success,
    },
    warning: {
        backgroundColor: Colors.warning,
    },
    error: {
        backgroundColor: Colors.error,
    },
    info: {
        backgroundColor: Colors.gray,
    },

    // Sizes
    small: {
        paddingHorizontal: Spacing.xs,
        paddingVertical: 2,
        minHeight: 20,
    },
    medium: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        minHeight: 24,
    },
    large: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        minHeight: 32,
    },

    // Text styles
    text: {
        color: Colors.white,
        fontWeight: '600',
    },
    smallText: {
        fontSize: FontSizes.xs,
    },
    mediumText: {
        fontSize: FontSizes.sm,
    },
    largeText: {
        fontSize: FontSizes.md,
    },
});
