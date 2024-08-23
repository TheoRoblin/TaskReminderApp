import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Button from "@/components/Button";

export default function TaskCard ({ item, index, isDarkMode, navigateToAddTask, deleteTask }: any){
    return (
        <View style={[
            styles.card,
            { backgroundColor: isDarkMode ? '#333' : '#fff' }
        ]}>
            <Text style={[
                styles.taskText,
                { color: isDarkMode ? '#fff' : '#000' }
            ]}>
                {item.text}
            </Text>
            <Text style={[
                styles.dateText,
                { color: isDarkMode ? '#aaa' : '#666' }
            ]}>
                Créée le : {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            <View style={styles.buttonContainer}>
                <Button
                    text="Modifier"
                    onPress={() => navigateToAddTask(item.text, index)}
                    style={{
                        borderRadius: 5,
                        marginRight: 10
                    }}
                    textStyle={{
                        color: '#1e90ff',
                        fontSize: 18
                    }}
                />
                <Button
                    text="Supprimer"
                    onPress={() => deleteTask(index)}
                    style={{
                        borderRadius: 5,
                    }}
                    textStyle={{
                        color: 'red',
                        fontSize: 18
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    taskText: {
        fontSize: 18,
        marginBottom: 10,
    },
    dateText: {
        fontSize: 14,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

