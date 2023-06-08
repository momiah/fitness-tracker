import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FitnessTracker from './screens/FitnessTracker'
import RecipeGenerator from './screens/RecipeGenerator'


const Tab = createBottomTabNavigator()

const AppContainer = () => {
    return(
      <NavigationContainer style={styles.bottomNavBar}>
        <Tab.Navigator  screenOptions={{headerShown: false}}>
            <Tab.Screen name={'FitnessTracker'} component={FitnessTracker}/>
            <Tab.Screen name={'RecipeGenerator'} component={RecipeGenerator}/>
        </Tab.Navigator>
        </NavigationContainer>
     
    )
}

const styles = StyleSheet.create({
    bottomNavBar: {
        marginTop: 100,
        flexShrink: 1
    }
})

export default AppContainer