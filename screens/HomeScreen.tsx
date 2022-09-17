import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/Home';
import Details from '../components/Details';
import DetailsHeader from '../components/DetailsHeader';
import {CarType} from '../interfaces/CarsInterface';
import Results from '../components/Results';
import {FiltersType} from '../interfaces/FiltersInterface';

export type HomeStackParamList = {
    Home: undefined;
    Details: {car: CarType};
    Results: {cars: CarType[]; filters: FiltersType};
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen
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
            <HomeStack.Screen
                name="Results"
                component={Results}
                options={{presentation: 'modal'}}
            />
        </HomeStack.Navigator>
    );
};

export default HomeScreen;
