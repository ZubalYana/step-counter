import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "./components/Header";
import SideModal from "./components/SideModal";
import StepCounter from "./components/StepCounter";
import GoalsPage from "./components/Goal.js";
import StatisticsPage from "./components/StatisticsPage";
import SetupScreen from "./components/SetupScreen";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState("steps");
  const [isSetupDone, setIsSetupDone] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      const profile = await AsyncStorage.getItem("userProfile");
      if (profile) setIsSetupDone(true);
    };
    checkProfile();
  }, []);

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

  if (!isSetupDone) {
    return <SetupScreen onFinish={() => setIsSetupDone(true)} />;
  }

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
