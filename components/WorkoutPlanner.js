import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const WorkoutPlanner = ({ onCaloriesBurned, workoutPlannerData, setWorkoutPlannerData, handleToggleCalorieBurned }) => {
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
        setWorkoutPlannerData(updatedWorkouts); 
    };

    const calculateTotalCaloriesBurned = (workouts) => {
        let calories = 0;
        workouts.forEach((workout) => {
            if (workout === 'Running 500 Kcal P/h') {
                calories += 500;
            } else if (workout === 'Light Jogging  300 Kcal P/h') {
                calories += 300;
            } else if (workout === 'Sports  700 Kcal P/h') {
                calories += 700;
            }
        });
        return calories;
    };

    const removeWorkout = (index) => {
        const updatedWorkouts = [...selectedWorkouts];
        const removedWorkout = updatedWorkouts.splice(index, 1)[0];
        setSelectedWorkouts(updatedWorkouts);
        setWorkoutPlannerData(updatedWorkouts); 
        const removedCalories = calculateTotalCaloriesBurned([removedWorkout]);
        setTotalCalories((prevTotalCalories) => prevTotalCalories - removedCalories);
    };


    const workoutOptions = [
        { key: 'Running 500 Kcal P/h', value: 'Running' },
        { key: 'Light Jogging  300 Kcal P/h', value: 'Light Jogging' },
        { key: 'Sports  700 Kcal P/h', value: 'Sports' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.back} onPress={handleToggleCalorieBurned}>
                ⇐
            </Text>
            <Text style={styles.title}>Workout Planner</Text>
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                <SelectList
                    setSelected={(val) => handleWorkoutSelection(val)}
                    data={workoutOptions}
                    boxStyles={styles.selectListContainer}
                    placeholder="Workout Type"
                />
                <View style={styles.listContainer}>
                    {selectedWorkouts.map((workout, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
                            <Text style={styles.listItem}>{workout}</Text>
                            <Text onPress={() => removeWorkout(index)}>❌</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Text style={styles.total}>Total Calories Burned: {totalCalories}</Text>
            <Text style={styles.total}>Total Hours Worked: {selectedWorkouts.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: 500,
        width: 350,
        borderRadius: 30,
        backgroundColor: '#e0e0e0',
        zIndex: 3
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#161616'
    },
    selectListContainer: {
        flex: 1,
        width: 300,
        color: 'white',
        backgroundColor: 'white',
        opacity: 100
    },
    listContainer: {
        marginTop: 10,
        width: 300,
        color: 'white',
        backgroundColor: 'white',
    },
    listItem: {
        fontSize: 16,
        padding: 10,
        textAlign: 'left',
        color: '#161616',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#161616'
    },
    back: {
        position: 'absolute',
        top: 2,
        left: 10,
        fontSize: 30,
        fontWeight: 'bold',
        zIndex: 1,
        color: '#161616'
    },
});

export default WorkoutPlanner;
