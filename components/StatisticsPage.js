import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatisticsPage() {
    return (
        <View style={styles.center}>
            <Text style={styles.title}>📊 Statistics Page</Text>
            <Text>Here you will see charts and progress over time.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
});
