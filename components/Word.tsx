import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import LetterTile from "./LetterTile";
import { CurrentLetterDataType } from "../types/solverTypes";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
});

type Props = {
  wordData: CurrentLetterDataType[];
  onTileClick: (index: number) => void;
};
const Word: React.FC<Props> = ({ wordData, onTileClick }) => {
  return (
    <View style={styles.container}>
      {wordData.map(({ character, status, index }) => (
        <Pressable
          key={`${character}-${index}`}
          onPress={() => onTileClick(index)}
        >
          <LetterTile status={status}>{character}</LetterTile>
        </Pressable>
      ))}
    </View>
  );
};

export default Word;
