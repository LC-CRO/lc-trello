
import React from "react";
import { View, Text } from "react-native";

interface ColumnProps {
    title: string;

}

const ColumnComponent: React.FC<ColumnProps> = ({ title }) => {
    return (
        <View>
            <Text>{title}</Text>

        </View>
    );
};

export default ColumnComponent;