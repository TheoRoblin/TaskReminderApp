import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="add-task"
                    options={{
                        title: 'Add Task',
                        tabBarIcon: ({color, focused}) => (
                            <TabBarIcon name={focused ? 'add' : 'add-outline'} color={color}/>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}
