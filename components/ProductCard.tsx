import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import useCart from '../hooks/useCart';
import { Card } from './ui/Card';

type ProductCardProps = {
    id: number | string;
    image: string;
    name: string;
    description: string;
    price: string | number;
    onAddToCart?: () => void;
    onRemoveFromCart?: () => void;
    itemsCount?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, description, price, onAddToCart, onRemoveFromCart, itemsCount }) => {
    const { items } = useCart();
    return (
        // <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
        <Card style={styles.card}>
            <>
                <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{name}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={styles.price}>${price}</Text>
                        <View style={{ width: 80, backgroundColor: '#eee', borderRadius: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <TouchableOpacity
                                style={[
                                    styles.buttonChangeQty,
                                    { backgroundColor: Colors.secondary }
                                ]}

                                onPress={onRemoveFromCart} activeOpacity={0.7} >
                                <Feather name="minus" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#222' }}>{items?.find(i => i.productId === id)?.quantity ?? 0}</Text>
                            <TouchableOpacity
                                style={[
                                    styles.buttonChangeQty,
                                    { backgroundColor: Colors.primary }
                                ]}
                                onPress={onAddToCart} activeOpacity={0.7} >
                                <Feather name="plus" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        </Card>
        // </TouchableOpacity>
    )
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
        width: 160,
        padding: 0,
    },
    image: {
        width: '100%',
        height: 120,
        backgroundColor: '#eee',
    },
    info: {
        padding: 12,
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

export default ProductCard;
