import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import DrawerLayout from "../components/Drawer";

const queryClient = new QueryClient();
export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <DrawerLayout>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
                        <Stack.Screen name="auth/login" options={{ title: "Login", headerShown: false }} />
                        <Stack.Screen name="profile" options={{ title: "Profile", headerShown: false }} />
                        <Stack.Screen name="payments/[orderId]" options={{ title: "Payments", headerShown: false }} />
                    </Stack>
                </DrawerLayout>
            </Provider>
        </QueryClientProvider>
    );
}
