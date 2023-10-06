// src/screens/AddBoard.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Db } from '../services/firebaseConfig';

export default function AddBoard() {
    const navigation = useNavigation();

    const [boardName, setBoardName] = useState<string>('');

    const addNewBoard = async () => {
        if (boardName.trim()) {
            try {
                const newBoard = {
                    id: `${Date.now()}`,
                    name: boardName,
                    columns: []
                };

                await Db.collection('boards').doc(newBoard.id).set(newBoard);
                navigation.goBack();

            } catch (error) {
                Alert.alert('Error', 'Failed to add board.');
            }
        } else {
            Alert.alert('Error', 'Board name cannot be empty.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={boardName}
                onChangeText={setBoardName}
                placeholder="Enter board name"
            />
            <Button title="Add Board" onPress={addNewBoard} />
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
        borderBottomWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});
