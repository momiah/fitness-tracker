import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../services/firebase.config'

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([
    {
      recipeName: 'Egg and Cheese Breakfast Burrito',
      recipe: `
        Recipe Name: Egg and Cheese Breakfast Burrito
        
        Ingredients:
        2 large eggs
        2 tablespoons of shredded cheese
        1 tablespoon of butter
        1 tortilla
        
        Instructions:
        1. Heat a skillet over medium heat.
        2. Melt the butter in the skillet.
        3. Crack the eggs into the skillet and scramble until cooked through.
        4. Place the scrambled eggs on the tortilla and top with cheese.
        5. Roll up the tortilla and secure with a toothpick.
        6. Serve and enjoy!
        
        Nutritional Value: (Per Burrito)
        Calories: 300
        Protein: 30g
        Carbs: 30g
        Fats: 30g
      `,
    },
  ]);
  const [newRecipes, setNewRecipes] = useState([])
  const recipeCollectionRef = collection(db, 'recipes')

  useEffect(() => {
    const getRecipeList = async () => {
        try{
            const data = await getDocs(recipeCollectionRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setNewRecipes(filteredData)
            console.log(filteredData, 'filteredData here')
            console.log(newRecipes, 'new Recipes here')
        } catch (err) {
            console.log(err, 'error')
        }
    }
    getRecipeList()
  }, [])

  useEffect(() => {
    console.log(newRecipes, 'new Recipes here');
  }, [newRecipes]);

  const RecipeContainer = ({ recipe }) => {
    const [active, setActive] = useState(false);

    const handlePress = () => {
      setActive(!active);
    };

    return (
      <View style={styles.recipeContainer}>
        <Text style={styles.recipeName} onPress={handlePress}>
          {recipe.recipeName}
        </Text>
        {active && (
          <View style={styles.recipeContent}>
            <Text>{recipe.recipe}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Recipes</Text>
      {savedRecipes.map((recipe, index) => (
        <RecipeContainer key={index} recipe={recipe} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeContainer: {
    marginBottom: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  recipeContent: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 8,
  },
});

export default SavedRecipes;
