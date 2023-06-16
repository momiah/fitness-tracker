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
import { saveRecipe, handleGenerator, extractCalories, formatDataWithBoldTags } from '../functions/RecipenGenFunctions';
import Alert from "react-native-awesome-alerts";
import { SelectList } from 'react-native-dropdown-select-list';

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
    const data = [{ value: 'Breakfast' }, { value: 'Lunch' }, { value: 'Dinner' }];

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
            <TouchableOpacity style={styles.button} onPress={() => handleGenerator(setAlert, setLoading, setResponse, selected, protein, carbs, fat, exclude)}>
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
                    <Text style={styles.buttonText} onPress={() => saveRecipe(response, setAlert, alert, setAlertMessage)}>Save Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => extractCalories({response, setAlertMessage, calories, setCalories, setAlert, alert})}>
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
        borderRadius: 20,

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