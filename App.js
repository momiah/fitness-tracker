import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import StepCounterComponent from './components/StepCounter';
import CalorieTracker from './components/CalorieTracker';
import WorkoutPlanner from './components/WorkoutPlanner';
import CaloriesToBurnTracker from './components/CaloriesToBurnTracker';
import ProgressTracker from './components/ProgressTracker';

const App = () => {
  const [showStepCounter, setShowStepCounter] = useState(false);
  const [showCalorieTracker, setShowCalorieTracker] = useState(false);
  const [showCalorieBurned, setShowCalorieBurned] = useState(false);
  const [showcaloriesToBurn, setShowcaloriesToBurn] = useState(false);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesToBurn, setcaloriesToBurn] = useState(0);
  const [workoutPlannerData, setWorkoutPlannerData] = useState([]);

  const handleToggleStepCounter = () => {
    setShowStepCounter(!showStepCounter);
    setShowCalorieTracker(false);
    setShowCalorieBurned(false);
  };

  const handleStepsChange = (newSteps) => {
    setSteps(steps + newSteps);
  };

  const handleToggleCalorieTracker = () => {
    setShowCalorieTracker(!showCalorieTracker);
    setShowStepCounter(false);
    setShowCalorieBurned(false);
  };

  const handleCalorieChange = (newCalories) => {
    setCalories(calories + newCalories);
  };

  const handleToggleCalorieBurned = () => {
    setShowCalorieBurned(!showCalorieBurned);
    setShowStepCounter(false);
    setShowCalorieTracker(false);
  };

  const handleCalorieBurned = (burnedCalories) => {
    setCaloriesBurned(burnedCalories);
  };

  const handleTogglecaloriesToBurn = () => {
    setShowcaloriesToBurn(!showcaloriesToBurn);
    setShowStepCounter(false);
    setShowCalorieTracker(false);
  };

  const handlecaloriesToBurn = (caloriesToBurn) => {
    setcaloriesToBurn(caloriesToBurn);
  };

  const handleReset = () => {
    setSteps(0);
    setCalories(0);
    setCaloriesBurned(0);
    setcaloriesToBurn(0);
    setWorkoutPlannerData([]);
  };

  const caloriesBurnedPerStep = steps * 0.04
  const totalCaloriesBurned = caloriesBurnedPerStep + caloriesBurned
  const caloriesToBurnPercent = caloriesToBurn !== 0 ? totalCaloriesBurned / caloriesToBurn : 0;
  const calorieResult = calories - totalCaloriesBurned

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fitness Tracker</Text>
        <Image source={require('./assets/vivup.png')} style={{ width: 65, height: 45, left: 20, top: 3 }} />
      </View>

      <TouchableOpacity  onPress={handleReset} style={styles.resetButton}><>RESET</></TouchableOpacity>
      <ProgressTracker totalCaloriesBurned={totalCaloriesBurned} calorieResult={calorieResult} caloriesToBurnPercent={caloriesToBurnPercent}/>


      {/* Calories To Burn */}
      {!showcaloriesToBurn &&
        <View style={styles.content}>
          <Text style={styles.score}>{caloriesToBurn}</Text>
          <TouchableOpacity onPress={handleTogglecaloriesToBurn} style={styles.titleContainer}>
            <Text style={styles.title}>Calories to Burn</Text>
          </TouchableOpacity>
        </View>}
      {showcaloriesToBurn && <CaloriesToBurnTracker oncaloriesToBurnChange={handlecaloriesToBurn} handleTogglecaloriesToBurn={handleTogglecaloriesToBurn} />}

      {/* Calories Tracker */}
      {!showCalorieTracker &&
        <View style={styles.content}>
          <Text style={styles.score}>{calories}</Text>
          <TouchableOpacity onPress={handleToggleCalorieTracker} style={styles.titleContainer}>
           <Text style={styles.title}> Calories Consumed </Text>
          </TouchableOpacity>
        </View>}
      {showCalorieTracker && <CalorieTracker onCaloriesChange={handleCalorieChange} handleToggleCalorieTracker={handleToggleCalorieTracker} />}

      {/* Step Counter */}
      {!showStepCounter &&
        <View style={styles.content}>
          <Text style={styles.score}>{steps}</Text>
          <TouchableOpacity onPress={handleToggleStepCounter} style={styles.titleContainer}>
            <Text style={styles.title}>Steps Taken</Text>
          </TouchableOpacity>
        </View>}
      {showStepCounter && <StepCounterComponent onStepsChange={handleStepsChange} handleToggleStepCounter={handleToggleStepCounter} />}

      {/* Workout Planner */}
      {!showCalorieBurned &&
        <View style={styles.content}>
          <Text style={styles.score}>{caloriesBurned}</Text>
          <TouchableOpacity onPress={handleToggleCalorieBurned} style={styles.titleContainer}>
            <Text style={styles.title}>Workout Planner</Text>
          </TouchableOpacity>
        </View>}
      {showCalorieBurned && <WorkoutPlanner
        onCaloriesBurned={handleCalorieBurned}
        workoutPlannerData={workoutPlannerData}
        setWorkoutPlannerData={setWorkoutPlannerData}
        handleToggleCalorieBurned={handleToggleCalorieBurned}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontWeight: 'bold',
    width: '100%'
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    height: 120,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    backgroundColor: '#161616',
  },
  title:{
    fontSize: 20,
    fontFamily: 'roboto',
    color: 'white',
  },
  titleContainer: {
    marginBottom: 10,
    alignSelf: 'flex-start',
   position: 'absolute',
   top: 50,
  
  },
  score: {
    fontWeight: 'bold',
    marginLeft: 230,
    fontSize: 60,
    color: 'white',
    zIndex: 1,
  },


  resetButton: {
   zIndex: 5, fontFamily: 'roboto', position: 'absolute', backgroundColor: 'red', left: 310, bottom: 750, borderRadius: 3, padding: 5, color: 'white'
  }
});

export default App;
