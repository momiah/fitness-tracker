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
import RecipeGenerator from '../../components/RecipeGenerator';

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
        <Image
          source={require("../../assets/vivup.png")}
          style={styles.image}
        />
      </View>
      {/* Progress Tracker */}
      <ProgressTracker
        totalCaloriesBurned={totalCaloriesBurned}
        calorieResult={calorieResult}
        caloriesToBurnPercent={caloriesToBurnPercent}
        handleReset={() =>
          handleReset(
            setSteps,
            setCalories,
            setCaloriesBurned,
            setCaloriesToBurn,
            setWorkoutPlannerData
          )
        }
      />

      {/* Calories To Burn */}
      {!showCaloriesToBurn && (
        <TouchableOpacity
          onPress={() =>
            handleToggleCaloriesToBurn(
              showCaloriesToBurn,
              setShowCaloriesToBurn,
              setShowStepCounter,
              setShowCalorieTracker
            )
          }
          style={styles.content}
        >
          <Text style={styles.title}>Calories to Burn</Text>
          <Text style={styles.score}>{caloriesToBurn}</Text>
        </TouchableOpacity>
      )}
      {showCaloriesToBurn && (
        <CaloriesToBurnTracker
          onCaloriesToBurnChange={(caloriesToBurn) =>
            handleCaloriesToBurn(setCaloriesToBurn, caloriesToBurn)
          }
          handleToggleCaloriesToBurn={() =>
            handleToggleCaloriesToBurn(
              showCaloriesToBurn,
              setShowCaloriesToBurn,
              setShowStepCounter,
              setShowCalorieTracker
            )
          }
        />
      )}

      {/* Calories Tracker */}
      {!showCalorieTracker && (
        <TouchableOpacity
          onPress={() =>
            handleToggleCalorieTracker(
              showCalorieTracker,
              setShowCalorieTracker,
              setShowStepCounter,
              setShowCalorieBurned
            )
          }
          style={styles.content}
        >
          <Text style={styles.title}>Calories Consumed</Text>
          <Text style={styles.score}>{calories}</Text>
        </TouchableOpacity>
      )}
      {showCalorieTracker && (
        <CalorieTracker
          toggleRecipeGen={() =>
            toggleRecipeGen(showRecipeGen, setShowRecipeGen)
          }
          onCaloriesChange={(newCalories) =>
            handleCalorieChange(calories, setCalories, newCalories)
          }
          handleToggleCalorieTracker={() =>
            handleToggleCalorieTracker(
              showCalorieTracker,
              setShowCalorieTracker,
              setShowStepCounter,
              setShowCalorieBurned
            )
          }
        />
      )}
      {/* Recipe Generator */}
      {showRecipeGen && (
        <RecipeGenerator
          setCalories={setCalories}
          calories={calories}
          toggleRecipeGen={() =>
            toggleRecipeGen(showRecipeGen, setShowRecipeGen)
          }
        />
      )}

      {/* Step Counter */}
      {!showStepCounter && (
        <TouchableOpacity
          onPress={() =>
            handleToggleStepCounter(
              showStepCounter,
              setShowStepCounter,
              setShowCalorieTracker,
              setShowCalorieBurned
            )
          }
          style={styles.content}
        >
          <Text style={styles.title}>Steps Taken</Text>
          <Text style={styles.score}>{steps}</Text>
        </TouchableOpacity>
      )}
      {showStepCounter && (
        <StepCounterComponent
          onStepsChange={(newSteps) =>
            handleStepsChange(steps, setSteps, newSteps)
          }
          handleToggleStepCounter={() =>
            handleToggleStepCounter(
              showStepCounter,
              setShowStepCounter,
              setShowCalorieTracker,
              setShowCalorieBurned
            )
          }
        />
      )}

      {/* Workout Planner */}
      {!showCalorieBurned && (
        <TouchableOpacity
          onPress={() =>
            handleToggleCalorieBurned(
              showCalorieBurned,
              setShowCalorieBurned,
              setShowStepCounter,
              setShowCalorieTracker
            )
          }
          style={styles.content}
        >
          <Text style={styles.title}>Workout Planner</Text>
          <Text style={styles.score}>{caloriesBurned}</Text>
        </TouchableOpacity>
      )}
      {showCalorieBurned && (
        <WorkoutPlanner
          onCaloriesBurned={(caloriesBurned) =>
            handleCalorieBurned(setCaloriesBurned, caloriesBurned)
          }
          workoutPlannerData={workoutPlannerData}
          setWorkoutPlannerData={setWorkoutPlannerData}
          handleToggleCalorieBurned={() =>
            handleToggleCalorieBurned(
              showCalorieBurned,
              setShowCalorieBurned,
              setShowStepCounter,
              setShowCalorieTracker
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  header: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    fontWeight: "bold",
    width: "100%",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 65,
    height: 45,
    left: 20,
    top: 3,
  },
  content: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginTop: 10,
    paddingHorizontal: 70,
    borderRadius: 25,
    height: 100,
    width: "100%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    backgroundColor: "#161616",
  },
  title: {
    fontSize: 20,
    color: "white",
    marginLeft: -50,
  },
  score: {
    fontWeight: "bold",
    fontSize: 60,
    color: "white",
    marginRight: -30,
  },
});

export default FitnessTracker;