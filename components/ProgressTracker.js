import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProgressTracker = ({ onProgressChange }) => {
    const [progress, setProgress] = useState(0);
    const [inputProgress, setInputProgress] = useState('');
  
    const handleInputChange = (text) => {
      setInputProgress(text);
    };
  
    const handleAddProgress = () => {
      const parsedProgress = parseInt(inputProgress, 10);
      if (!isNaN(parsedProgress)) {
        setProgress(progress + parsedProgress);
        setInputProgress('');
        onProgressChange(progress + parsedProgress);
      } 
    };
  
    const handleResetProgress = () => {
      setProgresss(0);
      setInputProgress('');
      onProgressChange(0);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Calories To Burn: {progress} Kcal</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Calories To Burn"
          value={inputProgress}
          onChangeText={handleInputChange}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddProgress}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleResetProgress}>
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
    color: 'white'
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

export default ProgressTracker;

