import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { width } from "@utils/matrix";
import { Colors } from "@constants/Colors";
import { LocalizedString } from "@types";


const languageOptions = [
    { code: "ar", label: "Arabic" },
    { code: "en-US", label: "English" },
    { code: "he", label: "Hebrew" },
    { code: "fr", label: "French" },
];

const LanguageModal = ({ onClose }: { onClose: () => void }) => {
    const { changeLanguage, currentLanguage } = useLanguage();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Choose a language:</Text>

                    <FlatList
                        data={languageOptions}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.languageButton, { backgroundColor: currentLanguage == item.code ?Colors.red:"#f1f1f1"}]}
                                onPress={() => {
                                    changeLanguage(item.code as keyof LocalizedString); 
                                    onClose(); 
                                }}
                            >
                                <Text style={[styles.languageText,{color:item.code == currentLanguage ? Colors.white:Colors.black}]}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        bottom: 0,
        position: 'absolute',
        backgroundColor: "#fff",
        padding: 20,
        paddingBottom: 40,
        // marginHorizontal: 20,
        width: width,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    languageButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        marginVertical: 5,
    },
    languageText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor:'grey',
        borderRadius: 8,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default LanguageModal;
