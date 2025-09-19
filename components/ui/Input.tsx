import { Colors } from '@/constants/Colors';
import { BorderRadius, FontSizes, Spacing } from '@/constants/Layout';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    hint?: string;
    variant?: 'default' | 'outlined' | 'filled';
    size?: 'small' | 'medium' | 'large';
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    hint,
    variant = 'outlined',
    size = 'medium',
    containerStyle,
    labelStyle,
    inputStyle,
    onFocus,
    onBlur,
    ...textInputProps
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const inputContainerStyle = [
        styles.inputContainer,
        styles[variant],
        styles[size],
        isFocused && styles.focused,
        error && styles.error,
        inputStyle,
    ];

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={[styles.label, labelStyle]}>{label}</Text>
            )}
            <View style={inputContainerStyle}>
                <TextInput
                    style={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor={Colors.gray}
                    {...textInputProps}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {hint && !error && <Text style={styles.hintText}>{hint}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: FontSizes.sm,
        color: Colors.text,
        marginBottom: Spacing.xs,
        fontWeight: '500',
    },
    inputContainer: {
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    input: {
        fontSize: FontSizes.md,
        color: Colors.text,
    },

    // Variants
    default: {
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    outlined: {
        backgroundColor: Colors.white,
    },
    filled: {
        backgroundColor: Colors.background,
        borderColor: 'transparent',
    },

    // Sizes
    small: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        minHeight: 36,
    },
    medium: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        minHeight: 44,
    },
    large: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        minHeight: 52,
    },

    // States
    focused: {
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    error: {
        borderColor: Colors.error,
    },
    errorText: {
        fontSize: FontSizes.xs,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
    hintText: {
        fontSize: FontSizes.xs,
        color: Colors.gray,
        marginTop: Spacing.xs,
    },
});
