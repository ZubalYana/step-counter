import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";

export default function StepCounter() {
    const [steps, setSteps] = useState(0);
    const [isAvailable, setIsAvailable] = useState(null);

    useEffect(() => {
        Pedometer.isAvailableAsync()
            .then((result) => setIsAvailable(result ? "Steps sensor available ✅" : "Steps sensor unavailable ❌"))
            .catch(() => setIsAvailable("Помилка ❌"));
        const subscription = Pedometer.watchStepCount((result) => {
            setSteps(result.steps);
        });
        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{isAvailable}</Text>
            <View style={styles.stepsCircleOutline}>
                <Text style={styles.currentStepsAmount}>{steps}</Text>
                <Text style={styles.note}>of 10 000</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    text: { fontSize: 18, marginVertical: 4 },
    steps: { fontSize: 40, color: "green", marginTop: 20 },
    note: { marginTop: 10, color: "gray", textAlign: "center" },
    currentStepsAmount: { fontSize: 48, fontWeight: "bold" },
    stepsCircleOutline: { marginTop: 30, width: 200, height: 200, borderColor: '#5599ffff', borderWidth: 2, borderRadius: 150, display: "flex", justifyContent: "center", alignItems: "center", borderStyle: "dashed" }
});
