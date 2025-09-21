import Feather from '@expo/vector-icons/Feather';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '../constants/Colors';
import { useNavigationHandler } from '../hooks/useNavigationHandler';
import { useUserData } from '../hooks/useUserData';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';



const CustomDrawer = (props: any) => {
    const { userInfo, loading: userLoading } = useUserData();
    const { safeGoBack } = useNavigationHandler();
    const navigation = useNavigation();

    const router = useRouter();
    return (
        <DrawerContentScrollView {...props}>

            <View style={{ flexDirection: 'row', gap: 15 }}>
                <Button
                    icon="arrow-left"
                    iconOnly
                    variant="secondary"
                    size="small"
                    onPress={() => {

                        safeGoBack();
                        props.navigation.closeDrawer()
                    }}
                />
                <Button
                    title='Home'
                    onPress={() => props.navigation.closeDrawer()}
                    style={{ flex: 1 }}
                    textStyle={{ color: Colors.secondary }}
                    variant='primary'
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    props.navigation.closeDrawer();
                    router.push('/profile');
                }} style={{ padding: 20, marginTop: 20, backgroundColor: Colors.grayLight, borderRadius: 10 }}>
                    {userLoading ? (
                        <Text>Loading...</Text>
                    ) : userInfo && userInfo.data && userInfo.data.user ? (
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Avatar size='medium' variant='circle' name={userInfo.data.user.username}
                                        style={{ backgroundColor: Colors.secondaryDark }}
                                        textStyle={{ color: Colors.primary }}

                                    />
                                    <View>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{userInfo.data.user.username}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 12, color: '#666' }}>{userInfo.data.user.email}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Feather name="chevron-right" size={20} color="#666" />
                            </View>
                        </View>
                    ) : (
                        <Text>No user information available.</Text>
                    )}
                </TouchableOpacity>

                <Button
                    title='Order History'

                    style={{ marginTop: 10, backgroundColor: Colors.grayLight }}
                    textStyle={{ color: Colors.secondary }}
                    onPress={() => {
                        props.navigation.closeDrawer();
                        // navigation.navigate('/profile');
                    }}
                />
                <Button
                    title='Analytics'

                    style={{ marginTop: 5, backgroundColor: Colors.grayLight }}
                    textStyle={{ color: Colors.secondary }}
                    onPress={() => {
                        props.navigation.closeDrawer();
                        // navigation.navigate('/profile');
                    }}
                />
            </View>

        </DrawerContentScrollView >
    );
};

const DrawerLayout = (props: any) => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{ headerShown: false }}
            />
        </GestureHandlerRootView>

    );
}

export default DrawerLayout;
