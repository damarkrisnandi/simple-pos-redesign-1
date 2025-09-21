import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
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
    const { toastVisible, toastMessage, toastVariant, showToast, setToastVisible } = useToast();

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
    const { control, handleSubmit } = useForm({
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
            {/* <StatusBar barStyle="light-content" backgroundColor={Colors.primary} /> */}

            {/* Header Section */}
            <View style={styles.headerSection}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoWrapper}>
                        <View style={styles.logoLeft}>
                            <Text style={styles.logoTextLeft}>Simple</Text>
                        </View>
                        <View style={styles.logoRight}>
                            <Text style={styles.logoTextRight}>POS</Text>
                        </View>
                    </View>
                    <Text style={styles.welcomeText}>Welcome back!</Text>
                    <Text style={styles.subtitleText}>Sign in to continue to your account</Text>
                </View>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
                {/* <Card style={styles.loginCard} variant="elevated"> */}
                <Text style={styles.loginTitle}>Login</Text>

                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            value={value}
                            onChangeText={onChange}
                            variant="outlined"
                            containerStyle={styles.inputContainer}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                            variant="outlined"
                            containerStyle={styles.inputContainer}
                        />
                    )}
                />

                <Button
                    title={isLoading ? 'Signing in...' : 'Sign In'}
                    icon={isLoading ? undefined : 'log-in'}
                    variant="primary"
                    size="large"
                    fullWidth
                    loading={isLoading}
                    onPress={handleSubmit(onSubmit)}
                    style={styles.loginButton}
                />

                <View style={styles.helpSection}>
                    <Text style={styles.helpText}>Need help? Contact support</Text>
                </View>
                {/* </Card> */}
            </View>

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
        backgroundColor: Colors.primary,
    },
    headerSection: {
        flex: 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        // paddingTop: 16,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoWrapper: {
        flexDirection: 'row',
        marginBottom: 24,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    logoLeft: {
        backgroundColor: Colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    logoRight: {
        backgroundColor: Colors.white,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    logoTextLeft: {
        color: Colors.white,
        fontSize: 28,
        fontWeight: '300',
        letterSpacing: 1,
    },
    logoTextRight: {
        color: Colors.secondary,
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 16,
        color: Colors.secondary,
        opacity: 0.9,
        textAlign: 'center',
        fontWeight: '300',
    },
    formSection: {
        flex: 0.55,
        backgroundColor: Colors.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 10,
        marginTop: -16,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    loginCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 32,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 20,
    },
    loginButton: {
        marginTop: 16,
        borderRadius: 16,
        elevation: 4,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    helpSection: {
        marginTop: 24,
        alignItems: 'center',
    },
    helpText: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});

export default Login;
