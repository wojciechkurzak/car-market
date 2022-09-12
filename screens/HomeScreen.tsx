import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
    const [data, setData] = useState<any>('');

    const gettingData = async () => {
        const data = await firestore().collection('test').get();
        data.forEach(snap => console.log(snap.data()));
    };

    gettingData();

    return (
        <View style={styles.container}>
            <Text>Home!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
