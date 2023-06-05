import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const StepCounterComponent = ({ onStepsChange }) => {
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
        <Text style={styles.text}>Steps: {steps}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 200
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 130
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
    image:{
    height: 50,
    width: 50
  }
});

export default StepCounterComponent;

