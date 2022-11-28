import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import {
    darkGray,
    deleteColor,
    lightGray,
    textColor,
} from '../config/theme/theme';

type ItemDeleteModalType = {
    itemId: string;
    visible: boolean;
    setVisible: (value: boolean) => void;
};

const ItemDeleteModal = ({
    itemId,
    visible,
    setVisible,
}: ItemDeleteModalType) => {
    const deleteItem = (): void => {
        console.log('deleted');
        setVisible(!visible);
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
                        <Text style={styles.tag}>Are you sure?</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableNativeFeedback onPress={deleteItem}>
                                <View style={styles.delete}>
                                    <Text style={styles.text}>Delete</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={() => setVisible(!visible)}>
                                <View style={styles.cancel}>
                                    <Text style={styles.text}>Cancel</Text>
                                </View>
                            </TouchableNativeFeedback>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        width: 240,
        padding: 14,
        borderRadius: 6,
        backgroundColor: darkGray,
    },
    tag: {
        fontSize: 20,
        color: textColor,
    },
    buttonsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    delete: {
        width: 100,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: deleteColor,
    },
    cancel: {
        width: 100,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightGray,
    },
    text: {
        fontSize: 18,
        color: textColor,
    },
});

export default ItemDeleteModal;
