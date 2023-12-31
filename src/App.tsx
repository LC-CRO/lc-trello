// src/App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './navigation/TabNavigator';
import StackNavigator from './navigation/StackNavigator';

const RootStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator mode="modal" headerMode="none">
                <RootStack.Screen name="Main" component={TabNavigator} />
                <RootStack.Screen name="BoardModal" component={StackNavigator} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
