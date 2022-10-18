import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabs from './components/HomeTabs';
import AuthPanel from './components/AuthPanel';
import Results from './screens/ResultsScreen';
import DetailsHeader from './components/DetailsHeader';
import Details from './screens/DetailsScreen';
import {CarType} from './interfaces/CarsInterface';
import {FiltersType} from './interfaces/FiltersInterface';

export type StackParamList = {
    Home: {user: object};
    AuthPanel: undefined;
    Details: {car: CarType};
    Results: {cars: CarType[]; filters: FiltersType};
};

const Stack = createStackNavigator<StackParamList>();

const App = () => {
    const [user, setUser] = useState<object>();
    const [loadingUser, setLoadingUser] = useState<boolean>(true);

    const onAuthStateChanged = (user: any): void => {
        setUser(user);
        if (loadingUser) setLoadingUser(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeTabs}
                    initialParams={user}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AuthPanel"
                    component={AuthPanel}
                    options={{
                        presentation: 'modal',
                        title: 'Log in',
                        cardStyle: {backgroundColor: '#fff'},
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                        presentation: 'modal',
                        title: '',
                        headerTransparent: true,
                        header: ({navigation}) => {
                            return <DetailsHeader goBack={navigation.goBack} />;
                        },
                    }}
                />
                <Stack.Screen
                    name="Results"
                    component={Results}
                    options={{presentation: 'modal'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
