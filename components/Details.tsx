import React from 'react';
import {View, Text, Image} from 'react-native';

const Details = ({route}: any) => {
    const {image, title} = route.params.car;

    return (
        <View>
            <Image style={{width: '100%', height: 200}} source={{uri: image}} />
            <Text>{title}</Text>
        </View>
    );
};

export default Details;
