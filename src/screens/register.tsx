import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Auth as auth } from '../services/firebaseConfig';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegistration = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            Alert.alert('Registration successful!');
        } catch (error) {
            Alert.alert('Error registering!', (error as Error).message);
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
            <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Register" onPress={handleRegistration} />
        </View>
    );
}
