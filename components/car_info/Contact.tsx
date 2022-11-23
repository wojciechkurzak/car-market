import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

type ContactProps = {
    email: string;
    phone: string | undefined;
};

const Contact = ({email, phone}: ContactProps) => {
    return (
        <View style={styles.informationContainer}>
            <View>
                {email && <Text style={styles.informationLeft}>Email</Text>}
                {phone && <Text style={styles.informationLeft}>Phone</Text>}
            </View>
            <View>
                {email && <Text style={styles.informationRight}>{email}</Text>}
                {phone && <Text style={styles.informationRight}>{phone}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    informationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    informationRight: {textAlign: 'right', color: '#ccc'},
    informationLeft: {
        color: '#ccc',
    },
});

export default Contact;
