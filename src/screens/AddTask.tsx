// src/screens/AddTask.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Db } from '../services/firebaseConfig';

type RouteParams = {
    boardId: string;
    columnId: string;
};

export default function AddTask() {
    const [taskName, setTaskName] = useState('');
    const route = useRoute();
    const navigation = useNavigation();
    const { boardId, columnId } = route.params as RouteParams;

    const handleAddTask = async () => {
        if (taskName.trim() === '') {
            Alert.alert('Error', 'Please enter a valid task name.');
            return;
        }

        const boardRef = Db.collection('boards').doc(boardId);
        const boardData = (await boardRef.get()).data();

        if (!boardData || !boardData.columns) return;

        const newTask = {
            id: Math.random().toString(36).substr(2, 9),
            name: taskName,
            images: []
        };

        const updatedColumns = boardData.columns.map((column: any) => {
            if (column.id === columnId) {
                column.tasks.push(newTask);
            }
            return column;
        });

        await boardRef.update({
            columns: updatedColumns
        });

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Task Name"
                value={taskName}
                onChangeText={setTaskName}
            />
            <Button title="Add Task" onPress={handleAddTask} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        marginBottom: 16,
    },
});
