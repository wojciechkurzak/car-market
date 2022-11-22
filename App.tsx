import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
    CardStyleInterpolators,
    createStackNavigator,
    StackNavigationOptions,
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
import {StatusBar} from 'react-native';
import {iconColor, navigationColor, textColor} from './config/theme/theme';
import ProfileUpdate from './screens/ProfileUpdate';

export type StackParamList = {
    Home: undefined;
    Auth: undefined;
    Details: {car: CarType};
    Results: {cars: CarType[]; filters: FiltersType};
    Add: undefined;
    Update: {imageUrl: string | null; username: string};
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

    const headerStyles: StackNavigationOptions = {
        headerStyle: {
            backgroundColor: navigationColor,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
        },
        headerTitleStyle: {
            color: textColor,
        },
        headerTintColor: iconColor,
    };

    return (
        <AuthContext.Provider value={user}>
            <StatusBar backgroundColor={navigationColor} />
            <NavigationContainer>
                <Stack.Navigator detachInactiveScreens={false}>
                    <Stack.Screen
                        name="Home"
                        component={HomeTabs}
                        options={{...headerStyles, headerShown: false}}
                    />
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{
                            ...headerStyles,
                            headerTitle: 'Authorization',
                            presentation: 'modal',
                            title: 'Log in',
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="Details"
                        component={Details}
                        options={{
                            ...headerStyles,
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
                            ...headerStyles,
                            presentation: 'modal',
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="Add"
                        component={AddCarScreen}
                        options={{
                            ...headerStyles,
                            headerTitle: 'Create new',
                            presentation: 'modal',
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="Update"
                        component={ProfileUpdate}
                        options={{
                            ...headerStyles,
                            headerTitle: 'Profile',
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
