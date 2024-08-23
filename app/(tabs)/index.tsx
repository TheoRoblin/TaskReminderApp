import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Button, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import TaskCard from "@/components/TaskCard";
import {ThemedText} from "@/components/ThemedText";

export default function TaskListScreen() {
    const [tasks, setTasks] = useState([]);
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();

    const loadTasks = async () => {
        const savedTasks = await AsyncStorage.getItem('tasks');
        setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const navigateToAddTask = (task = null, index = -1) => {
        router.push({
            pathname: '/add-task',
            params: {
                task,
                index,
                onReturn: () => { loadTasks(); }
            },
        });
    };

    const deleteTask = async (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const isDarkMode = colorScheme === 'dark';

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: isDarkMode ? '#000' : '#f0f0f0',
                marginTop: insets.top,
                marginBottom: insets.bottom,
                marginLeft: insets.left,
                marginRight: insets.right
            }
        ]}>
            <ThemedText style={styles.title}>Task Reminder</ThemedText>
            <FlatList
                data={tasks}
                renderItem={({ item, index }) => (
                    <TaskCard
                        item={item}
                        index={index}
                        isDarkMode={isDarkMode}
                        navigateToAddTask={navigateToAddTask}
                        deleteTask={deleteTask}
                    />
                )}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
        margin: 15
    }
});