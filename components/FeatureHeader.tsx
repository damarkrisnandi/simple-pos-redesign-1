import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface FeatureHeaderProps {
    title: string;
    subtitle?: string;
    navigateTo?: string;
}

const ProfileNav = () => {
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity onPress={() => router.push('/profile')}>
                <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const HomeNav = () => {
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity onPress={() => router.push('/')}>
                <Feather name="grid" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({ title, subtitle, navigateTo }) => (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>


            {
                navigateTo === 'profile' ? <ProfileNav /> : <HomeNav />
            }
        </View>

    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: Colors.primary,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    subtitle: {
        fontSize: 10,
        color: '#666',
        marginTop: 1,
    },
});

export default FeatureHeader;
