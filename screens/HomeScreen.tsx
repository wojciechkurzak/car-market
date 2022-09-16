import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/Home';
import Details from '../components/Details';
import DetailsHeader from '../components/DetailsHeader';
import {CarType} from '../interfaces/CarsInterface';

export type HomeStackParamList = {
    Home: undefined;
    Details: {car: CarType};
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
        </HomeStack.Navigator>
    );
};

export default HomeScreen;
