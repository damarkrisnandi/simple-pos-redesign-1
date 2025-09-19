import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '../../constants/Layout';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    style,
    textStyle,
}) => {
    const buttonStyle = [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
    ];

    const textStyleCombined = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
                />
            ) : (
                <Text style={textStyleCombined}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        ...Shadows.small,
    },

    // Variants
    primary: {
        backgroundColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        borderColor: Colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
    danger: {
        backgroundColor: Colors.error,
    },

    // Sizes
    small: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        minHeight: 32,
    },
    medium: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        minHeight: 44,
    },
    large: {
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        minHeight: 52,
    },

    // States
    disabled: {
        backgroundColor: Colors.grayLight,
        borderColor: Colors.grayLight,
    },
    fullWidth: {
        width: '100%',
    },

    // Text styles
    text: {
        fontWeight: FontWeights.semibold,
        textAlign: 'center',
    },
    primaryText: {
        color: Colors.white,
    },
    secondaryText: {
        color: Colors.white,
    },
    outlineText: {
        color: Colors.primary,
    },
    ghostText: {
        color: Colors.primary,
    },
    dangerText: {
        color: Colors.white,
    },
    disabledText: {
        color: Colors.gray,
    },

    // Text sizes
    smallText: {
        fontSize: FontSizes.sm,
    },
    mediumText: {
        fontSize: FontSizes.md,
    },
    largeText: {
        fontSize: FontSizes.lg,
    },
});
