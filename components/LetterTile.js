import React, { useMemo } from "react";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";

const getStyles = (height, status) =>
  StyleSheet.create({
    tile: {
      width: height,
      height: height,
      backgroundColor: status,
      borderRadius: 8,
      border: "1px solid #aaaaaa",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: height * 0.8,
      height: height,
      top: height * -0.05,
      userSelect: "none",
    },
  });

const LetterTile = ({ children, status }) => {
  const { width } = useWindowDimensions();

  const styles = useMemo(
    () => getStyles(Math.floor(width / 6), status),
    [width, status]
  );
  return (
    <View style={styles.tile}>
      <Text style={styles.text}>{children.toUpperCase()}</Text>
    </View>
  );
};

export default LetterTile;
