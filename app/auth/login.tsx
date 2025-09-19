import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Colors } from '../../constants/Colors';
import usePost from '../../hooks/usePost';
import { useUserData } from '../../hooks/useUserData';
import { login } from '../../services/auth';

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Toast } from '../../components/ui/Toast';
import useToast from '../../hooks/useToast';

const Login = () => {
    const router = useRouter();
    const { saveUserData } = useUserData();
    const { toastVisible, toastMessage, toastVariant, showToast, hideToast, setToastVisible } = useToast();

    const {
        mutate: loginMutation,
        isLoading,
        // isSuccess,
    } = usePost({
        mutationFn: (data: any) => login(data),
        onSuccess: async (responseData) => {
            console.log("Login successful:", responseData);

            // Save user data to Redux and AsyncStorage
            if (responseData.data && responseData.data.token) {
                await saveUserData(responseData, responseData.data.token);
            }

            // Handle successful login, e.g., navigate to home screen or update auth state
            // Alert.alert("Login Successful", `Welcome ${(responseData as any).data.user.username}!`);
            showToast('Login successful!', 'success');
            setTimeout(() => {
                // Navigate to the home screen or main app content
                router.replace("/");
            }, 800); // Optional delay for better UX
        },
        onError: (error) => {
            console.error("Login failed:", error);
            // Handle login error, e.g., show an error message
            showToast(error.message || "An error occurred during login.", 'error');
        },
    });
    const { control, reset, handleSubmit } = useForm({
        resolver: zodResolver(z.object({
            email: z.string().email(),
            password: z.string().min(6),
        })),
    });

    const onSubmit = async (data: any) => {
        console.log("Login data:", { ...data }); // Mask password in logs
        await loginMutation(data);
        // hash(data.password, 10, (err, hash) => {
        //   if (err) {
        //     console.error('Error hashing password:', err);
        //     return;
        //   }
        //   console.log('Hashed password:', hash);
        //   data.password = hash; // Replace password with hashed version
        //   loginMutation(data);
    };



    return (
        <View style={styles.container}>
            <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 16, }}>
                    <View style={{ backgroundColor: Colors.secondary, padding: 4, paddingLeft: 8, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
                        <Text style={{ color: '#fff', fontWeight: 'light', fontSize: 24 }}>Simple</Text>
                    </View>
                    <View style={{ backgroundColor: Colors.primary, padding: 4, paddingRight: 8, borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
                        <Text style={{ color: '#7e7e7eff', fontWeight: 'bold', fontSize: 24 }}>POS</Text>
                    </View>
                </View>

                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View style={{ marginBottom: 5, gap: 2 }}>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                value={value}
                                onChangeText={onChange}
                            />
                        </View>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View style={{ marginBottom: 16, gap: 2 }}>
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry
                            />
                        </View>
                    )}
                />

                <Button title={isLoading ? 'Logging in...' : 'Login'} variant={isLoading ? 'secondary' : 'primary'} onPress={handleSubmit(onSubmit)} />
            </Card>

            <Toast
                visible={toastVisible}
                message={toastMessage}
                variant={toastVariant}
                onHide={() => setToastVisible(false)}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#f3f3f3',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginBottom: 32,
        alignSelf: 'center',
        color: '#333',
    },
    input: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Login;
