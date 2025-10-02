import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GoalsPage() {
    return (
        <View style={styles.center}>
            <Text style={styles.title}>🎯 Goals Page</Text>
            <Text>Here you can set and track your daily/weekly goals.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
});
