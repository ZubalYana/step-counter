import React from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Logo from "./Logo";

export default function Header({ setVisible }) {
    return (
        <View style={styles.header}>
            <Logo />
            <TouchableOpacity style={styles.burger} onPress={() => setVisible(true)}>
                <View style={styles.row}></View>
                <View style={styles.row}></View>
                <View style={styles.row}></View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
});
