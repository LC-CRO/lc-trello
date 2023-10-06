import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Board, Column } from '../models/Board';

type RootStackParamList = {
    BoardDetail: {
        board: Board;
    };
    AddColumn: undefined;
    AddTask: {
        column: Column;
        boardId: string;
    };
};

type BoardDetailRouteProp = RouteProp<RootStackParamList, 'BoardDetail'>;
type BoardDetailNavigationProp = StackNavigationProp<RootStackParamList, 'BoardDetail'>;

interface BoardDetailProps {
    route: BoardDetailRouteProp;
    navigation: BoardDetailNavigationProp;
}

export default function BoardDetail({ route, navigation }: BoardDetailProps) {
    const [board, setBoard] = useState<Board>(route.params.board);

    const handleAddColumn = (updatedBoard: Board) => {
        setBoard(updatedBoard);
    };

    const handleAddTask = (column: Column, updatedColumn: Column) => {
        const updatedBoard = {
            ...board,
            columns: board.columns.map(col => col.id === column.id ? updatedColumn : col),
        };
        setBoard(updatedBoard);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{board.name}</Text>
            <FlatList
                data={board.columns}
                keyExtractor={(item) => item.id}
                renderItem={({ item: column }) => (
                    <View>
                        <Text>{column.name}</Text>
                        <Button title="Add Task" onPress={() => navigation.navigate('AddTask', { column, boardId: board.id, onGoBack: handleAddTask })} />
                    </View>
                )}
            />
            <Button title="Add Column" onPress={() => navigation.navigate('AddColumn', { board, onGoBack: handleAddColumn })} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});
