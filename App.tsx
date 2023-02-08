import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
    CardStyleInterpolators,
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import HomeTabs from './components/HomeTabs';
import {CarType} from './interfaces/CarsInterface';
import {FiltersType} from './interfaces/FiltersInterface';
import {AuthContext} from './config/context/AuthContext';
import {StatusBar} from 'react-native';
import {iconColor, navigationColor, textColor} from './config/theme/theme';
import AuthScreen from './screens/AuthScreen';
import Results from './screens/ResultsScreen';
import Details from './screens/DetailsScreen';
import AddCarScreen from './screens/AddCarScreen';
import ProfileUpdateScreen from './screens/ProfileUpdateScreen';
import PasswordUpdateScreen from './screens/PasswordUpdateScreen';
import ReauthenticateScreen from './screens/ReauthenticateScreen';
import EditCarScreen from './screens/EditCarScreen';

export type AuthRouteNames = 'UpdatePassword';

export type StackParamList = {
    Home: undefined;
    Auth: undefined;
    Details: {car: CarType; edit: boolean};
    Results: {cars: CarType[]; filters: FiltersType};
    Add: undefined;
    Edit: {car: CarType};
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

    const headerOptions: StackNavigationOptions = {
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
        presentation: 'modal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    };

    return (
        <AuthContext.Provider value={user}>
            <StatusBar backgroundColor={navigationColor} />
            <NavigationContainer>
                <Stack.Navigator detachInactiveScreens={false}>
                    <Stack.Screen
                        name="Home"
                        component={HomeTabs}
                        options={{...headerOptions, headerShown: false}}
                    />
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{
                            ...headerOptions,
                            headerTitle: 'Authorization',
                            title: 'Log in',
                        }}
                    />
                    <Stack.Screen
                        name="Details"
                        component={Details}
                        options={{
                            ...headerOptions,
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Results"
                        component={Results}
                        options={{
                            ...headerOptions,
                        }}
                    />
                    <Stack.Screen
                        name="Add"
                        component={AddCarScreen}
                        options={{
                            ...headerOptions,
                            headerTitle: 'Create new',
                        }}
                    />
                    <Stack.Screen
                        name="Edit"
                        component={EditCarScreen}
                        options={{
                            ...headerOptions,
                            headerTitle: 'Edit',
                        }}
                    />
                    <Stack.Screen
                        name="UpdateProfile"
                        component={ProfileUpdateScreen}
                        options={{
                            ...headerOptions,
                            headerTitle: 'Update Profile',
                        }}
                    />
                    <Stack.Screen
                        name="UpdatePassword"
                        component={PasswordUpdateScreen}
                        options={{
                            ...headerOptions,
                            headerTitle: 'Update Password',
                        }}
                    />
                    <Stack.Screen
                        name="Reauthenticate"
                        component={ReauthenticateScreen}
                        options={{
                            ...headerOptions,
                            headerTitle: 'Authentication',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default App;
