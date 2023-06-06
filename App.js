import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import StepCounterComponent from './components/StepCounter';
import CalorieTracker from './components/CalorieTracker';
import WorkoutPlanner from './components/WorkoutPlanner';
import CaloriesToBurnTracker from './components/CaloriesToBurnTracker';
import GaugeChart from 'react-gauge-chart';

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

      {/* Charts */}
      <View style={[styles.content, { height: 275, flexDirection: 'column' }]}>
        <TouchableOpacity  onPress={handleReset} style={styles.resetButton}>RESET</TouchableOpacity>
        <View>
          <GaugeChart
            id="gauge-chart4"
            nrOfLevels={20}
            arcPadding={0.1}
            cornerRadius={3}
            percent={caloriesToBurnPercent}
            style={styles.chart}
            needleColor={'#5BE12C'}
          /> <Text style={styles.chartTitle}>Calories to Burn caloriesToBurn</Text>
        </View>

        {/* Metrics */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', }}>
          <View style={styles.metricContainer}>
            <Text style={styles.metricText}>{totalCaloriesBurned} Kcal</Text>
            <Text style={[styles.metricText, { fontSize: 10 }]}>Total Calories Burned</Text>
          </View>
          <View style={styles.metricContainer}>
            <Text style={styles.metricText}>{calorieResult} Kcal</Text>
            <Text style={[styles.metricText, { fontSize: 10 }]}>{calorieResult < 0 ? 'Calorie Deficit' : 'Calorie Surplus'}</Text>
          </View>
        </View>
      </View>

      {/* Calories To Burn */}
      {!showcaloriesToBurn &&
        <View style={styles.content}>
          <Text style={styles.score}>{caloriesToBurn}</Text>
          <TouchableOpacity onPress={handleTogglecaloriesToBurn} style={styles.title}>
            Calories to Burn
          </TouchableOpacity>
        </View>}
      {showcaloriesToBurn && <CaloriesToBurnTracker oncaloriesToBurnChange={handlecaloriesToBurn} handleTogglecaloriesToBurn={handleTogglecaloriesToBurn} />}

      {/* Calories Tracker */}
      {!showCalorieTracker &&
        <View style={styles.content}>
          <Text style={styles.score}>{calories}</Text>
          <TouchableOpacity onPress={handleToggleCalorieTracker} style={styles.title}>
            Calories Consumed
          </TouchableOpacity>
        </View>}
      {showCalorieTracker && <CalorieTracker onCaloriesChange={handleCalorieChange} handleToggleCalorieTracker={handleToggleCalorieTracker} />}

      {/* Step Counter */}
      {!showStepCounter &&
        <View style={styles.content}>
          <Text style={styles.score}>{steps}</Text>
          <TouchableOpacity onPress={handleToggleStepCounter} style={styles.title}>
            Steps Taken
          </TouchableOpacity>
        </View>}
      {showStepCounter && <StepCounterComponent onStepsChange={handleStepsChange} handleToggleStepCounter={handleToggleStepCounter} />}

      {/* Workout Planner */}
      {!showCalorieBurned &&
        <View style={styles.content}>
          <Text style={styles.score}>{caloriesBurned}</Text>
          <TouchableOpacity onPress={handleToggleCalorieBurned} style={styles.title}>
            Workout Planner
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
  title: {
    fontSize: 20,
    fontFamily: 'roboto',
    color: 'white',
    marginBottom: 10,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  chartTitle: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    bottom: 15,
    position: 'relative'
  },
  score: {
    fontWeight: 'bold',
    marginLeft: 230,
    fontSize: 60,
    color: 'white',
    zIndex: 1,
  },
  back: {
    position: 'absolute',
    top: 0,
    left: 10,
    fontSize: 30,
    fontWeight: 'bold',
    zIndex: 1,
    color: 'white'
  },
  chart: {
    width: '100%',
  },
  metricContainer: {
    backgroundColor: '#00008B', width: 150, height: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10
  },
  metricText: {
    fontSize: 20, textAlign: 'center', color: 'white'
  },
  resetButton: {
    fontFamily: 'roboto', position: 'absolute', backgroundColor: 'red', left: 310, bottom: 230, borderRadius: 3, padding: 5, color: 'white'
  }
});

export default App;
