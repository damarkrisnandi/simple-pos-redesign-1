import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchbarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const Searchbar: React.FC<SearchbarProps> = ({ value, onChangeText, placeholder }) => {
    return (
        <View style={styles.container}>
            <Feather name="search" size={30} color="#888" style={{ marginRight: 8 }} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder || 'Search...'}
                placeholderTextColor="#888"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    input: {
        fontSize: 16,
        color: '#222',
    },
});

export default Searchbar;
