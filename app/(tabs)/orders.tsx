import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FeatureHeader from '../../components/FeatureHeader';
import OrdersCard from '../../components/OrderCard';
import { Button } from '../../components/ui/Button';
import { Divider } from '../../components/ui/Divider';
import { Colors } from '../../constants/Colors';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useProductsAndCategories from '../../hooks/useProductsAndCategories';
import { Product } from '../../models/product';

const TAX_RATE = 0.1; // 10% tax rate
const SHIPPING_FEE = 5.0; // Flat shipping fee

const Orders = () => {
    const auth = useAuth();
    const { items, addToCart, productToCartItem, removeFromCart } = useCart();
    const { products } = useProductsAndCategories({ selectedCategory: null, searchQuery: '', isAuthenticated: auth.isAuthenticated });

    const total = items.reduce((total, item) => {
        const product = products?.products?.find((p: Product) => p.id === item.productId);
        return Math.floor((total + (product ? product.price * item.quantity : 0)) * 100) / 100;
    }, 0);
    return (
        <>
            <FeatureHeader title="Orders" subtitle="View and manage your orders" navigateTo='profile' />
            <View style={styles.container}>

                {/* <Button title="Category 3" size="small" variant={selectedCategory === "category3" ? "primary" : "secondary"} onPress={() => { setSelectedCategory("category3"); }} /> */}
                {/* PRODUCTS LIST */}
                <FlatList
                    data={products?.products?.filter((product: Product) => items.some(item => item.productId === product.id)) ?? []}
                    numColumns={1}

                    renderItem={({ item }: any) => (
                        <View style={{ position: 'relative', width: '100%', marginBottom: 12 }}>
                            <OrdersCard {...item}
                                onAddToCart={() => addToCart(productToCartItem(item))}
                                onRemoveFromCart={() => removeFromCart(item.id)}
                                itemsCount={0}
                            />

                        </View>
                    )}

                    ListHeaderComponent={
                        <View style={{ width: '100%', paddingHorizontal: 16, marginBottom: 8 }}>

                        </View>
                    }
                    keyExtractor={(item: { id: number }) => item.id.toString()}
                    style={{ flex: 1, flexDirection: 'column', width: '100%', paddingHorizontal: 16 }}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ fontSize: 16, color: '#888', textAlign: 'center' }}>No orders yet. Start adding some products to your cart!</Text>
                        </View>

                    }
                />

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
                    title="Proceed to Checkout"
                    onPress={() => { }}
                    style={{ marginTop: 20, width: '90%' }}
                    variant='primary'
                    size='medium'
                    disabled={items.length === 0}
                    textStyle={{ fontSize: 18, fontWeight: '600', color: Colors.secondary }}
                    loading={false}
                />
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Orders;
