import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { BorderRadius, Shadows, Spacing } from '../../constants/Layout';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'none' | 'small' | 'medium' | 'large';
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'medium',
    style,
}) => {
    const cardStyle = [
        styles.base,
        styles[variant],
        styles[padding],
        style,
    ];

    return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
    base: {
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.card,
    },

    // Variants
    default: {
        ...Shadows.small,
    },
    elevated: {
        ...Shadows.large,
    },
    outlined: {
        borderWidth: 1,
        borderColor: Colors.border,
        shadowOpacity: 0,
        elevation: 0,
    },

    // Padding
    none: {
        padding: 0,
    },
    small: {
        padding: Spacing.sm,
    },
    medium: {
        padding: Spacing.md,
    },
    large: {
        padding: Spacing.lg,
    },
});
