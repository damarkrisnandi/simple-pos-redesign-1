import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FeatureHeader from '../../components/FeatureHeader';

const Orders = () => {
    return (
        <>
            <FeatureHeader title="Orders" subtitle="View and manage your orders" navigateTo='profile' />
            <View style={styles.container}>
                <Text style={styles.title}>Orders Screen</Text>
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

export default Orders;
