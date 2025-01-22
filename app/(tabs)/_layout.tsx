// React Core
import React from 'react';

// Expo
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
    return (
        <Tabs initialRouteName='index' screenOptions={{ headerTitleAlign: 'center' }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Inicio',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <Ionicons name='home' size={30} color={color} />,
                }}
            />
            <Tabs.Screen
                name='map'
                options={{
                    title: 'Mapa',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <Ionicons name='map' size={30} color={color} />,
                }}
            />
            <Tabs.Screen
                name='builds'
                options={{
                    title: 'Edificios',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <Ionicons name='business' size={30} color={color} />,
                }}
            />
            <Tabs.Screen
                name='department'
                options={{
                    title: 'Servicios y Departamentos',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <Ionicons name='desktop' size={30} color={color} />,
                }}
            />
            <Tabs.Screen
                name='contact'
                options={{
                    title: 'Contactanos',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <Ionicons name='accessibility' size={30} color={color} />,
                }}
            />
        </Tabs>
    );
}
