import React from 'react';
import { router, Tabs } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import AvatarIcon from "react-native-paper/src/components/Avatar/AvatarIcon";

import { Avatar } from "react-native-paper";
import TopBar from "@/components/TopBar";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <>
            <TopBar onBellPress={() => {
                router.navigate('/settings/Notifications');
            }} />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].text,
                    tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].textDisabledColor,
                    headerShown: false,
                    tabBarStyle: {
                        paddingBottom: 0
                    },
                }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: '',
                        tabBarIcon: ({ focused }) => <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={28}
                            color={Colors[colorScheme ?? 'light'].itemBackground}
                        />,
                    }}
                />
                <Tabs.Screen
                    name="addPlavons"
                    options={{
                        title: '',
                        tabBarIcon: ({ focused }) => <FontAwesome
                            name="calendar-plus-o"
                            size={24}
                            color={Colors[colorScheme ?? 'light'].itemBackground}
                        />,
                    }}
                />
                <Tabs.Screen
                    name="group"
                    options={{
                        title: '',
                        tabBarIcon: ({ focused }) => <Ionicons
                            name={focused ? "people" : "people-outline"}
                            size={32}
                            color={Colors[colorScheme ?? 'light'].itemBackground}
                        />,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: '',
                        tabBarIcon: ({ focused }) => <Avatar.Image
                            size={32}
                            source={require("@/assets/images/avatar-default.png")} />,
                    }}
                />
            </Tabs>
        </>
    );
}
