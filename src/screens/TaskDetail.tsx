import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { Db } from '../services/firebaseConfig';
import { Task, Column } from '../models/Board';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    TaskDetail: {
        task: Task;
        boardId: string;
        columnId: string;
    };
};

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;
type TaskDetailNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetail'>;

interface TaskDetailProps {
    route: TaskDetailRouteProp;
    navigation: TaskDetailNavigationProp;
}

export default function TaskDetail(props: TaskDetailProps) {
    const { route, navigation } = props;
    const initialTask: Task = route.params.task;
    const boardId: string = route.params.boardId;
    const columnId: string = route.params.columnId;
    const [task, setTask] = useState(initialTask);

    const updateTask = async () => {
        try {
            const boardRef = Db.collection('boards').doc(boardId);
            const doc = await boardRef.get();
            const boardData = doc.data();

            if (boardData && boardData.columns) {
                await boardRef.update({
                    columns: boardData.columns.map((col: Column) =>
                        col.id === columnId
                            ? { ...col, tasks: col.tasks.map((t: Task) => t.id === task.id ? task : t) }
                            : col
                    )
                });
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update task.');
        }
    };

    const deleteTask = async () => {
        try {
            const boardRef = Db.collection('boards').doc(boardId);
            const doc = await boardRef.get();
            const boardData = doc.data();

            if (boardData && boardData.columns) {
                await boardRef.update({
                    columns: boardData.columns.map((col: Column) =>
                        col.id === columnId
                            ? { ...col, tasks: col.tasks.filter((t: Task) => t.id !== task.id) }
                            : col
                    )
                });
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete task.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={task.name}
                onChangeText={(text) => setTask(prev => ({ ...prev, name: text }))}
            />
            <TextInput
                style={styles.input}
                value={task.description}
                onChangeText={(text) => setTask(prev => ({ ...prev, description: text }))}
                multiline
            />
            {task.images && task.images.map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={{ width: 100, height: 100 }} />
            ))}
            <Button title="Update Task" onPress={updateTask} />
            <Button title="Delete Task" onPress={deleteTask} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 16,
    },
});
