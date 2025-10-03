import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pedometer } from "expo-sensors";
import Svg, { Circle } from "react-native-svg";
import { Pause, Play } from "lucide-react-native";

export default function StepCounter() {
    const [steps, setSteps] = useState(0);
    const [isAvailable, setIsAvailable] = useState(null);
    const [goal, setGoal] = useState(200);
    const [isPaused, setIsPaused] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [accumulatedSteps, setAccumulatedSteps] = useState(0);

    useEffect(() => {
        const loadGoal = async () => {
            try {
                const storedGoal = await AsyncStorage.getItem("dailyGoal");
                if (storedGoal !== null) {
                    setGoal(parseInt(storedGoal));
                }
            } catch (e) {
                console.log("Error loading goal", e);
            }
        };
        loadGoal();
    }, []);

    useEffect(() => {
        Pedometer.isAvailableAsync()
            .then((result) =>
                setIsAvailable(
                    result ? "Steps sensor available ✅" : "Steps sensor unavailable ❌"
                )
            )
            .catch(() => setIsAvailable("Помилка ❌"));
    }, []);

    useEffect(() => {
        if (!isPaused) {
            const sub = Pedometer.watchStepCount((result) => {
                setSteps(accumulatedSteps + result.steps);
            });
            setSubscription(sub);

            return () => sub.remove();
        } else if (subscription) {
            subscription.remove();
            setSubscription(null);
            setAccumulatedSteps(steps);
        }
    }, [isPaused]);

    const radius = 140;
    const strokeWidth = 15;
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

            <TouchableOpacity
                style={styles.pauseBtn}
                onPress={() => setIsPaused(!isPaused)}
            >
                {isPaused ? (
                    <Play color="#333" strokeWidth={1} fill="#333" />
                ) : (
                    <Pause color="#333" strokeWidth={1} fill="#333" />
                )}
                <Text
                    style={{
                        marginLeft: 12,
                        color: "#333",
                        fontSize: 22,
                        fontWeight: "600",
                    }}
                >
                    {isPaused ? "RESUME" : "PAUSE"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    currentStepsAmount: { fontSize: 64, fontWeight: "bold", color: "#333" },
    counterContainer: { position: "relative", justifyContent: "center", alignItems: "center" },
    centerText: { position: "absolute", alignItems: "center" },
    pauseBtn: {
        width: 160,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#4dabf7",
        borderRadius: 12,
        marginTop: 25,
    },
});
