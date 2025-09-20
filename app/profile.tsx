import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FeatureHeader from '../components/FeatureHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import useAuth from '../hooks/useAuth';
import { useUserData } from '../hooks/useUserData';

const Profile = () => {

    const auth = useAuth();
    const router = useRouter();


    // Using the useUserData hook to access user data
    const { userInfo, loading: userLoading, clearUserData } = useUserData();

    const handleLogout = async () => {
        await clearUserData();
        router.replace("/auth/login");
    };

    if (auth.loading || userLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!auth.isAuthenticated) {
        router.replace("/auth/login");
        return null; // Or a loading indicator
    }

    return (
        <>
            <FeatureHeader title="Profile" subtitle="Manage your account" navigateTo="home" />
            <View style={styles.container}>
                <Card style={{ padding: 20, width: '90%' }}>
                    <Text style={styles.title}>Profile</Text>
                    {userInfo && userInfo.data && userInfo.data.user ? (
                        <>
                            <Text style={{ marginTop: 10 }}>Name: {(userInfo.data.user.username)}</Text>
                            <Text style={{ marginTop: 10 }}>Email: {userInfo.data.user.email}</Text>
                        </>
                    ) : (
                        <Text style={{ marginTop: 10 }}>No user information available.</Text>
                    )}
                    <Button title="Logout" onPress={handleLogout} style={{ marginTop: 20 }} variant='danger' size='medium' />
                </Card>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Profile;
