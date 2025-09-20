import { Colors } from '@/constants/Colors';
import { FontSizes, Spacing } from '@/constants/Layout';
import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'solid' | 'dashed' | 'dotted';
    thickness?: number;
    color?: string;
    length?: number | string;
    label?: string;
    style?: ViewStyle;
    labelStyle?: TextStyle;
}

export const Divider: React.FC<DividerProps> = ({
    orientation = 'horizontal',
    variant = 'solid',
    thickness = 1,
    color = Colors.border,
    length = '100%',
    label,
    style,
    labelStyle,
}) => {
    const isHorizontal = orientation === 'horizontal';

    const dividerStyle = [
        styles.base,
        {
            [isHorizontal ? 'height' : 'width']: thickness,
            [isHorizontal ? 'width' : 'height']: length,
            backgroundColor: variant === 'solid' ? color : 'transparent',
            borderColor: color,
            borderStyle: variant,
            [isHorizontal ? 'borderTopWidth' : 'borderLeftWidth']: variant !== 'solid' ? thickness : 0,
        },
        style,
    ];

    if (label && isHorizontal) {
        return (
            <View style={styles.labelContainer}>
                <View style={[dividerStyle, styles.labelDivider]} />
                <Text style={[styles.label, labelStyle]}>{label}</Text>
                <View style={[dividerStyle, styles.labelDivider]} />
            </View>
        );
    }

    return <View style={dividerStyle} />;
};

const styles = StyleSheet.create({
    base: {
        alignSelf: 'center',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    labelDivider: {
        flex: 1,
    },
    label: {
        fontSize: FontSizes.sm,
        color: Colors.gray,
        marginHorizontal: Spacing.md,
    },
});
