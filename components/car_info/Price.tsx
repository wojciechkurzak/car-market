import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {textColor} from '../../config/theme/theme';

type PriceProps = {
    price: string;
};

const Price = ({price}: PriceProps) => {
    return (
        <>
            <Text style={styles.priceTag}>Price</Text>
            <Text style={styles.price}>{price} PLN</Text>
        </>
    );
};

const styles = StyleSheet.create({
    priceTag: {
        marginTop: 16,
        color: textColor,
    },
    price: {
        fontSize: 26,
        fontWeight: '700',
        lineHeight: 28,
        color: textColor,
    },
});

export default Price;
