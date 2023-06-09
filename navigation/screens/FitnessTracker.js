import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import StepCounterComponent from '../../components/StepCounter';
import CalorieTracker from '../../components/CalorieTracker';
import WorkoutPlanner from '../../components/WorkoutPlanner';
import CaloriesToBurnTracker from '../../components/CaloriesToBurnTracker';
import ProgressTracker from '../../components/ProgressTracker';
import {
  handleToggleStepCounter,
  handleStepsChange,
  handleToggleCalorieTracker,
  handleCalorieChange,
  handleToggleCalorieBurned,
  handleCalorieBurned,
  handleToggleCaloriesToBurn,
  handleCaloriesToBurn,
  handleReset,
  toggleRecipeGen
} from '../../functions/FitnessTrackerFunctions';
import RecipeGenerator from './RecipeGenerator';

const FitnessTracker = () => {
  const [showStepCounter, setShowStepCounter] = useState(false);
  const [showCalorieTracker, setShowCalorieTracker] = useState(false);
  const [showCalorieBurned, setShowCalorieBurned] = useState(false);
  const [showCaloriesToBurn, setShowCaloriesToBurn] = useState(false);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesToBurn, setCaloriesToBurn] = useState(0);
  const [workoutPlannerData, setWorkoutPlannerData] = useState([]);
  const [showRecipeGen, setShowRecipeGen] = useState(false);

  const caloriesBurnedPerStep = steps * 0.05;
  const totalCaloriesBurned = caloriesBurnedPerStep + caloriesBurned;
  const caloriesToBurnPercent = caloriesToBurn !== 0 ? totalCaloriesBurned / caloriesToBurn : 0;
  const calorieResult = calories - totalCaloriesBurned;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fitness Tracker</Text>
        <Image source={require('../../assets/vivup.png')} style={{ width: 65, height: 45, left: 20, top: 3 }} />
      </View>

      <ProgressTracker totalCaloriesBurned={totalCaloriesBurned} calorieResult={calorieResult} caloriesToBurnPercent={caloriesToBurnPercent} handleReset={() => handleReset(setSteps,
        setCalories,
        setCaloriesBurned,
        setCaloriesToBurn,
        setWorkoutPlannerData)} />

      {/* Calories To Burn */}
      {!showCaloriesToBurn &&
        <View style={styles.content}>
          <Text style={styles.score}>{caloriesToBurn}</Text>
          <TouchableOpacity onPress={() => handleToggleCaloriesToBurn(showCaloriesToBurn, setShowCaloriesToBurn, setShowStepCounter, setShowCalorieTracker)} style={styles.titleContainer}>
            <Text style={styles.title}>Calories to Burn</Text>
          </TouchableOpacity>
        </View>}
      {showCaloriesToBurn && <CaloriesToBurnTracker onCaloriesToBurnChange={caloriesToBurn => handleCaloriesToBurn(setCaloriesToBurn, caloriesToBurn)} handleToggleCaloriesToBurn={() => handleToggleCaloriesToBurn(showCaloriesToBurn, setShowCaloriesToBurn, setShowStepCounter, setShowCalorieTracker)} />}
      

      {/* Calories Tracker */}
      {!showCalorieTracker &&
        <View style={styles.content}>
          <Text style={styles.score}>{calories}</Text>
          <TouchableOpacity onPress={() => handleToggleCalorieTracker(showCalorieTracker, setShowCalorieTracker, setShowStepCounter, setShowCalorieBurned)} style={styles.titleContainer}>
            <Text style={styles.title}>Calories Consumed</Text>
          </TouchableOpacity>
        </View>}
      {showCalorieTracker && <CalorieTracker toggleRecipeGen={() => toggleRecipeGen(showRecipeGen, setShowRecipeGen)} onCaloriesChange={newCalories => handleCalorieChange(calories, setCalories, newCalories)} handleToggleCalorieTracker={() => handleToggleCalorieTracker(showCalorieTracker, setShowCalorieTracker, setShowStepCounter, setShowCalorieBurned)} />}
      {showRecipeGen && <RecipeGenerator />}

      {/* Step Counter */}
      {!showStepCounter &&
        <View style={styles.content}>
          <Text style={styles.score}>{steps}</Text>
          <TouchableOpacity onPress={() => handleToggleStepCounter(showStepCounter, setShowStepCounter, setShowCalorieTracker, setShowCalorieBurned)} style={styles.titleContainer}>
            <Text style={styles.title}>Steps Taken</Text>
          </TouchableOpacity>
        </View>}
      {showStepCounter && <StepCounterComponent onStepsChange={newSteps => handleStepsChange(steps, setSteps, newSteps)} handleToggleStepCounter={() => handleToggleStepCounter(showStepCounter, setShowStepCounter, setShowCalorieTracker, setShowCalorieBurned)} />}

      {/* Workout Planner */}
      {!showCalorieBurned &&
        <View style={styles.content}>
          <Text style={styles.score}>{caloriesBurned}</Text>
          <TouchableOpacity onPress={() => handleToggleCalorieBurned(showCalorieBurned, setShowCalorieBurned, setShowStepCounter, setShowCalorieTracker)} style={styles.titleContainer}>
            <Text style={styles.title}>Workout Planner</Text>
          </TouchableOpacity>
        </View>}
      {showCalorieBurned && <WorkoutPlanner
        onCaloriesBurned={caloriesBurned => handleCalorieBurned(setCaloriesBurned, caloriesBurned)}
        workoutPlannerData={workoutPlannerData}
        setWorkoutPlannerData={setWorkoutPlannerData}
        handleToggleCalorieBurned={() => handleToggleCalorieBurned(showCalorieBurned, setShowCalorieBurned, setShowStepCounter, setShowCalorieTracker)}
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
    borderRadius: 25,
    height: 100,
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
  title: {
    fontSize: 20,
    fontFamily: 'roboto',
    color: 'white',
  },
  titleContainer: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 40,

  },
  score: {
    fontWeight: 'bold',
    marginLeft: 230,
    fontSize: 60,
    color: 'white',
    zIndex: 1,
  },


});

export default FitnessTracker;
