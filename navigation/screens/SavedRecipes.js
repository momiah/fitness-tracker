import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase.config";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const recipeCollectionRef = collection(db, "recipes");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const data = await getDocs(recipeCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedRecipes(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const RecipeContainer = ({ recipe }) => {
    const [active, setActive] = useState(false);

    const handlePress = () => {
      setActive(!active);
    };

    const handleDelete = async () => {
      try {   
        const recipeRef = doc(db, 'recipes', recipe.id);
    
        await deleteDoc(recipeRef);
        setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((prevRecipe) => prevRecipe.id !== recipe.id)
      );
        console.log('Recipe deleted successfully!');
      } catch (error) {
        console.error('Error deleting recipe:', error);
        
      }
    };

    const handleExport = () => {

    }
  
    const containerHeight = active ? "auto" : 100;

    return (
      <View style={[styles.recipeContainer, { height: containerHeight }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={[styles.recipeName, { marginTop: active ? 20 : 5 }]}
            onPress={handlePress}
          >
            {recipe.name}
          </Text>
          <Text style={styles.score}>
            {recipe.calories}
            <Text style={{ fontSize: 10 }}>Kcal</Text>
          </Text>
          <View
            style={{
              flexDirection: "column",
              left: 20,
              height: 70,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="delete"
                size={20}
                color="red"
                onPress={handleDelete}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name="export"
                size={20}
                color="green"
                onPress={handleExport}
              />
            </TouchableOpacity>
          </View>
        </View>

        {active && (
          <View style={styles.recipeContent}>
            <Text>{recipe.description}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Saved Recipes</Text>
        <Button title="Refresh" onPress={fetchRecipes} />
      </View>
      <ScrollView style={{width: '100%'}}>
        {savedRecipes.map((recipe) => (
          <RecipeContainer key={recipe.id} recipe={recipe} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "black",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 5,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    fontWeight: "bold",
    width: "100%",
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  recipeContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 40,
    borderRadius: 25,
    height: 100,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    backgroundColor: "#161616",
  },
  recipeName: {
    fontSize: 15,
    marginBottom: 8,
    color: "white",
    width: '50%'
  },
  score: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    zIndex: 1,
    marginLeft: 25
  },
  recipeContent: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
});

export default SavedRecipes;


