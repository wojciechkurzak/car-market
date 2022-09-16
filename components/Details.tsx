import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {HomeStackParamList} from '../screens/HomeScreen';

type DetailsScreenProp = RouteProp<HomeStackParamList, 'Details'>;

const Details = () => {
    const route = useRoute<DetailsScreenProp>();

    const {title, image, productionDate} = route.params.car;

    console.log(route);

    return (
        <View>
            <Image style={{width: '100%', height: 200}} source={{uri: image}} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text>
                    {productionDate} - {}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#000',
    },
    textContainer: {
        padding: 10,
    },
});

export default Details;
