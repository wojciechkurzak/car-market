import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {textColor} from '../../config/theme/theme';

type TitleProps = {
    title: string;
};

const Title = ({title}: TitleProps) => {
    return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: textColor,
    },
});

export default Title;
