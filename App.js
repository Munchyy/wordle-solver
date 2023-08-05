import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LetterTile from "./components/LetterTile";
import Word from "./components/Word";
import Solver from "./components/Solver";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const letters = ["a", "b", "c", "d", "e", "f", "g"];
export default function App() {
  const [counter, setCounter] = useState(0);
  return (
    <View style={styles.container}>
      <Solver />
    </View>
  );
}
