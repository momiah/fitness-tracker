# Fitness Tracker

# UI enhancement + Features Added

▶ Recipe Generator *NEW FEATURE* 

Component that takes in user Input for Macro Nutrient target (Protien, Carbs, Fats, Exlcude) and generates the exact ingredients needed for a desired recipe
-  Displays API response using Axios to send user data to OpenAI API 
-  Saves Recipe to Firestore Database


▶ Saved Recipes *NEW FEATURE* 

-  Fetches recipe from Database and maps onto SavedRecipes component
-  Feature to export Recipe PDF to user device
-  Feature to delete recipe from database

▶ Progress Tracker 
Displaying 3 metrics:
- Chart to measure Calories to Burn target against Calories Burned 
- Dynamic calorie score, displaying 'Calorie Deficit' if Calories Burned is more than consumed or 'Calorie Surplus' if Calories Burned is less than Calories consumed
- Total Calories burned for the day, taking in calories burned during workout plus total steps taken

▶ Calories To Burn 
Component accepts and displays users input on calories to burn target.

▶ Calories Consumed
Component accepts and displays user input on calories consumed

▶ Step Counter
Component that accepts and displays the users inputs on number of steps taken per day. Each steps burns 0.04 Calories and is used to calculate calories burned over total steps and workouts

▶ Workout Planner
Component that gives user a selection of Workouts and displays selected Workouts in a table. Calculate total calories burned and number of hours worked out. 

###########################################################################################################

The task is to review the sample code of the application and you have been tasked with improving the user experience of a mobile app that helps people track their fitness goals. The app has several features, including a step counter, a calorie tracker, and a workout planner.
Your task is to improve the front-end experience of the app and make it more user-friendly. Here are some specific issues to address:
1. The app currently has a cluttered home screen that displays too much information. Users are having trouble finding the features they need.
2. The step counter feature is not prominent enough and users are not using it as often as they should.
3. The calorie tracker feature is difficult to use and requires too many steps to enter information.
4. The workout planner feature is not intuitive and users are having trouble creating and following workout plans.

Your challenge is to address these issues and make improvements to the app's user experience.

# Bonus 
Use your imagination and "document" any features you may feel are neccessary and/or improve the user experience further.
