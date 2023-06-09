// FitnessTrackerFunctions.js

export function handleToggleStepCounter(showStepCounter, setShowStepCounter, setShowCalorieTracker, setShowCalorieBurned) {
    setShowStepCounter(!showStepCounter);
    setShowCalorieTracker(false);
    setShowCalorieBurned(false);
  }
  
  export function handleStepsChange(steps, setSteps, newSteps) {
    setSteps(steps + newSteps);
  }
  
  export function handleToggleCalorieTracker(showCalorieTracker, setShowCalorieTracker, setShowStepCounter, setShowCalorieBurned) {
    setShowCalorieTracker(!showCalorieTracker);
    setShowStepCounter(false);
    setShowCalorieBurned(false);
  }
  
  export function handleCalorieChange(calories, setCalories, newCalories) {
    setCalories(calories + newCalories);
  }
  
  export function handleToggleCalorieBurned(showCalorieBurned, setShowCalorieBurned, setShowStepCounter, setShowCalorieTracker) {
    setShowCalorieBurned(!showCalorieBurned);
    setShowStepCounter(false);
    setShowCalorieTracker(false);
  }
  
  export function handleCalorieBurned(setCaloriesBurned, burnedCalories) {
    setCaloriesBurned(burnedCalories);
  }
  
  export function handleToggleCaloriesToBurn(showCaloriesToBurn, setShowCaloriesToBurn, setShowStepCounter, setShowCalorieTracker) {
    setShowCaloriesToBurn(!showCaloriesToBurn);
    setShowStepCounter(false);
    setShowCalorieTracker(false);
  }
  
  export function handleCaloriesToBurn(setCaloriesToBurn, caloriesToBurn) {
    setCaloriesToBurn(caloriesToBurn);
  }
  
  export function handleReset(
    setSteps,
    setCalories,
    setCaloriesBurned,
    setCaloriesToBurn,
    setWorkoutPlannerData
  ) {
    setSteps(0);
    setCalories(0);
    setCaloriesBurned(0);
    setCaloriesToBurn(0);
    setWorkoutPlannerData([]);
  }

  export function toggleRecipeGen(showRecipeGen, setShowRecipeGen){
    setShowRecipeGen(!showRecipeGen)
  }
  