import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const WorkoutPlanner = ({ onCaloriesBurned }) => {
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);

    const handleWorkoutSelection = (item) => {
        const updatedWorkouts = [...selectedWorkouts, item];
        setSelectedWorkouts(updatedWorkouts);
        const totalCaloriesBurned = calculateTotalCaloriesBurned(updatedWorkouts);
        onCaloriesBurned(totalCaloriesBurned);
      };

    const calculateTotalCaloriesBurned = () => {
        let totalCalories = 0;
        selectedWorkouts.forEach((workout) => {
            if (workout === 'Running') {
                totalCalories += 500;
            } else if (workout === 'Light Jogging') {
                totalCalories += 300;
            } else if (workout === 'Sports') {
                totalCalories += 700;
            }
        });
        return totalCalories;
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
                setSelected={val => handleWorkoutSelection(val)}
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
            <Text style={styles.total}>
                Total Calories Burned: {calculateTotalCaloriesBurned()}
            </Text>
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
    },
    selectListContainer: {
      flex: 1,
      width: 350
    },
    listContainer: {
    marginTop: 10,
      width: 350
    },
    listItem: {
      fontSize: 16,
      padding: 10,
     
      textAlign: 'left',
      borderColor: '#f0f0f0',
      borderWidth: 1
    },
    total: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
export default WorkoutPlanner;
