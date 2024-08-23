import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, useColorScheme} from 'react-native';
import {useRouter, useLocalSearchParams} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function AddTaskScreen() {
    const [task, setTask] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { task: existingTask, index } = useLocalSearchParams();
    const colorScheme = useColorScheme();

    useEffect(() => {
        if (existingTask && index !== undefined) {
            const taskText = Array.isArray(existingTask) ? existingTask[0] : existingTask;
            setTask(taskText);
            setEditIndex(Array.isArray(index) ? parseInt(index[0]) : parseInt(index));
        }
    }, [existingTask, index]);

    const saveTask = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            const tasks = savedTasks ? JSON.parse(savedTasks) : [];

            const taskData = {
                text: task,
                createdAt: new Date().toISOString(),
            };

            if (editIndex !== null) {
                tasks[editIndex] = {
                    ...tasks[editIndex],
                    text: task,
                };
                setEditIndex(null);
            } else {
                tasks.push(taskData);
            }

            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            Alert.alert('Succès', 'Tâche enregistrée avec succès.');
            setTask('');
            router.back();
        } catch (error) {
            console.log('Échec de l\'enregistrement de la tâche.', error);
            Alert.alert('Erreur', 'Échec de l\'enregistrement de la tâche.');
        }
    };

    const isDarkMode = colorScheme === 'dark';

    return (
        <View style={[
            styles.container,
            {
                marginTop: insets.top,
                marginBottom: insets.bottom,
                marginLeft: insets.left,
                marginRight: insets.right,
                backgroundColor: isDarkMode ? '#000' : '#f0f0f0'
            }
        ]}>
            <TextInput
                placeholder="Enter task"
                placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
                value={task}
                onChangeText={setTask}
                style={[
                    styles.input,
                    {
                        borderColor: isDarkMode ? '#555' : 'gray',
                        color: isDarkMode ? '#fff' : '#000'
                    }
                ]}
            />
            <Button
                title="Enregistrer"
                onPress={saveTask}
                color={isDarkMode ? '#1e90ff' : '#007bff'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});
