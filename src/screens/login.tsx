import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Auth as auth } from '../services/firebaseConfig';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            Alert.alert('Logged in successfully!');
        } catch (error) {
            Alert.alert('Error logging in!', (error as Error).message);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
