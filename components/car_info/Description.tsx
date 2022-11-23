import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {textColor} from '../../config/theme/theme';

type DescriptionProps = {
    description: string;
};

const Description = ({description}: DescriptionProps) => {
    return (
        <>
            <Text style={styles.descriptionTag}>Description</Text>
            <Text style={styles.description}>{description}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    descriptionTag: {
        fontSize: 20,
        fontWeight: '700',
        color: textColor,
    },
    description: {
        marginTop: 10,
        fontSize: 16,
        color: '#ccc',
    },
});

export default Description;
