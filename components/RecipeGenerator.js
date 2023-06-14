import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import Alert from "react-native-awesome-alerts";
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../services/firebase.config';
import { API_KEY } from '@env'

const RecipeGenerator = ({ setCalories, toggleRecipeGen, calories }) => {
    const [selected, setSelected] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [exclude, setExclude] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const apiKey = API_KEY;
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const data = [{ value: 'Breakfast' }, { value: 'Lunch' }, { value: 'Dinner' }];

    const formatDataWithBoldTags = (response) => {
        let formattedData = response.replace(/Ingredients:/g, '**Ingredients:**');
        formattedData = formattedData.replace(/Instructions:/g, '**Instructions:**');
        formattedData = formattedData.replace(/Nutritional Information/g, '**Nutritional Information**');
        formattedData = formattedData.replace(/Nutritional Value/g, '**Nutritional Information**');
        formattedData = formattedData.replace(/Nutrition Information/g, '**Nutritional Information**');
        formattedData = formattedData.replace(/- [\w\d\s.,-]+/g, '**$&**');
        const formattedTextArray = formattedData.split('**');

        return (
            <Text>
                {formattedTextArray.map((text, index) => {
                    if (
                        text === 'Ingredients:' ||
                        text === 'Instructions:' ||
                        text === 'Nutritional Information'
                    ) {
                        return (
                            <Text key={index} style={styles.responseHeaders}>
                                {text}
                            </Text>
                        );
                    } else {
                        return <Text key={index}>{text}</Text>;
                    }
                })}
            </Text>
        );
    };

    const extractCalories = (response) => {
        let calorie = null;
        if (!response) {
          setAlertMessage('You Must Generate a recipe first!');
        } else {
          const caloriesMatch = response.match(/Calories:\s*(\d+)/i);
    
          if (caloriesMatch) {
            calorie = parseInt(caloriesMatch[1], 10);
          }
          setCalories(calorie + calories);
          setAlertMessage('Calories Added');
        }
    
        setAlert(true);
        return calories;
      };

    const handleGenerator = async () => {
        setAlert(false);
        const prompt = `Give me the exact ingredients needed for a ${selected} recipe. It should have exactly the following calorie profile: ${protein} grams of protein, ${carbs} grams of carbohydrates, and ${fat} grams of fat. Exclude the following ingredients: ${exclude} and structure this in the following: "name of the recipe", "ingredients", "instructions", "nutritional value for Calories, Protien, Carbs, Fats"`;
        try {
            setLoading(true);
            const response = await axios.post(
                apiUrl,
                {
                    prompt: prompt,
                    temperature: 0.6,
                    max_tokens: 2048,
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
            );
            const responseText = response.data.choices[0].text;
            setResponse(responseText);
            console.log(responseText)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const saveRecipe = async (response) => {
      try {
        const recipeCollectionRef = collection(db, 'recipes');
    
        const ingredientsIndex = response.indexOf('Ingredients');
        if (ingredientsIndex === -1) {
          console.error('Invalid response format. Unable to find ingredients.');
          return;
        }
    
        const recipeName = response.substring(0, ingredientsIndex).trim();
        const description = response.substring(ingredientsIndex + 'Ingredients'.length).trim();
    
        if (description) {
          const recipeData = {
            name: recipeName,
            description: description,
          };
    
          const recipeDocRef = doc(recipeCollectionRef, recipeName);
          await setDoc(recipeDocRef, recipeData);
          console.log('Recipe saved successfully!');
        } else {
          console.error('Invalid response format. Unable to extract recipe description.');
        }
      } catch (error) {
        console.error('Error saving recipe:', error);
      }
    };

    return (
        <ScrollView style={styles.container} contenContainerStyle={styles.scrollView}>
            <View style={styles.header}>
                <Text style={styles.back} onPress={() => toggleRecipeGen()}>⇐</Text>
                <Text style={styles.headerText}>Recipe Generator</Text>
            </View>
            <View style={styles.inputContainer}>
                {/* Protein */}
                <TextInput
                    style={styles.input}
                    onChangeText={setProtein}
                    value={protein}
                    placeholder="Protein"
                    keyboardType="numeric"
                    placeholderTextColor="black"
                />
                {/* Carbs */}
                <TextInput
                    style={styles.input}
                    onChangeText={setCarbs}
                    value={carbs}
                    placeholder="Carbs"
                    keyboardType="numeric"
                    placeholderTextColor="black"
                />
                {/* Fat */}
                <TextInput
                    style={styles.input}
                    onChangeText={setFat}
                    value={fat}
                    placeholder="Fat"
                    keyboardType="numeric"
                    placeholderTextColor="black"
                />
                {/* Exclude */}
                <TextInput
                    style={styles.input}
                    onChangeText={setExclude}
                    value={exclude}
                    placeholder="Exclude"
                    placeholderTextColor="black"
                />
            </View>
            {/* Meal Type */}
            <SelectList
                setSelected={setSelected}
                data={data}
                save="save"
                boxStyles={styles.dropdown}
                placeholder="Meal Type"
            />
            <TouchableOpacity style={styles.button} onPress={handleGenerator}>
                <Text style={styles.buttonText}>GENERATE!</Text>
            </TouchableOpacity>

            {loading && (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>
                        Ok let's get you a recipe...
                    </Text>
                    <ActivityIndicator size="small" color="black" />
                </View>
            )}

            <ScrollView style={styles.responseContainer}>
                {/* Response */}
                {response ? (
                    <Text>{formatDataWithBoldTags(response)}</Text>
                ) : (
                    <Text style={styles.placeholderText}>
                        Enter your macros to generate the exact ingredients needed for a recipe!
                    </Text>
                )}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => saveRecipe(response)}>Save Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => extractCalories(response)}>
                    <Text style={styles.buttonText}>Add Calories</Text>
                </TouchableOpacity>
            </View>
            <Alert
                show={alert}
                message={alertMessage}
                closeOnTouchOutside={true}
               
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexDirection: 'column',
        justifyContent: 'center',

    },
    container: {
        position: 'absolute',
        height: 700,
        width: '90%',
        zIndex: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 25,

    },
    header: {
        paddingHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        fontWeight: 'bold',
        width: '100%'
    },
    headerText: {
        color: '#161616',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
    },
    input: {
        width: '48%',
        height: 45,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    dropdown: {
        marginHorizontal: 10,
        marginBottom: 5
    },
    button: {
        backgroundColor: '#00008B',
        padding: 10,
        borderRadius: 5,
        margin: 10,

    },
    buttonText: {
        color: '#e0e0e0',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    responseContainer: {
        padding: 10,
        paddingTop: 20,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        height: 355,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',


    },
    responseHeaders: {
        fontWeight: 'bold',
    },
    placeholderText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 150,
        color: '#808080',
        fontSize: 15
    },
    loadingContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 300,
        left: 90
    },
    loadingText: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10
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

export default RecipeGenerator;