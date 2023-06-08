
import React, {useEffect, useState} from 'react';
import {
  StyleSheet, Text, View, TextInput,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';




const RecipeGenerator = () => {
  const [selected, setSelected] = useState('');
  const [number] = useState(null);
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [exclude, setExclude] = useState('');
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = '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'
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions'


  const data = [{ value: 'Breakfast' }, { value: 'Lunch' }, { value: 'Dinner' }];

  const recipePrompt = (protein, carbs, fat, selected, exclude, prompt) => {
    console.log(prompt, '💊');

    setPrompt(
      `Give me a ${selected} recipe. It should have the following calorie profile: ${protein} grams of protein, ${carbs} grams of carbohydrates, and ${fat} grams of fat. Please exclude the following ingredients: ${exclude}`,
    );
  };

  const handleGenerator = async (prompt) => {

    function generatePrompt(prompt) {
        return prompt + 
        'structure this in the following "name of the recipe", "ingredients", "instructions", "nutritional value"'
        }
        
        const response = await axios.post(apiUrl, {
            prompt: generatePrompt(prompt),
            temperature: 0.6,
            max_tokens: 2048
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        })
        const responseText = response.data.choices[0].text
        setResponse(responseText)
  }


  function formatDataWithBoldTags(response) {
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
  }


  return (
 
      <ScrollView>
        <View style={styles.inputContainer}>
          {/* Protein */}
          <TextInput
            style={styles.input}
            onChangeText={setProtein}
            value={number}
            placeholder="Protein"
            keyboardType="numeric"
            placeholderTextColor="black"
          />
          {/* Carbs */}
          <TextInput
            style={styles.input}
            onChangeText={setCarbs}
            value={number}
            placeholder="Carbs"
            keyboardType="numeric"
            placeholderTextColor="black"
          />
          {/* Fat */}
          <TextInput
            style={styles.input}
            onChangeText={setFat}
            value={number}
            placeholder="Fat"
            keyboardType="numeric"
            placeholderTextColor="black"
          />
          {/* Exclude */}
          <TextInput
            style={styles.input}
            onChangeText={setExclude}
            value={number}
            placeholder="Exlude"
            keyboardType="numeric"
            placeholderTextColor="black"
          />
          {/* Meal Type */}
          <SelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="save"
            boxStyles={styles.dropdown}
            placeholder="Meal Type"
          />
        </View>
        <Button
          title="Submit"
          onPress={async () => {
            setLoading(true);
            recipePrompt(protein, carbs, fat, selected, exclude, prompt);
            await handleGenerator(prompt);
            setLoading(false);
          }}
        />
        {loading && (
          <Text style={styles.loading}>
            Ok let's get you a recipe...
            <ActivityIndicator
              size="small"
              color="black"
            />
          </Text>
        )}

        <ScrollView style={styles.promptContainer}>
          <Text>
            Give me a {selected} recipe. It should have the following calorie
            profile : {protein} grams of protein, {carbs} grams of carbohydrates,
            and {fat} grams of fat. Please exclude the following ingredients:{' '}
            {exclude}
          </Text>
          {/* Response */}
          {response ? (
            <Text>{formatDataWithBoldTags(response)}</Text>
          ) : (
            <Text style={styles.placeholderText}>Enter your macros and let's find you a recipe!</Text>
          )}

        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <Button title="Save Receipe"></Button>
          <Button title="View Recipes"></Button>
        </View>
      </ScrollView>
 
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  promptContainer: {
    marginTop: 10,
    padding: 10,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    height: 430
  },
  inputContainer: {
    padding: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    color: '#fff',
  },
  placeholderText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 150,
    color: '#808080'
  },
  responseHeaders: {
    fontWeight: 'bold'
  },
  loading: {
    fontSize: 15,
    textAlign: 'center',
  }

});

export default RecipeGenerator;