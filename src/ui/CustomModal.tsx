import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomModalProps {
    visible: boolean;
    title: string;
    children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, title, children }) => {
    if (!visible) return null;

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{title}</Text>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    modalTitle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#FFC300',
        height: 50,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    
});

export default CustomModal;
