import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import SideModal from "./components/SideModal";
import StepCounter from "./components/StepCounter";
import GoalsPage from "./components/Goal.js";
import StatisticsPage from "./components/StatisticsPage";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState("steps");

  const renderPage = () => {
    switch (currentPage) {
      case "steps":
        return <StepCounter />;
      case "goals":
        return <GoalsPage />;
      case "statistics":
        return <StatisticsPage />;
      default:
        return <StepCounter />;
    }
  };

  return (
    <View style={styles.container}>
      <Header setVisible={setVisible} />

      <View style={styles.page}>{renderPage()}</View>

      <SideModal
        visible={visible}
        setVisible={setVisible}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  page: { flex: 1, marginTop: 100 },
});
