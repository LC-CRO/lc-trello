// src/screens/AddColumn.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Db } from '../services/firebaseConfig';

type RouteParams = {
    boardId: string;
};

export default function AddColumn() {
    const [columnName, setColumnName] = useState('');
    const route = useRoute();
    const navigation = useNavigation();
    const boardId: string = (route.params as RouteParams).boardId;

    const handleAddColumn = async () => {
        if (columnName.trim() === '') {
            Alert.alert('Error', 'Please enter a valid column name.');
            return;
        }

        const boardRef = Db.collection('boards').doc(boardId);
        const boardData = (await boardRef.get()).data();

        if (!boardData) return;

        const newColumn = {
            id: Math.random().toString(36).substr(2, 9),
            name: columnName,
            tasks: []
        };

        const updatedColumns = boardData.columns ? [...boardData.columns, newColumn] : [newColumn];

        await boardRef.update({
            columns: updatedColumns
        });

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Column Name"
                value={columnName}
                onChangeText={setColumnName}
            />
            <Button title="Add Column" onPress={handleAddColumn} />
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
