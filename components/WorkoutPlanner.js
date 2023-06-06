import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const WorkoutPlanner = ({ onCaloriesBurned, workoutPlannerData, setWorkoutPlannerData }) => {
  const [selectedWorkouts, setSelectedWorkouts] = useState(workoutPlannerData);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const totalCaloriesBurned = calculateTotalCaloriesBurned(selectedWorkouts);
    setTotalCalories(totalCaloriesBurned);
    onCaloriesBurned(totalCaloriesBurned);
  }, [selectedWorkouts]);

  const handleWorkoutSelection = (item) => {
    const updatedWorkouts = [...selectedWorkouts, item];
    setSelectedWorkouts(updatedWorkouts);
    setWorkoutPlannerData(updatedWorkouts); // Update the workoutPlannerData prop
  };

  const calculateTotalCaloriesBurned = (workouts) => {
    let calories = 0;
    workouts.forEach((workout) => {
      if (workout === 'Running') {
        calories += 500;
      } else if (workout === 'Light Jogging') {
        calories += 300;
      } else if (workout === 'Sports') {
        calories += 700;
      }
    });
    return calories;
  };

  const workoutOptions = [
    { key: 'Running', value: 'Running' },
    { key: 'Light Jogging', value: 'Light Jogging' },
    { key: 'Sports', value: 'Sports' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Planner</Text>
      <ScrollView>
        <SelectList
          setSelected={(val) => handleWorkoutSelection(val)}
          data={workoutOptions}
          boxStyles={styles.selectListContainer}
          placeholder="Workout Type"
        />
        <View style={styles.listContainer}>
          {selectedWorkouts.map((workout, index) => (
            <Text key={index} style={styles.listItem}>
              {workout}
            </Text>
          ))}
        </View>
      </ScrollView>
      <Text style={styles.total}>Total Calories Burned: {totalCalories}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  selectListContainer: {
    flex: 1,
    width: 350,
    color: 'white',
    backgroundColor: 'white',
    tintColor: 'white'
    
  },
  listContainer: {
    marginTop: 10,
    width: 350,
    color: 'white',

  },
  listItem: {
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
    borderColor: '#f0f0f0',
    borderWidth: 1,
    color: 'white',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default WorkoutPlanner;
