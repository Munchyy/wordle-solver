import React, { useContext } from "react";
import { View, Button } from "react-native";
import Word from "./Word";
import SolverContext from "../SolverContext";

const Solver = () => {
  const { currentLetterData, addLetterData, submitGuess, resetState } =
    useContext(SolverContext);

  return (
    <View>
      <Word wordData={currentLetterData} onTileClick={addLetterData} />
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Button title="Reset" onPress={() => resetState()}></Button>
        </View>
        <View style={{ flex: 2 }}>
          <Button title="Next guess" onPress={() => submitGuess()}></Button>
        </View>
      </View>
    </View>
  );
};

export default Solver;
