import { Colors } from '@/constants/Colors';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Layout';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

const { width } = Dimensions.get('window');

interface ToastProps {
    message: string;
    visible: boolean;
    duration?: number;
    variant?: 'success' | 'error' | 'warning' | 'info';
    position?: 'top' | 'bottom';
    onHide?: () => void;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export const Toast: React.FC<ToastProps> = ({
    message,
    visible,
    duration = 3000,
    variant = 'info',
    position = 'top',
    onHide,
    containerStyle,
    textStyle,
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;

    useEffect(() => {
        if (visible) {
            // Show animation
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto hide after duration
            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        } else {
            hideToast();
        }
    }, [visible]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: position === 'top' ? -100 : 100,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onHide?.();
        });
    };

    if (!visible) {
        return null;
    }

    const toastStyle = [
        styles.toast,
        styles[variant],
        styles[position],
        containerStyle,
        {
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
        },
    ];

    return (
        <Animated.View style={toastStyle}>
            <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
                {message}
            </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        left: Spacing.md,
        right: Spacing.md,
        zIndex: 1000,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        ...Shadows.large,
        borderLeftWidth: 4,
    },

    // Positions
    top: {
        top: 50,
    },
    bottom: {
        bottom: 50,
    },

    // Variants
    success: {
        borderLeftColor: Colors.success,
        backgroundColor: '#F0F9FF',
    },
    error: {
        borderLeftColor: Colors.error,
        backgroundColor: '#FEF2F2',
    },
    warning: {
        borderLeftColor: Colors.warning,
        backgroundColor: '#FFFBEB',
    },
    info: {
        borderLeftColor: Colors.primary,
        backgroundColor: '#F0F9FF',
    },

    // Text
    text: {
        fontSize: FontSizes.md,
        lineHeight: 20,
    },
    successText: {
        color: '#166534',
    },
    errorText: {
        color: '#991B1B',
    },
    warningText: {
        color: '#92400E',
    },
    infoText: {
        color: '#1E40AF',
    },
});
