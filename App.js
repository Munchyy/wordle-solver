import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Solver from "./components/Solver";
import { SolverProvider } from "./SolverContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <SolverProvider>
      <View style={styles.container}>
        <Solver />
      </View>
    </SolverProvider>
  );
}
