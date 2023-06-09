import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
import { API_KEY } from '@env'


const RecipeGenerator = () => {
    const [selected, setSelected] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [exclude, setExclude] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
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

    const handleGenerator = async () => {
        const prompt = `Give me the exact ingredients needed for a ${selected} recipe. It should have exactly the following calorie profile: ${protein} grams of protein, ${carbs} grams of carbohydrates, and ${fat} grams of fat. Exclude the following ingredients: ${exclude} and structure this in the following: "name of the recipe", "ingredients", "instructions", "nutritional value`;

        try {
            setLoading(true);
            const response = await axios.post(
                apiUrl,
                {
                    prompt: prompt,
                    temperature: 0.6,
                    max_tokens: 2048,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );

            const responseText = response.data.choices[0].text;
            setResponse(responseText);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.scrollView} contenContainerStyle={styles.container}>
            <View style={styles.header}>
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
            <TouchableOpacity style={styles.button}>
                <Button title="Submit" onPress={handleGenerator} />
            </TouchableOpacity>

            {loading && (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>
                        Ok let's get you a recipe...
                    </Text>
                    <ActivityIndicator size="small" color="black" />
                </View>
            )}

            <ScrollView style={styles.promptContainer}>
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
                <Button title="Save Recipe" />
                <Button title="View Recipes" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    scrollView: {
        position: 'absolute',
        height: 700,
        width: '100%', // adjust as needed
        zIndex: 6, 
        backgroundColor: '#e0e0e0'
    },
    header: {
        paddingHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
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
        height: 80,
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
        backgroundColor: '#f0f0f0',
        width: '100%',
        justifyContent: 'center',
        padding: 10
    },
    promptContainer: {
        padding: 10,
        paddingTop: 20,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        height: 390,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    responseHeaders: {
        fontWeight: 'bold',
    },
    placeholderText: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 150,
        color: '#808080',
        fontSize: 20
    },
    loadingContainer: {
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 15,
        textAlign: 'center',
    },
});

export default RecipeGenerator;
