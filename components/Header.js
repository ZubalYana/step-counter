import { useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions
} from "react-native";
import Logo from "./Logo";
import SideModal from "./SideModal";
const { width } = Dimensions.get("window");


export default function Header() {
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(width)).current;
    return (
        <>
            <View style={styles.header}>
                <Logo />
                <TouchableOpacity style={styles.burger} onPress={() => setVisible(true)}>
                    <View style={styles.row}></View>
                    <View style={styles.row}></View>
                    <View style={styles.row}></View>
                </TouchableOpacity>
            </View>
            <SideModal visible={visible} setVisible={setVisible} />
        </>
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
})