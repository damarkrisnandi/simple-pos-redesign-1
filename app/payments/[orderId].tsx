import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FeatureHeader from '../../components/FeatureHeader';
import { Button } from '../../components/ui/Button';
import { Divider } from '../../components/ui/Divider';
import { Colors } from '../../constants/Colors';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useProductsAndCategories from '../../hooks/useProductsAndCategories';
import { Product } from '../../models/product';

const TAX_RATE = 0.1; // 10% tax rate
const SHIPPING_FEE = 5.0; // Flat shipping fee

const Payments: React.FC = () => {
    const auth = useAuth();
    // Extract orderId from the URL parameters
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
    const { items } = useCart();
    const { products } = useProductsAndCategories({ selectedCategory: null, searchQuery: '', isAuthenticated: auth.isAuthenticated });

    const total = items.reduce((total, item) => {
        const product = products?.products?.find((p: Product) => p.id === item.productId);
        return Math.floor((total + (product ? product.price * item.quantity : 0)) * 100) / 100;
    }, 0);

    const handlePayment = () => {
        // Handle payment logic here
        console.log('Processing payment for order:', orderId);
    };

    return (
        <>
            <FeatureHeader title={`Payment`} subtitle={`Payments for Order #${orderId}`} navigateTo='home' />
            <View style={styles.container}>
                {/* <Text style={styles.title}>Payment for Order #{orderId}</Text> */}
                {total > 0 &&
                    <View style={{ padding: 16, width: '100%', borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fafafa' }}>

                        <View style={{ width: '100%', height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 12, color: '#222' }}>Total</Text>
                            <Text style={{ fontSize: 12, color: '#222' }}>${total.toFixed(2)}</Text>
                        </View>
                        <View style={{ width: '100%', height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 12, color: '#222' }}>10% Tax Rate</Text>
                            <Text style={{ fontSize: 12, color: '#222' }}>${(total * TAX_RATE).toFixed(2)}</Text>
                        </View>
                        <View style={{ width: '100%', height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 12, color: '#222' }}>Shipping Fee</Text>
                            <Text style={{ fontSize: 12, color: '#222' }}>${SHIPPING_FEE.toFixed(2)}</Text>
                        </View>
                        <Divider style={{ marginVertical: 5 }} />
                        <View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 18, color: '#222' }}>Grand Total</Text>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#222' }}>${(total * (1 + TAX_RATE) + SHIPPING_FEE).toFixed(2)}</Text>
                        </View>
                    </View>}

                <Button
                    title="Simulate Payment"
                    onPress={() => { handlePayment(); }}
                    style={{ marginTop: 20, width: '90%' }}
                    variant='primary'
                    size='medium'
                    disabled={items.length === 0}
                    textStyle={{ fontSize: 18, fontWeight: '600', color: Colors.secondary }}
                    loading={false}
                />
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
        padding: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Payments;
