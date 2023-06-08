import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CaloriesToBurnTracker = ({ onCaloriesToBurnChange, handleToggleCaloriesToBurn }) => {
  const [caloriesToBurn, setCaloriesToBurn] = useState(0);
  const [inputCaloriesToBurn, setInputCaloriesToBurn] = useState('');

  const handleInputChange = (text) => {
    setInputCaloriesToBurn(text);
  };

  const handleAddCaloriesToBurn = () => {
    const parsedcaloriesToBurn = parseInt(inputCaloriesToBurn, 10);
    if (!isNaN(parsedcaloriesToBurn)) {
      setCaloriesToBurn(caloriesToBurn + parsedcaloriesToBurn);
      setInputCaloriesToBurn('');
      onCaloriesToBurnChange(caloriesToBurn + parsedcaloriesToBurn);
    }
  };

  const handleResetCaloriesToBurn = () => {
    setCaloriesToBurn(0);
    setInputCaloriesToBurn('');
    onCaloriesToBurnChange(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.back} onPress={handleToggleCaloriesToBurn}>
        ⇐
      </Text>
      <Text style={styles.text}>Calories To Burn</Text>
      <View style={styles.outputContainer}>
        <Text style={{ fontSize: 100, position: 'relative', left: 30 }}>{caloriesToBurn} <Text style={{ fontSize: 20, position: 'relative', right: 30 }}>Kcal</Text></Text>
      </View>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Calories To Burn"
        value={inputCaloriesToBurn}
        onChangeText={handleInputChange}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddCaloriesToBurn}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResetCaloriesToBurn}>
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

export default CaloriesToBurnTracker;

