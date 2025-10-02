import React, { useEffect, useRef } from "react";
import { X, LogOut, Goal, ChartBarBigIcon, Footprints } from "lucide-react-native";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Animated,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SideModal({ visible, setVisible, setCurrentPage, currentPage }) {
    const slideAnim = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : width,
            duration: 350,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const handleNavigate = (page) => {
        setCurrentPage(page);
        setVisible(false);
    };

    const getMenuStyle = (page) => [
        styles.menuOption,
        currentPage === page && { backgroundColor: "#228be6" }
    ];

    const getTextStyle = (page) => [
        styles.menuText,
        currentPage === page && { color: "#fff", fontWeight: "700" }
    ];

    return (
        <>
            {visible && (
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                />
            )}

            <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
                <TouchableOpacity onPress={() => setVisible(false)} style={{ marginTop: 60 }}>
                    <X size={32} strokeWidth={2.5} color="#000" />
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                    <View style={styles.defaultUserIcon}>
                        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "700" }}>U</Text>
                    </View>
                    <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginLeft: 14 }}>
                        Username
                    </Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <Pressable style={getMenuStyle("steps")} onPress={() => handleNavigate("steps")}>
                        <Footprints size={28} color={currentPage === "steps" ? "#fff" : "#000"} />
                        <Text style={getTextStyle("steps")}>Steps</Text>
                    </Pressable>

                    <Pressable style={getMenuStyle("goals")} onPress={() => handleNavigate("goals")}>
                        <Goal size={28} color={currentPage === "goals" ? "#fff" : "#000"} />
                        <Text style={getTextStyle("goals")}>Goal</Text>
                    </Pressable>

                    <Pressable style={getMenuStyle("statistics")} onPress={() => handleNavigate("statistics")}>
                        <ChartBarBigIcon size={28} color={currentPage === "statistics" ? "#fff" : "#000"} />
                        <Text style={getTextStyle("statistics")}>Statistics</Text>
                    </Pressable>
                </View>

                <Pressable style={[styles.menuOption, styles.logout]}>
                    <LogOut size={28} color="#000" />
                    <Text style={styles.menuText}>Вийти</Text>
                </Pressable>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#00000088",
    },
    sideMenu: {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: width * 0.75,
        backgroundColor: "#fff",
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 30,
    },
    defaultUserIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#228be6",
        justifyContent: "center",
        alignItems: "center",
    },
    menuOption: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f4f4f4ff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    menuText: { color: "#000", fontSize: 20, fontWeight: "600", marginLeft: 8 },
    logout: { position: "absolute", bottom: 30, left: 15, right: 15 },
});
