import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SetupScreen({ onFinish }) {
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [goal, setGoal] = useState("10000");

    const handleSave = async () => {
        const userData = { sex, age, height, weight, goal };
        try {
            await AsyncStorage.setItem("userProfile", JSON.stringify(userData));
            onFinish();
        } catch (e) {
            console.log("Error saving profile", e);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome! 👋</Text>
            <Text style={styles.subtitle}>
                Let’s set up your profile for better tracking.
            </Text>

            <View style={styles.row}>
                <TouchableOpacity
                    style={[
                        styles.option,
                        sex === "M" && styles.optionSelected,
                    ]}
                    onPress={() => setSex("M")}
                >
                    <Text
                        style={[
                            styles.optionText,
                            sex === "M" && styles.optionTextSelected,
                        ]}
                    >
                        Male
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.option,
                        sex === "F" && styles.optionSelected,
                    ]}
                    onPress={() => setSex("F")}
                >
                    <Text
                        style={[
                            styles.optionText,
                            sex === "F" && styles.optionTextSelected,
                        ]}
                    >
                        Female
                    </Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
            />
            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />
            <TextInput
                style={styles.input}
                placeholder="Daily steps goal"
                keyboardType="numeric"
                value={goal}
                onChangeText={setGoal}
            />

            <Text style={styles.advice}>
                💡 Tip: Beginners usually start with 5,000–8,000 steps a day, while
                10,000 is a solid goal for general health.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save & Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 20, textAlign: "center" },
    label: { fontSize: 16, fontWeight: "600", marginBottom: 8, alignSelf: "flex-start" },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 15,
    },
    option: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingVertical: 15,
        marginHorizontal: 5,
        alignItems: "center",
    },
    optionSelected: {
        backgroundColor: "#4dabf7",
        borderColor: "#4dabf7",
    },
    optionText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
    },
    optionTextSelected: {
        color: "#fff",
        fontWeight: "700",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        width: "100%",
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    advice: {
        fontSize: 14,
        color: "#444",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#4dabf7",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "100%",
        alignItems: "center",
    },
    buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
