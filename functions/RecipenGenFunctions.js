//Recipe Generator Functions
import { Text } from 'react-native'
import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../services/firebase.config';
import axios from 'axios';
import { API_KEY } from '@env'

const apiKey = API_KEY;
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

export const saveRecipe = async (response, setAlert, alert, setAlertMessage) => {

    if(!response){
        setAlertMessage('You must generate a recipe first!');
    } else {
        try {
            const recipeCollectionRef = collection(db, 'recipes');
        
            const ingredientsIndex = response.indexOf('Ingredients');
            if (ingredientsIndex === -1) {
              console.error('Invalid response format. Unable to find ingredients.');
              return;
            }
        
            const recipeName = response.substring(0, ingredientsIndex).trim();
            const description = response.substring(ingredientsIndex + 'Ingredients'.length).trim();
            const calories = response.match(/Calories:\s*(\d+)/i)?.[1];
        
            if (description) {
              const recipeData = {
                name: recipeName,
                description: description,
                calories: calories
              };
        
              const recipeDocRef = doc(recipeCollectionRef, recipeName);
              await setDoc(recipeDocRef, recipeData);
              setAlertMessage('Recipe Saved!');
              console.log('Recipe saved successfully!');
            } else {
              console.error('Invalid response format. Unable to extract recipe description.');
            }
          } catch (error) {
            console.error('Error saving recipe:', error);
          }
    }
    setAlert(!alert)

};

export const handleGenerator = async (setAlert, setLoading, setResponse, selected, protein, carbs, fat, exclude) => {
    setAlert(!alert);
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

export const extractCalories = ({response, setAlertMessage, setCalories, setAlert, alert, calories}) => {
    let calorie = null;
    if (!response) {
      setAlertMessage('You must generate a recipe first!');
    } else {
      const caloriesMatch = response.match(/Calories:\s*(\d+)/i);

      if (caloriesMatch) {
        calorie = parseInt(caloriesMatch[1], 10);
      }
      setCalories(calorie + calories);
      setAlertMessage('Calories Added');
    }

    setAlert(!alert);
    return calories;
  };

export const formatDataWithBoldTags = (response) => {
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
                        <Text key={index} style={{fontWeight: 'bold'}}>
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