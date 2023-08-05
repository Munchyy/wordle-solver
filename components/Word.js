import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import LetterTile from "./LetterTile";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
});

const Word = ({ wordData, onTileClick }) => {
  return (
    <View style={styles.container}>
      {wordData.map(({ char, status }, index) => (
        <Pressable onPress={() => onTileClick(index)}>
          <LetterTile status={status}>{char}</LetterTile>
        </Pressable>
      ))}
    </View>
  );
};

export default Word;
