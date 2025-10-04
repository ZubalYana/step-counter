import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";

export default function StatisticsPage() {
    const screenWidth = Dimensions.get("window").width;

    const stepData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [5234, 7320, 6500, 8123, 9000, 12034, 10020],
                color: () => `#4dabf7`,
            },
        ],
    };

    const calorieData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [220, 320, 280, 350, 400, 500, 430],
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(34, 139, 230, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        decimalPlaces: 0,
        style: { borderRadius: 16 },
    };

    return (
        <ScrollView contentContainerStyle={styles.center}>
            <Text style={styles.subtitle}>Steps this week</Text>
            <LineChart
                data={stepData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
            />

            <Text style={styles.subtitle}>Calories burnt</Text>
            <BarChart
                data={calorieData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flexGrow: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
        marginTop: 10,
    },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
    subtitle: { fontSize: 18, fontWeight: "600", marginTop: 20 },
    chart: { borderRadius: 16, marginVertical: 10, marginLeft: -25 },
});
