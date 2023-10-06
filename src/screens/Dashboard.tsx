import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Db } from '../services/firebaseConfig';
import { Board } from '../models/Board';

export default function Dashboard() {
    const [boards, setBoards] = useState<Board[]>([]);
    const [newBoardName, setNewBoardName] = useState<string>('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = Db.collection('boards').onSnapshot(snapshot => {
            const boardsData: Board[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Board }));
            setBoards(boardsData);
        });

        return () => unsubscribe();
    }, []);

    const addBoard = async () => {
        if (newBoardName) {
            try {
                await Db.collection('boards').add({ name: newBoardName, columns: [] });
                setNewBoardName('');
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
                value={newBoardName}
                onChangeText={setNewBoardName}
                placeholder="Enter new board name"
            />
            <Button title="Add Board" onPress={addBoard} />

            <FlatList
                data={boards}
                keyExtractor={item => item.id || String(item)}
                renderItem={({ item }: { item: Board }) => (
                    <View style={styles.boardItem}>
                        <Text style={styles.boardTitle} onPress={() => navigation.navigate('BoardDetail', { board: item })}>{item.name}</Text>
                    </View>
                )}
            />
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
    },
    boardItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    boardTitle: {
        fontSize: 16,
    },
});
