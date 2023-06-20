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


