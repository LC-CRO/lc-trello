
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { Auth as auth } from '../services/firebaseConfig';

const SignUpComponent: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <View>
            <TextInput placeholder="Email" onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

export default SignUpComponent;