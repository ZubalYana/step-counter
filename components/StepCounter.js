import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";
import Svg, { Circle } from 'react-native-svg'

export default function StepCounter() {
    const [steps, setSteps] = useState(0);
    const [isAvailable, setIsAvailable] = useState(null);
    const [goal, setGoal] = useState(200);

    useEffect(() => {
        Pedometer.isAvailableAsync()
            .then((result) => setIsAvailable(result ? "Steps sensor available ✅" : "Steps sensor unavailable ❌"))
            .catch(() => setIsAvailable("Помилка ❌"));
        const subscription = Pedometer.watchStepCount((result) => {
            setSteps(result.steps);
        });
        return () => subscription.remove();
    }, []);

    const radius = 150;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(steps / goal, 1);
    const strokeDashoffset = circumference - circumference * progress;

    return (
        <View style={styles.container}>
            <View style={styles.counterContainer}>
                <Svg width={radius * 2} height={radius * 2}>
                    <Circle
                        stroke="#5599ff55"
                        fill="none"
                        cx={radius}
                        cy={radius}
                        r={radius - strokeWidth / 2}
                        strokeWidth={2}
                        strokeDasharray="6,6"
                    />

                    <Circle
                        stroke="#5599ff"
                        fill="none"
                        cx={radius}
                        cy={radius}
                        r={radius - strokeWidth / 2}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        rotation="-90"
                        originX={radius}
                        originY={radius}
                    />
                </Svg>

                <View style={styles.centerText}>
                    <Text style={styles.currentStepsAmount}>{steps}</Text>
                    <Text style={styles.note}>of {goal.toLocaleString()}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    text: { fontSize: 18, marginVertical: 4 },
    currentStepsAmount: { fontSize: 64, fontWeight: "bold", color: "#333" },
    counterContainer: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center" },
    centerText: { position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }
});
