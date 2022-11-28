import React, {useState, useEffect} from 'react';
import {NavigationContainer, Route, RouteProp} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
    CardStyleInterpolators,
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import HomeTabs from './components/HomeTabs';
import AuthScreen from './screens/AuthScreen';
import Results from './screens/ResultsScreen';
import Details from './screens/DetailsScreen';
import {CarType} from './interfaces/CarsInterface';
import {FiltersType} from './interfaces/FiltersInterface';
import {AuthContext} from './config/context/AuthContext';
import AddCarScreen from './screens/AddCarScreen';
import {StatusBar} from 'react-native';
import {iconColor, navigationColor, textColor} from './config/theme/theme';
import ProfileUpdateScreen from './screens/ProfileUpdateScreen';
import PasswordUpdateScreen from './screens/PasswordUpdateScreen';
import ReauthenticateScreen from './screens/ReauthenticateScreen';

export type AuthRouteNames = 'UpdatePassword';

export type StackParamList = {
    Home: undefined;
    Auth: undefined;
    Details: {car: CarType; edit: boolean};
    Results: {cars: CarType[]; filters: FiltersType};
    Add: undefined;
    UpdateProfile: {imageUrl: string | null; username: string};
    UpdatePassword: {authCredential: FirebaseAuthTypes.AuthCredential};
    Reauthenticate: {routeName: AuthRouteNames};
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
                            headerShown: false,
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
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
                        name="UpdateProfile"
                        component={ProfileUpdateScreen}
                        options={{
                            ...headerStyles,
                            headerTitle: 'Update Profile',
                            presentation: 'modal',
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="UpdatePassword"
                        component={PasswordUpdateScreen}
                        options={{
                            ...headerStyles,
                            headerTitle: 'Update Password',
                            presentation: 'modal',
                            cardStyleInterpolator:
                                CardStyleInterpolators.forHorizontalIOS,
                        }}
                    />
                    <Stack.Screen
                        name="Reauthenticate"
                        component={ReauthenticateScreen}
                        options={{
                            ...headerStyles,
                            headerTitle: 'Authentication',
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
