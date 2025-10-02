import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Animated,
    Dimensions,
} from "react-native";
import { Pedometer } from "expo-sensors";
import Svg, { Circle } from "react-native-svg";
import { Pause, Play } from "lucide-react-native";
import Logo from "./Logo";
import SideModal from "./SideModal";

const { width } = Dimensions.get("window");

export default function StepCounter() {
    const [steps, setSteps] = useState(0);
    const [isAvailable, setIsAvailable] = useState(null);
    const [goal, setGoal] = useState(200);
    const [isPaused, setIsPaused] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [accumulatedSteps, setAccumulatedSteps] = useState(0);

    // modal state
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(width)).current;

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
            <View style={styles.header}>
                <Logo />
                <TouchableOpacity style={styles.burger} onPress={() => setVisible(true)}>
                    <View style={styles.row}></View>
                    <View style={styles.row}></View>
                    <View style={styles.row}></View>
                </TouchableOpacity>
            </View>

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

            <SideModal visible={visible} setVisible={setVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 0 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    currentStepsAmount: { fontSize: 64, fontWeight: "bold", color: "#333" },
    counterContainer: { position: "relative", justifyContent: "center", alignItems: "center" },
    centerText: { position: "absolute", alignItems: "center" },
    burger: { width: 30, height: 22, flexDirection: "column", justifyContent: "space-between" },
    row: { width: "100%", height: 3.5, backgroundColor: "#228be6", borderRadius: 2 },
    header: {
        width: "100%",
        height: 30,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
        top: 70,
        paddingHorizontal: 20,
    },
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
