import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FitnessTracker from './screens/FitnessTracker'
import RecipeGenerator from './screens/RecipeGenerator'


const Tab = createBottomTabNavigator()

const AppContainer = () => {
    return(
      <NavigationContainer>
        <Tab.Navigator  screenOptions={{headerShown: false}}>
            <Tab.Screen name={'FitnessTracker'} component={FitnessTracker}/>
            <Tab.Screen name={'RecipeGenerator'} component={RecipeGenerator}/>
        </Tab.Navigator>
        </NavigationContainer>
     
    )
}

export default AppContainer