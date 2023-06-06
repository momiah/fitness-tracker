import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import StepCounterComponent from './components/StepCounter';
import CalorieTracker from './components/CalorieTracker';
import WorkoutPlanner from './components/WorkoutPlanner';
import ProgressTracker from './components/ProgressTracker';
import GaugeChart from 'react-gauge-chart';

const App = () => {
  const [showStepCounter, setShowStepCounter] = useState(false);
  const [showCalorieTracker, setShowCalorieTracker] = useState(false);
  const [showCalorieBurned, setShowCalorieBurned] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [progress, setProgress] = useState(0);
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

  const handleToggleProgress = () => {
    setShowProgress(!showProgress);
    setShowStepCounter(false);
    setShowCalorieTracker(false);
  };

  const handleProgress = (progress) => {
    setProgress(progress);
  };

  const caloriesBurnedPerStep = steps * 0.04
  const totalCaloriesBurned = caloriesBurnedPerStep + caloriesBurned
  const progressPercent = progress !== 0 ? totalCaloriesBurned / progress : 0;
  const calorieResult =  calories - totalCaloriesBurned

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fitness Tracker</Text>
        <Image source={require('./assets/vivup.png')} style={{ width: 65, height: 45, left: 20, top: 3 }} />
      </View>

      {/* Charts */}
      <View style={[styles.content, { height: 275, flexDirection: 'column' }]}>
        
          <View>
            <GaugeChart
              id="gauge-chart4"
              nrOfLevels={10}
              arcPadding={0.1}
              cornerRadius={3}
              percent={progressPercent}
              style={styles.chart}

            /> <Text style={styles.chartTitle}>Calories to Burn Progress</Text>
          </View>
       
        {/* Metrics */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', }}>
          <View style={styles.metricContainer}>
            <Text style={styles.metricText}>{totalCaloriesBurned} Kcal</Text>
            <Text style={[styles.metricText, {fontSize: 10}]}>Total Calories Burned</Text>
          </View>
          <View style={styles.metricContainer}>
            <Text style={styles.metricText}>{calorieResult} Kcal</Text>
            <Text style={[styles.metricText, {fontSize: 10}]}>{calorieResult < 0 ? 'Calorie Deficit' : 'Calorie Surplus'}</Text>
          </View>
        </View>
      </View>



      {/* Calories To Burn */}
      <TouchableOpacity onPress={handleToggleProgress} style={[styles.content, showProgress && styles.activeContent]}>
        {showProgress ? (
          <Text style={styles.back} onPress={handleToggleProgress}>
            ⇐
          </Text>
        ) : (
          <Text style={styles.title}>
            Calories to Burn
          </Text>
        )}
        {!showStepCounter && <Text style={styles.score}>{progress}</Text>}
        {showProgress && <ProgressTracker onProgressChange={handleProgress} />}
      </TouchableOpacity>

      {/* Calorie Tracker */}
      <TouchableOpacity  onPress={handleToggleCalorieTracker} style={[styles.content, showCalorieTracker && styles.activeContent]}>
        {showCalorieTracker ? (
          <Text style={styles.back} onPress={handleToggleCalorieTracker}>
            ⇐
          </Text>
        ) : (
          <Text style={styles.title}>
            Calories Consumed
          </Text>
        )}
        {!showCalorieTracker && <Text style={styles.score}>{calories}</Text>}
        {showCalorieTracker && (
          <CalorieTracker onCaloriesChange={handleCalorieChange} />
        )}
      </TouchableOpacity>

      {/* Step Counter */}
      <TouchableOpacity  onPress={handleToggleStepCounter} style={[styles.content, showStepCounter && styles.activeContent]}>
        {showStepCounter ? (
          <Text style={styles.back} onPress={handleToggleStepCounter}>
            ⇐
          </Text>
        ) : (
          <Text style={styles.title}>
            Steps Taken
          </Text>
        )}
        {!showStepCounter && <Text style={styles.score}>{steps}</Text>}
        {showStepCounter && (
          <StepCounterComponent onStepsChange={handleStepsChange} />
        )}
      </TouchableOpacity>

      {/* Workout Planner */}
      <TouchableOpacity  onPress={handleToggleCalorieBurned} style={[styles.content, showCalorieBurned && styles.activeContent]}>
        {showCalorieBurned ? (
          <Text style={styles.back} onPress={handleToggleCalorieBurned}>
            ⇐
          </Text>
        ) : (
          <Text style={styles.title}>
            Workout Planner
          </Text>
        )}
        {!showCalorieBurned && (
          <Text style={styles.score}>{caloriesBurned}</Text>
        )}
        {showCalorieBurned && (
          <WorkoutPlanner
            onCaloriesBurned={handleCalorieBurned}
            workoutPlannerData={workoutPlannerData}
            setWorkoutPlannerData={setWorkoutPlannerData}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 5
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    fontWeight: 'bold',
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
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
    backgroundColor: '#161616',
  },

  activeContent: {
    backgroundColor: '#161616',
    height: '30%',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
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
    fontSize: 65,
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
    backgroundColor: '#00008B', width: 150, height: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'center'
  },
  metricText: {
    fontSize: 20, textAlign: 'center', color: 'white'
  }
});

export default App;
