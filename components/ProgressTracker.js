import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepCounterComponent from './components/StepCounter';

const App = () => {
    const [showStepCounter, setShowStepCounter] = useState(false);
    const [steps, setSteps] = useState(0);

    const handleToggleStepCounter = () => {
        setShowStepCounter(!showStepCounter);
    };

    const handleStepsChange = (newSteps) => {
        setSteps(newSteps);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Fitness Tracker</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.stepsTitle} onPress={handleToggleStepCounter}>Steps</Text>
                {showStepCounter && <StepCounterComponent onStepsChange={handleStepsChange} />}
                <View style={styles.stepsDisplay}>
                    <Text style={styles.stepsText}>Current Steps: {steps}</Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#007AFF',
        paddingVertical: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    stepsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    stepsDisplay: {
        marginTop: 20,
        alignItems: 'center',
    },
    stepsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default App;
