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
    const [goal, setGoal] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [accumulatedSteps, setAccumulatedSteps] = useState(0);

    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        const loadGoalAndProfile = async () => {
            try {
                const storedGoal = await AsyncStorage.getItem("dailyGoal");
                if (storedGoal !== null) setGoal(parseInt(storedGoal));

                const userProfile = await AsyncStorage.getItem("userProfile");
                if (userProfile) {
                    const { weight: w, height: h } = JSON.parse(userProfile);
                    if (w) setWeight(parseFloat(w));
                    if (h) setHeight(parseFloat(h));
                }
            } catch (e) {
                console.log("Error loading data", e);
            }
        };
        loadGoalAndProfile();
    }, []);

    useEffect(() => {
        if (!isPaused) {
            setStartTime(Date.now());
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

    const stepLength = height * 0.415 / 100;
    const distanceMeters = steps * stepLength;
    const distanceKm = distanceMeters / 1000;
    const calories = steps * weight * 0.0005;

    const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
    const pace = distanceKm > 0 ? (elapsedMinutes / distanceKm).toFixed(1) : 0;

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
                <Text style={styles.pauseText}>
                    {isPaused ? "RESUME" : "PAUSE"}
                </Text>
            </TouchableOpacity>

            <View style={styles.statsBox}>
                <View style={styles.row}>
                    <View style={[styles.statContainer, { marginRight: 40 }]}>
                        <Text style={styles.statHightlighted}>{calories.toFixed(0)} kcal</Text>
                        <Text style={styles.statText}>Calories</Text>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.statHightlighted}>{distanceKm.toFixed(2)} km</Text>
                        <Text style={styles.statText}>Distance</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.statContainer}>
                        <Text style={styles.statHightlighted}>{pace} min/km</Text>
                        <Text style={styles.statText}>Avg pace</Text>
                    </View>
                </View>
            </View>

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
    pauseText: {
        marginLeft: 12,
        color: "#333",
        fontSize: 22,
        fontWeight: "600",
    },
    statsBox: {
        marginTop: 50,
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    statContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 20,
    },
    statText: {
        fontSize: 18,
        color: "#444",
        marginVertical: 4,
        fontWeight: "600",
    },
    statHightlighted: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#228be6",
    },
    statContainer: {
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
    }
});