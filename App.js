import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import StepCounterComponent, {steps} from './components/StepCounter';
import CalorieTracker from './components/CalorieTracker';

const App = () => {
  const [showStepCounter, setShowStepCounter] = useState(false);
  const [showCalorieTracker, setShowCalorieTracker] = useState(false);
  const [steps, setSteps] = useState(0);
 

  const handleToggleStepCounter = () => {
    setShowStepCounter(!showStepCounter);
    setShowCalorieTracker(false);
  };
  const handleStepsChange = (newSteps) => {
    setSteps(newSteps);
  };

  const handleToggleCalorieTracker = () => {
    setShowCalorieTracker(!showCalorieTracker);
    setShowStepCounter(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header}>Fitness Tracker</Text>
      </View>

      <View style={[styles.content, showStepCounter && styles.activeContent]}>
        <Text style={styles.title} onPress={handleToggleStepCounter}>
          Steps {steps} 
        </Text>
        {showStepCounter && <StepCounterComponent onStepsChange={handleStepsChange}/>}
      </View>

      <View style={[styles.content, showCalorieTracker && styles.activeContent]}>
        <Text style={styles.title} onPress={handleToggleCalorieTracker}>
          Calorie Tracker
        </Text>
        {showCalorieTracker && <CalorieTracker />}
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
    fontWeight: 'bold',
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
    height: 120,
  },
  activeContent: {
    backgroundColor: 'white',
    height: '25%',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start'
  },

});

export default App;
