import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FitnessTracker from './screens/FitnessTracker';
import SavedRecipes from './screens/SavedRecipes';

const Tab = createBottomTabNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#161616',
                borderTopWidth: 0,
                padding: 7,
                activeTintColor: 'cyan',
                inactiveTintColor: 'gray',
              },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            if (route.name === 'Fitness Tracker') {
              iconName = 'dumbbell';
            } else if (route.name === 'Saved Recipes') {
              iconName = 'book-multiple-outline';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={20}
                color={focused ? 'cyan' : color}
              />
            );
          },
        })}

      >
        <Tab.Screen
          name="Fitness Tracker"
          component={FitnessTracker}
        />
        <Tab.Screen
          name="Saved Recipes"
          component={SavedRecipes}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
