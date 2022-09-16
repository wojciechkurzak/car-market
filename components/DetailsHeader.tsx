import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DetailsHeader = ({goBack}: any) => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={goBack}>
                <Icon name="arrow-left" size={26} color="#fff" />
            </TouchableWithoutFeedback>
            <Icon name="star" size={26} color="#fff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DetailsHeader;
