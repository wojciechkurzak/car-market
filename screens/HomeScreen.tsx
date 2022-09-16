import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/Home';
import Details from '../components/Details';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DetailsHeader from '../components/DetailsHeader';

const HomeStack = createStackNavigator();

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
                    // headerBackImage: () => (
                    //     <Icon name="arrow-left" size={24} color="#fff" />
                    // ),
                    header: ({navigation}) => {
                        return <DetailsHeader goBack={navigation.goBack} />;
                    },
                }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeScreen;
