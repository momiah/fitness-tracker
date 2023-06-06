import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CaloriesToBurnTracker = ({ oncaloriesToBurnChange, handleTogglecaloriesToBurn }) => {
  const [caloriesToBurn, setcaloriesToBurn] = useState(0);
  const [inputcaloriesToBurn, setInputcaloriesToBurn] = useState('');

  const handleInputChange = (text) => {
    setInputcaloriesToBurn(text);
  };

  const handleAddcaloriesToBurn = () => {
    const parsedcaloriesToBurn = parseInt(inputcaloriesToBurn, 10);
    if (!isNaN(parsedcaloriesToBurn)) {
      setcaloriesToBurn(caloriesToBurn + parsedcaloriesToBurn);
      setInputcaloriesToBurn('');
      oncaloriesToBurnChange(caloriesToBurn + parsedcaloriesToBurn);
    }
  };

  const handleResetcaloriesToBurn = () => {
    setcaloriesToBurn(0);
    setInputcaloriesToBurn('');
    oncaloriesToBurnChange(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.back} onPress={handleTogglecaloriesToBurn}>
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
        value={inputcaloriesToBurn}
        onChangeText={handleInputChange}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddcaloriesToBurn}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResetcaloriesToBurn}>
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

