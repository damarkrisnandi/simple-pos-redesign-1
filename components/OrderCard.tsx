import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import useCart from '../hooks/useCart';
import { CartItem } from '../models/product';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';

type OrdersCardProps = CartItem & {
    onAddToCart?: () => void;
    onRemoveFromCart?: () => void;
    itemsCount?: number;
};

const OrdersCard: React.FC<OrdersCardProps> = ({
    id,
    image,
    name,
    description,
    price,
    onAddToCart,
    onRemoveFromCart,
    itemsCount
}) => {
    const { items } = useCart();
    const quantity = () => (items?.find(i => i.productId === id)?.quantity ?? 0);

    return (
        <Card style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 }}>
                <Image source={{ uri: image ?? 'https://via.placeholder.com/150' }} style={styles.image} resizeMode="cover" />
                <View style={[styles.info, { width: '70%' }]}>
                    <Text style={styles.title} numberOfLines={1}>{name}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={styles.price}>${price}</Text>
                        <Badge
                            size="medium"
                            variant="primary"
                            label={'Total: $' + (quantity() * price).toFixed(2)}
                            textStyle={{ fontSize: 14, fontWeight: '600', color: Colors.secondary }}
                            style={{ marginLeft: 'auto', marginRight: 4 }}
                        />
                        <View style={{ width: 80, backgroundColor: '#eee', borderRadius: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <TouchableOpacity
                                style={[
                                    styles.buttonChangeQty,
                                    { backgroundColor: Colors.secondary }
                                ]}
                                onPress={onRemoveFromCart}
                                activeOpacity={0.7}
                                disabled={!onRemoveFromCart}
                            >
                                <Feather name="minus" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#222' }}>{quantity()}</Text>
                            <TouchableOpacity
                                style={[
                                    styles.buttonChangeQty,
                                    { backgroundColor: Colors.primary }
                                ]}
                                onPress={onAddToCart}
                                activeOpacity={0.7}
                                disabled={!onAddToCart}
                            >
                                <Feather name="plus" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        // margin: 8,
        overflow: 'hidden',
        width: '100%',
        padding: 0,
    },
    image: {
        width: 90,
        height: 90,
        backgroundColor: '#eee',
        backgroundImage: 'url(https://via.placeholder.com/150)'
    },
    info: {
        // padding: 12,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#222',
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#388e3c',
    },
    buttonChangeQty: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 50
    }
});

export default OrdersCard;
