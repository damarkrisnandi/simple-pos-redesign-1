import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '../../constants/Layout';

interface ButtonProps {
    title?: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: keyof typeof Feather.glyphMap;
    iconOnly?: boolean;
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
    icon,
    iconOnly = false,
    style,
    textStyle,
}) => {
    // Determine if we should show the icon only
    const isIconOnly = iconOnly && icon;

    // Get icon size based on button size
    const getIconSize = () => {
        switch (size) {
            case 'small':
                return 16;
            case 'large':
                return 24;
            default:
                return 20;
        }
    };

    // Get icon color based on variant
    const getIconColor = () => {
        if (disabled) return Colors.gray;

        switch (variant) {
            case 'outline':
            case 'ghost':
                return Colors.primary;
            default:
                return Colors.white;
        }
    };

    const buttonStyle = [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        isIconOnly && styles.iconOnly,
        style,
    ];

    const textStyleCombined = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
        textStyle,
    ];

    const renderContent = () => {
        if (loading) {
            return (
                <ActivityIndicator
                    size="small"
                    color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
                />
            );
        }

        if (isIconOnly) {
            return (
                <Feather
                    name={icon!}
                    size={getIconSize()}
                    color={getIconColor()}
                />
            );
        }

        if (icon && title) {
            return (
                <View style={styles.iconTextContainer}>
                    <Feather
                        name={icon}
                        size={getIconSize()}
                        color={getIconColor()}
                        style={styles.iconWithText}
                    />
                    <Text style={textStyleCombined}>{title}</Text>
                </View>
            );
        }

        if (icon && !title) {
            return (
                <Feather
                    name={icon}
                    size={getIconSize()}
                    color={getIconColor()}
                />
            );
        }

        return <Text style={textStyleCombined}>{title}</Text>;
    };

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {renderContent()}
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

    // Icon styles
    iconOnly: {
        paddingHorizontal: Spacing.sm,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWithText: {
        marginRight: Spacing.xs,
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
