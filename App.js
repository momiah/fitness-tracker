import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import StepCounterComponent, { steps } from './components/StepCounter';
import CalorieTracker from './components/CalorieTracker';

const App = () => {
  const [showStepCounter, setShowStepCounter] = useState(false);
  const [showCalorieTracker, setShowCalorieTracker] = useState(false);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);


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

  const handleCalorieChange = (newCalories) => {
    setCalories(newCalories);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header}>Fitness Tracker</Text>
      </View>
      {/* Step Counter */}
      <View style={[styles.content, showStepCounter && styles.activeContent]}>
        {showStepCounter ? <Text style={styles.back} onPress={handleToggleStepCounter}>⇐</Text>
          : <Text style={styles.title} onPress={handleToggleStepCounter}>Steps </Text>}
        {showStepCounter ? '' : <Text style={styles.score}>{steps}</Text>}
        {!showStepCounter && <Image source={require('./assets/running.jpeg')} style={styles.image} />}
        {showStepCounter && <StepCounterComponent onStepsChange={handleStepsChange} />}
      </View>
      {/* Calorie Counter */}
      <View style={[styles.content, showCalorieTracker && styles.activeContent]}>
        {showCalorieTracker ? <Text style={styles.back} onPress={handleToggleCalorieTracker}>⇐</Text>
          : <Text style={styles.title} onPress={handleToggleCalorieTracker}>Calories </Text>}
        {showCalorieTracker ? '' : <Text style={styles.score}>{calories}</Text>}
        {!showCalorieTracker && <Image source={require('./assets/caloriecounter.jpeg')} style={styles.image} />}
        {showCalorieTracker && <CalorieTracker onCaloriesChange={handleCalorieChange} />}
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
  content: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    height: 120,
    overflow: 'hidden',
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  
  
  activeContent: {
    backgroundColor: 'white',
    height: '25%',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },

  image: {
    position: 'absolute',
    width: 400,
    height: 400,
    opacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  score: {
    fontWeight: 'bold',
    marginLeft: 230,
    fontSize: 80,
    zIndex: 1
  },
  back: {
    position: 'absolute',
    top: 0,
    left: 10,
    fontSize: 30,
    fontWeight: 'bold',
    zIndex: 1,
  }

});

export default App;
