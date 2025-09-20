import { useEffect, useState } from "react";
// import useCart from "./useCart";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categories";
import { getProducts } from "../services/products";

export interface Props {
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isAuthenticated?: boolean;
}

const useProductsAndCategories = ({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, isAuthenticated }: Props) => {
    // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    // const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery ?? '');
    // const { addToCart, productToCartItem, removeFromCart } = useCart();

    // Debounce searchQuery updates
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 400); // 400ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const { data: categoriesResponse, isLoading: isLoadingCategories, error: errorCategories } = useQuery(
        {
            queryKey: ['categories', isAuthenticated], queryFn: () => {
                if (!isAuthenticated) {
                    return Promise.resolve({ data: [] });
                }
                return getCategories();
            }
        }
    )

    const { data: productsResponse, isLoading: productsLoading, error: productsError } = useQuery(
        {
            queryKey: ['products', debouncedSearchQuery, selectedCategory, isAuthenticated], queryFn: () => {
                if (!isAuthenticated) {
                    return Promise.resolve({ data: [] });
                }
                return getProducts({ search: debouncedSearchQuery, category: selectedCategory })
            },
        } // Replace with actual product fetching function
    )

    const isLoading = isLoadingCategories || productsLoading;
    const error = errorCategories || productsError;

    return { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, isLoading, error, products: productsResponse?.data, categories: categoriesResponse?.data };
}

export default useProductsAndCategories;
