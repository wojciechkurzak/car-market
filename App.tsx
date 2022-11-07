import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import HomeTabs from './components/HomeTabs';
import AuthScreen from './screens/AuthScreen';
import Results from './screens/ResultsScreen';
import DetailsHeader from './components/DetailsHeader';
import Details from './screens/DetailsScreen';
import {CarType} from './interfaces/CarsInterface';
import {FiltersType} from './interfaces/FiltersInterface';
import {AuthContext} from './config/context/AuthContext';
import AddCarScreen from './screens/AddCarScreen';

export type StackParamList = {
    Home: undefined;
    Auth: undefined;
    Details: {car: CarType};
    Results: {cars: CarType[]; filters: FiltersType};
    Add: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const App = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null): void => {
        setUser(user);
    };
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    useEffect(() => {
        const subscriber = auth().onUserChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    return (
        <AuthContext.Provider value={user}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeTabs}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{
                            presentation: 'modal',
                            title: 'Log in',
                            cardStyle: {backgroundColor: '#fff'},
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="Details"
                        component={Details}
                        options={{
                            presentation: 'modal',
                            title: '',
                            headerTransparent: true,
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                            header: () => {
                                return <DetailsHeader />;
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Results"
                        component={Results}
                        options={{
                            presentation: 'modal',
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="Add"
                        component={AddCarScreen}
                        options={{
                            presentation: 'modal',
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default App;
