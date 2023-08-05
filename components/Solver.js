import React, { useContext, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { View, StyleSheet, Button } from "react-native";
import Word from "./Word";
import { getBestGuess } from "..//utils/wordFiltering";
import WORDS from "../utils/words.json";
let wordList = [...WORDS];
const LETTER_STATUS = {
  GREY: "grey",
  YELLOW: "yellow",
  GREEN: "green",
};

const incrementStatus = (status) => {
  switch (status) {
    case LETTER_STATUS.YELLOW:
      return LETTER_STATUS.GREEN;
    case LETTER_STATUS.GREEN:
      return LETTER_STATUS.GREY;
    default:
      return LETTER_STATUS.YELLOW;
  }
};

const getStatuses = (nextWord, nextData) => {
  return nextWord.split("").reduce((statuses, char, index) => {
    if (nextData[char] && nextData[char].green.includes(index)) {
      statuses[index] = LETTER_STATUS.GREEN;
    } else {
      statuses[index] = LETTER_STATUS.GREY;
    }

    return statuses;
  }, {});
};

const INITIAL_WORD = "soare";
const INITIAL_CURRENT_STATUSES = {
  0: LETTER_STATUS.GREY,
  1: LETTER_STATUS.GREY,
  2: LETTER_STATUS.GREY,
  3: LETTER_STATUS.GREY,
  4: LETTER_STATUS.GREY,
};
const INITIAL_LETTER_DATA = {
  s: { green: [], yellow: [], invalid: false },
  o: { green: [], yellow: [], invalid: false },
  a: { green: [], yellow: [], invalid: false },
  r: { green: [], yellow: [], invalid: false },
  e: { green: [], yellow: [], invalid: false },
};

const Solver = () => {
  const [currentWord, setCurrentWord] = useState(INITIAL_WORD);
  const [currentStatuses, setCurrentStatuses] = useState(
    cloneDeep(INITIAL_CURRENT_STATUSES)
  );
  const [letterData, setLetterData] = useState(cloneDeep(INITIAL_LETTER_DATA));

  const resetState = () => {
    wordList = [...WORDS];
    setCurrentWord(null);
    setCurrentStatuses(null);
    setLetterData(null);
    setCurrentWord(INITIAL_WORD);
    setCurrentStatuses(cloneDeep(INITIAL_CURRENT_STATUSES));
    setLetterData(cloneDeep(INITIAL_LETTER_DATA));
  };

  const toggleLetter = (index) => {
    setCurrentStatuses({
      ...currentStatuses,
      [index]: incrementStatus(currentStatuses[index]),
    });
  };

  const onNextGuess = () => {
    const nextData = { ...letterData };
    Object.values(currentStatuses).forEach((status, index) => {
      const char = currentWord[index];
      if (!nextData[char]) {
        nextData[char] = { green: [], yellow: [], invalid: false };
      }
      switch (status) {
        case LETTER_STATUS.GREY:
          nextData[char].invalid =
            !nextData[char].green.length && !nextData[char].yellow.length;
          break;
        default:
          nextData[char][status].push(index);
      }
    });
    setLetterData(nextData);

    const [bestGuess, validWords] = getBestGuess(wordList, nextData);
    wordList = validWords;
    setCurrentWord(bestGuess);

    const nextStatuses = getStatuses(bestGuess, nextData);
    console.log(nextStatuses);
    setCurrentStatuses(nextStatuses);
  };

  const wordData = currentWord.split("").map((char, index) => ({
    char,
    status: currentStatuses[index],
  }));

  return (
    <View>
      <Word wordData={wordData} onTileClick={toggleLetter} />
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Button title="Reset" onPress={resetState}>
            Reset
          </Button>
        </View>
        <View style={{ flex: 2 }}>
          <Button title="Next guess" onPress={() => onNextGuess()}>
            Next
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Solver;
