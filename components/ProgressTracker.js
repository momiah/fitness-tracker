import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GaugeChart from 'react-gauge-chart';

const ProgressTracker = ({totalCaloriesBurned, calorieResult, caloriesToBurnPercent, handleReset}) => {
    return (
        <View style={[styles.content, { height: 275 }]}>
          <TouchableOpacity  onPress={handleReset} style={styles.resetButton}><Text style={{color: 'white'}}>RESET</Text></TouchableOpacity>
            {/* Charts */}
            <View style={{ flexDirection: 'column' }}>
                <View>
                    <GaugeChart
                        id="gauge-chart4"
                        nrOfLevels={20}
                        arcPadding={0.1}
                        cornerRadius={3}
                        percent={caloriesToBurnPercent}
                        style={styles.chart}
                        needleColor={'#5BE12C'}
                    /> <Text style={styles.chartTitle}>Calories to Burn Progress</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 37,
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

    chartTitle: {
      fontSize: 10,
      color: 'white',
      textAlign: 'center',
      bottom: 15,
      position: 'relative'
    },
  
    chart: {
      width: '100%',
    },
    metricContainer: {
      backgroundColor: '#00008B', 
      width: 120, 
      height: 80, 
      borderRadius: 10, 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginHorizontal: 10,
      marginTop: 10
    },
    metricText: {
      fontSize: 20, 
      textAlign: 'center', 
      color: 'white'
    },
    resetButton: {
      zIndex: 5, 
      fontFamily: 'roboto', 
      position: 'absolute', 
      backgroundColor: 'red', 
      left: 315, 
      bottom: 230, 
      borderRadius: 5, 
      padding: 5, 
      
     }
  });
  

export default ProgressTracker