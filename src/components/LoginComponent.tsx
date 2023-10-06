
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { Auth as auth } from '../services/firebaseConfig';

const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <View>
            <TextInput placeholder="Email" onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginComponent;