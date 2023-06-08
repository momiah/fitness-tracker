import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const StepCounterComponent = ({ onStepsChange, handleToggleStepCounter }) => {
    const [steps, setSteps] = useState(0);
    const [inputSteps, setInputSteps] = useState('');

    const handleInputChange = (text) => {
        setInputSteps(text);
    };

    const handleAddSteps = () => {
        const parsedSteps = parseInt(inputSteps, 10);
        if (!isNaN(parsedSteps)) {
            setSteps(steps + parsedSteps);
            setInputSteps('');
            onStepsChange(steps + parsedSteps);
        }
    };

    const handleResetSteps = () => {
        setSteps(0);
        setInputSteps('');
        onStepsChange(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.back} onPress={handleToggleStepCounter} >
                ⇐
            </Text>
            <Text style={styles.text}>Steps Taken (0.05 Kcal P/h)</Text>
            <View style={styles.outputContainer}>
                <Text style={{ fontSize: 100, position: 'relative', left: 30 }}>{steps} </Text>
                <Text style={{ fontSize: 20, position: 'relative', top: 85 }}>Steps</Text>
            </View>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter steps"
                value={inputSteps}
                onChangeText={handleInputChange}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddSteps}>
                    <Text style={styles.buttonText}>Add Steps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleResetSteps}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: 300,
        width: 350,
        borderRadius: 30,
        backgroundColor: '#e0e0e0',
        zIndex: 3
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#161616'
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        position: 'relative',

        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#00008B',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: 130
    },
    buttonText: {
        color: '#e0e0e0',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    back: {
        position: 'absolute',
        top: 2,
        left: 10,
        fontSize: 30,
        fontWeight: 'bold',
        zIndex: 1,
        color: '#161616'
    },
    outputContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    }
});

export default StepCounterComponent;

