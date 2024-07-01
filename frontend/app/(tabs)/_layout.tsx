import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {Tabs} from 'expo-router';
import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].text,
                tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].textDisabledColor,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Accueil',
                    tabBarIcon: ({focused}) => <Ionicons
                        name={focused ? "home" : "home-outline" }
                        size={24}
                        color={Colors[colorScheme ?? 'light'].itemBackground}
                    />,
                }}
            />
            <Tabs.Screen
                name="group"
                options={{
                    title: 'Groupes',
                    tabBarIcon: ({focused}) => <Ionicons
                        name={focused ? "people" : "people-outline"}
                        size={24}
                        color={Colors[colorScheme ?? 'light'].itemBackground}
                    />,
                }}
            />
            <Tabs.Screen
                name="message"
                options={{
                    title: 'Messages',
                    tabBarIcon: ({focused}) => <MaterialCommunityIcons
                        name={focused ? "message-text" : "message-text-outline"}
                        size={24}
                        color={Colors[colorScheme ?? 'light'].itemBackground} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({focused}) => <Ionicons
                        name={focused ? "settings" : "settings-outline"}
                        size={24}
                        color={Colors[colorScheme ?? 'light'].itemBackground}
                    />,
                }}
            />
        </Tabs>
    );
}
