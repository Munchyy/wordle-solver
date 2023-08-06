import clone from "lodash/clone";
import { CurrentLetterDataType, LetterDataType } from "../types/solverTypes";

export const transformCurrentLetterData = (
  currentLetterData: CurrentLetterDataType[],
) => {
  const updatedLetterData: LetterDataType[] = [];

  currentLetterData.forEach((cld) => {
    const found = updatedLetterData.find(
      (uld) => uld.character === cld.character,
    );
    if (found) {
      found.places.push({ index: cld.index, status: cld.status });
    } else {
      updatedLetterData.push({
        character: cld.character,
        places: [{ index: cld.index, status: cld.status }],
      });
    }
  });
  return updatedLetterData;
};

export const filterWords = (
  wordList: string[],
  letterData: LetterDataType[],
) => {
  const filtered = wordList.filter((word) =>
    filterSingleWord(word, letterData),
  );
  return filtered;
};

const filterSingleWord = (word: string, letterData: LetterDataType[]) => {
  let wordClone = clone(word);
  for (
    let letterDataIndex = 0;
    letterDataIndex < letterData.length;
    letterDataIndex += 1
  ) {
    const letterDatum = letterData[letterDataIndex];
    for (
      let placeIndex = 0;
      placeIndex < letterDatum.places.length;
      placeIndex += 1
    ) {
      letterDatum.places.sort((a) => (a.status === "grey" ? -1 : 1));
      const place = letterDatum.places[placeIndex];
      if (place.status === "green") {
        if (wordClone[place.index] !== letterDatum.character) {
          return false;
        }
        const charArr = wordClone.split("");
        charArr.splice(place.index, 1, "_");
        wordClone = charArr.join("");
      } else if (
        place.status === "yellow" &&
        (wordClone[place.index] === letterDatum.character ||
          !wordClone.includes(letterDatum.character))
      ) {
        return false;
      } else if (place.status === "grey") {
        if (letterDatum.places.slice(placeIndex + 1).length) {
          if (wordClone[place.index] === letterDatum.character) {
            return false;
          }
        } else if (wordClone.includes(letterDatum.character)) {
          return false;
        }
      }
    }
  }
  return true;
};
