
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/Dashboard';
import BoardDetail from '../screens/BoardDetail';
import AddColumn from '../screens/AddColumn';
import AddTask from '../screens/AddTask';
import AddBoard from '../screens/AddBoard';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerTitle: 'Your Boards' }}
            />
            <Stack.Screen
                name="BoardDetail"
                component={BoardDetail}
                options={{ headerTitle: 'Board Details' }}
            />
            <Stack.Screen
                name="AddColumn"
                component={AddColumn}
                options={{ headerTitle: 'Add Column' }}
            />
            <Stack.Screen
                name="AddTask"
                component={AddTask}
                options={{ headerTitle: 'Add Task' }}
            />
            <Stack.Screen
                name="AddBoard"
                component={AddBoard}
                options={{ headerTitle: 'Add Board' }}
            />
        </Stack.Navigator>
    );
}
