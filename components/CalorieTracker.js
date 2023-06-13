import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CalorieTracker = ({ onCaloriesChange, handleToggleCalorieTracker, toggleRecipeGen, calories, setCalories }) => {
    const [inputCalories, setInputCalories] = useState('');


    const handleInputChange = (text) => {
        setInputCalories(text);
    };

    const handleAddCalories = () => {
        const parsedCalories = parseInt(inputCalories, 10);
        if (!isNaN(parsedCalories)) {
            setCalories(calories + parsedCalories);
            setInputCalories('');
            onCaloriesChange(calories + parsedCalories);
        }
    };

    const handleResetCalories = () => {
        setCalories(0);
        setInputCalories('');
        onCaloriesChange(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.back} onPress={handleToggleCalorieTracker}>
                ⇐
            </Text>

            <Text style={styles.text}>Calories Consumed</Text>
            <View style={styles.outputContainer}>
                <Text style={{ fontSize: 100, position: 'relative', left: 30 }}>{calories} <Text style={{ fontSize: 20, position: 'relative', right: 30 }}>Kcal</Text></Text>
            </View>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter Calories"
                value={inputCalories}
                onChangeText={handleInputChange}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddCalories}>
                    <Text style={styles.buttonText}>Add Calories</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleResetCalories}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, { width: '85%', marginTop: -10 }]} onPress={handleResetCalories}>
                <Text style={styles.buttonText} onPress={() => toggleRecipeGen()}>Generate Your Own Recipe!</Text>
            </TouchableOpacity>
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
        height: 400,
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
        width: '85%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 8,
        position: 'relative',
        top: 10,
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

export default CalorieTracker;