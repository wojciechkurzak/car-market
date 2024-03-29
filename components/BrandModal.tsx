import React, {useState} from 'react';
import {
    Modal,
    TextInput,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    FlatList,
    Text,
} from 'react-native';
import {carBrands} from '../data/carBrands';
import Icon from 'react-native-vector-icons/Feather';
import {
    buttonColor,
    darkGray,
    lightGray,
    textColor,
    placeholderColor,
    iconColor,
} from '../config/theme/theme';

type FiltersModalType = {
    visible: boolean;
    setVisible: (value: boolean) => void;
    modalItem: (title: string) => JSX.Element;
};

const BrandModal = ({visible, setVisible, modalItem}: FiltersModalType) => {
    const [searchBrand, setSearchBrand] = useState<string>('');

    const renderItem = ({item}: {item: string}) => {
        if (!item.toLowerCase().includes(searchBrand.toLowerCase()))
            return null;
        else return modalItem(item);
    };

    return (
        <View>
            <Modal
                animationType="fade"
                visible={visible}
                transparent={true}
                onRequestClose={() => setVisible(!visible)}>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.closeContainer}></View>
                </TouchableWithoutFeedback>
                <View style={styles.centeredView}>
                    <View style={styles.modal}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={searchBrand}
                                onChangeText={value => setSearchBrand(value)}
                                placeholder="Type here"
                                placeholderTextColor={placeholderColor}
                                style={styles.input}
                            />
                            {searchBrand.length !== 0 && (
                                <TouchableWithoutFeedback
                                    onPress={() => setSearchBrand('')}>
                                    <Icon
                                        style={styles.clearIcon}
                                        name="x"
                                        size={26}
                                        color={iconColor}
                                    />
                                </TouchableWithoutFeedback>
                            )}
                        </View>
                        <FlatList
                            data={carBrands}
                            renderItem={renderItem}
                            extraData={searchBrand}
                            overScrollMode={'never'}
                            initialNumToRender={carBrands.length}
                        />
                        <View style={styles.bottomTab}>
                            <TouchableWithoutFeedback
                                onPress={() => setVisible(false)}>
                                <Text style={styles.button}>Close</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
    },
    closeContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        width: 300,
        height: 560,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: darkGray,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderBottomWidth: 2,
        borderBottomColor: lightGray,
    },
    input: {
        width: 250,
        flexGrow: 1,
        fontSize: 19,
        color: textColor,
    },
    clearIcon: {
        alignSelf: 'center',
    },
    bottomTab: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: lightGray,
    },
    button: {
        width: 70,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        borderRadius: 6,
        lineHeight: 28,
        color: textColor,
        backgroundColor: buttonColor,
    },
});

export default BrandModal;
