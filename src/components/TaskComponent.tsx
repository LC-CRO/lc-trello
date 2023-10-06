
import React from "react";
import { View, Text } from "react-native";

interface TaskProps {
    title: string;
    description: string;

}

const TaskComponent: React.FC<TaskProps> = ({ title, description }) => {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{description}</Text>

        </View>
    );
};

export default TaskComponent;