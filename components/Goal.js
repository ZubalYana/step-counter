import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { X } from "lucide-react-native";

export default function GoalsPage() {
    const [goal, setGoal] = useState(10000);
    const [tempGoal, setTempGoal] = useState(goal.toString());
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const loadGoal = async () => {
            try {
                const storedGoal = await AsyncStorage.getItem("dailyGoal");
                if (storedGoal !== null) {
                    setGoal(parseInt(storedGoal));
                    setTempGoal(storedGoal);
                }
            } catch (e) {
                console.log("Error loading goal", e);
            }
        };
        loadGoal();
    }, []);

    const handleSaveGoal = async () => {
        const numericGoal = parseInt(tempGoal);
        if (!isNaN(numericGoal) && numericGoal > 0) {
            try {
                await AsyncStorage.setItem("dailyGoal", numericGoal.toString());
                setGoal(numericGoal);
            } catch (e) {
                console.log("Error saving goal", e);
            }
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.center}>
            <Text style={styles.title}>Your current goal:</Text>
            <Text style={styles.goalValue}>{goal}</Text>
            <Text style={styles.underGoalText}>daily steps</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>Change my goal</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Set new goal</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={tempGoal}
                            onChangeText={setTempGoal}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveGoal}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <X style={styles.closeBtn} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    goalValue: {
        fontSize: 48,
        color: "#333",
    },
    underGoalText: {
        fontSize: 24,
        color: '#696969ff'
    },
    button: {
        width: 200,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#4dabf7",
        borderRadius: 12,
        marginTop: 25,
    },
    buttonText: {
        color: "#ffffffff",
        fontSize: 22,
        fontWeight: "600",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        position: 'relative',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        width: "100%",
        padding: 10,
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: "#4dabf7",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    saveText: {
        color: "white",
        fontSize: 16,
    },
    cancelButton: {
        position: 'absolute',
        top: 15,
        right: 15
    },
});
