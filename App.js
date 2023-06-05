import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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

  const progressPercent = progress !== 0 ? caloriesBurned / progress : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fitness Tracker</Text>
      </View>

      {/* Progress */}
      <View style={[styles.content, showProgress && styles.activeContent]}>
        {showProgress ? (
          <Text style={styles.back} onPress={handleToggleProgress}>
            ⇐
          </Text>
        ) : (
          <Text style={styles.title} onPress={handleToggleProgress}>
            Progress Tracker
          </Text>
        )}
        {!showProgress && (
          <GaugeChart
            id="gauge-chart4"
            nrOfLevels={10}
            arcPadding={0.1}
            cornerRadius={3}
            percent={progressPercent}
            style={styles.chart}
          />
        )}
        {showProgress && <ProgressTracker onProgressChange={handleProgress} />}
      </View>

      {/* Step Counter */}
      <View style={[styles.content, showStepCounter && styles.activeContent]}>
        {showStepCounter ? (
          <Text style={styles.back} onPress={handleToggleStepCounter}>
            ⇐
          </Text>
        ) : (
          <Text style={styles.title} onPress={handleToggleStepCounter}>
            Steps Taken
          </Text>
        )}
        {!showStepCounter && <Text style={styles.score}>{steps}</Text>}
        {!showStepCounter && (
          <Image
            source={require('./assets/running.jpeg')}
            style={styles.image}
          />
        )}
        {showStepCounter && (
          <StepCounterComponent onStepsChange={handleStepsChange} />
        )}
      </View>

      {/* Calorie Tracker */}
      <View style={[styles.content, showCalorieTracker && styles.activeContent]}>
        {showCalorieTracker ? (
          <Text style={styles.back} onPress={handleToggleCalorieTracker}>
            ⇐
          </Text>
        ) : (
          <Text style={styles.title} onPress={handleToggleCalorieTracker}>
            Calories Consumed
          </Text>
        )}
        {!showCalorieTracker && <Text style={styles.score}>{calories}</Text>}
        {!showCalorieTracker && (
          <Image
            source={require('./assets/caloriecounter.jpeg')}
            style={styles.image}
          />
        )}
        {showCalorieTracker && (
          <CalorieTracker onCaloriesChange={handleCalorieChange} />
        )}
      </View>

      {/* Workout Planner */}
      <View style={[styles.content, showCalorieBurned && styles.activeContent]}>
        {showCalorieBurned ? (
          <Text style={styles.back} onPress={handleToggleCalorieBurned}>
            ⇐
          </Text>
        ) : (
          <Text style={styles.title} onPress={handleToggleCalorieBurned}>
            Workout Planner
          </Text>
        )}
        {!showCalorieBurned && (
          <Text style={styles.score}>{caloriesBurned}</Text>
        )}
        {!showCalorieBurned && (
          <Image
            source={require('./assets/workoutplan.jpg')}
            style={styles.image}
          />
        )}
        {showCalorieBurned && (
          <WorkoutPlanner
            onCaloriesBurned={handleCalorieBurned}
            workoutPlannerData={workoutPlannerData}
            setWorkoutPlannerData={setWorkoutPlannerData}
          />
        )}
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
    backgroundColor: '#161616',
  },
  activeContent: {
    backgroundColor: 'white',
    height: '35%',
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
  },
  chart: {
    width: '50%',
    alignSelf: 'flex-end',
  },
});

export default App;
