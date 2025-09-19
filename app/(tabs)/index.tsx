import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import Searchbar from "../../components/Searchbar";
import { Button } from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useProductsAndCategories from "../../hooks/useProductsAndCategories";
import { useUserData } from "../../hooks/useUserData";

// Define RootState type for proper typing
type RootState = {
  user: {
    userInfo: any | null;
    loading: boolean;
    error: string | null;
  };
  auth: {
    isAuthenticated: boolean;
    user: any | null;
  };
};

export default function Index() {
  const auth = useAuth();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const { addToCart, productToCartItem, removeFromCart } = useCart();

  const { isLoading, error, products, categories } = useProductsAndCategories({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery });

  // Using the useUserData hook to access user data
  const { userInfo, loading: userLoading, clearUserData } = useUserData();

  // Alternative: Direct access from Redux store
  const userFromRedux = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (auth.loading) {
      // Optionally, you can show a loading indicator here
      return;
    }
    if (!auth.isAuthenticated) {
      // Redirect to login if not authenticated
      setTimeout(() => {
        router.replace("/auth/login");
      }, 700); // Optional delay for better UX
    }
  }, [auth.isAuthenticated, auth.loading, router]);

  if (auth.loading || userLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Please log in to continue.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.container}>
            <Searchbar value={searchQuery} onChangeText={setSearchQuery} placeholder="Search..." />
            {/* HEADER SECTION */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, width: '100%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedCategory ? categories.find((cat: any) => cat.id === selectedCategory)?.name : "All Items"}</Text>

              <Button title="See All" size="small" variant="ghost" onPress={() => { setSelectedCategory(null); }} />
            </View>

            {/* CATEGORIES SECTION */}
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
              {/* <Button title="+ Add" size="small" variant="secondary" onPress={() => { }} /> */}
              <Button title="All Items" size="small" variant={selectedCategory === null ? "primary" : "secondary"} onPress={() => { setSelectedCategory(null); }} />
              {/* <View style={{ width: 1, backgroundColor: '#ccc', marginHorizontal: 5 }} />
              {categories && categories.map((category: { id: string; name: string; }) => (
                <Button key={category.id} title={category.name} size="small" variant={selectedCategory === category.id ? "primary" : "secondary"} onPress={() => { setSelectedCategory(category.id); }} />
              ))} */}
            </View>
          </View>
        </View>
      </>
    );

  }

  if (error) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Error occured</Text>
        </View>
      </>
    );
  }

  // Extract user name from different possible data structures
  const getUserName = () => {
    if (userInfo?.data?.user?.username) {
      return userInfo.data.user.username;
    }
    if (userFromRedux?.data?.user?.username) {
      return userFromRedux.data.user.username;
    }
    if (userInfo?.user?.name) {
      return userInfo.user.name;
    }
    return "user";
  };


  return (
    <View style={styles.container}>

      {/* <Button title="Category 3" size="small" variant={selectedCategory === "category3" ? "primary" : "secondary"} onPress={() => { setSelectedCategory("category3"); }} /> */}
      {/* PRODUCTS LIST */}
      <FlatList
        data={products.products}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        renderItem={({ item }: any) => (
          <View style={{ position: 'relative', }}>
            <ProductCard {...item} onPress={() => {
              if (productToCartItem(item)) {
                removeFromCart(item.id);
              } else {
                addToCart(item);
              }
            }} />
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 10 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
                <Text style={{ color: '#888', marginTop: 4 }}>${item.price.toFixed(2)}</Text>
              </View>
              <Button
                title={productToCartItem(item) ? "Remove" : "Add"}
                size="small"
                variant={productToCartItem(item) ? "danger" : "primary"}
                onPress={() => {
                  if (productToCartItem(item)) {
                    removeFromCart(item.id);
                  } else {
                    addToCart(item);
                  }
                }}
              />
            </View> */}
          </View>
        )}
        keyExtractor={(item: { id: number }) => item.id.toString()}
        style={{ flex: 1, flexDirection: 'column' }}
        ListHeaderComponent={
          <>
            <Searchbar value={searchQuery} onChangeText={setSearchQuery} placeholder="Search..." />
            {/* HEADER SECTION */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, width: '100%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedCategory ? categories.find((cat: any) => cat.id === selectedCategory)?.name : "All Items"}</Text>

              <Button title="See All" size="small" variant="ghost" onPress={() => { setSelectedCategory(null); }} />
            </View>

            {/* CATEGORIES SECTION */}
            <View style={{ flexDirection: 'row', gap: 3, marginBottom: 20, flexWrap: 'wrap' }}>
              {/* <Button title="+ Add" size="small" variant="secondary" onPress={() => { }} /> */}
              <Button title="All Items" size="small" variant={selectedCategory === null ? "primary" : "secondary"} onPress={() => { setSelectedCategory(null); }} />
              <View style={{ width: 1, backgroundColor: '#ccc', marginHorizontal: 5 }} />
              {categories && categories.map((category: { id: string; name: string; }) => (
                <Button key={category.id} title={category.name} size="small" variant={selectedCategory === category.id ? "primary" : "secondary"} onPress={() => { setSelectedCategory(category.id); }} />
              ))}
            </View>
          </>
        }
        ListEmptyComponent={
          <Text>No products found</Text>
        }
      />

      {/* ITEMS LIST */}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 50,
    height: '30%',
    paddingBottom: 100,
  }
})
