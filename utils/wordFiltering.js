import intersection from "lodash/intersection";
export const getLetterCounts = (wordList, currentWord = "") => {
  const counts = wordList.reduce(
    (acc, curr) => {
      curr.split("").forEach((character) => {
        if (currentWord.toLowerCase().includes(character.toLowerCase())) {
          return acc;
        }
        if (acc[character]) {
          acc[character] += 1;
        } else {
          acc[character] = 1;
        }
        if (acc[character] > acc[acc.max]) {
          acc.max = character;
        }
      });
      return acc;
    },
    { max: "n/a" }
  );
  return counts;
};

/**
 * From the old solver, seems to take most unique letters in the word as best weighting
 * @param {string[]} wordList
 * @returns best word from available
 */
export const getBestValid = (wordList) => {
  const letterCounts = getLetterCounts(wordList);
  const weights = wordList.reduce(
    (acc, word) => {
      const wordWeight = [...new Set(word.split(""))].reduce(
        (acc, curr) => acc + letterCounts[curr],
        0
      );
      acc[word] = wordWeight;
      if (wordWeight === acc.max) {
        acc.wordList = acc.wordList.concat(word);
      } else if (wordWeight > acc.max) {
        acc.max = wordWeight;
        acc.wordList = [word];
      }
      return acc;
    },
    { max: -1, wordList: [] }
  );
  return weights.wordList[0] ?? "";
};

/**
 * Calculate the best possible word to guess given the grey/yellow/green values
 * @param {string[]} wordList
 * @param {Record<string, { green: number[], yellow: number[], invalid: Boolean}>} letterData
 * @returns The best word to guess, ERROR if something went wrong
 */
export const getBestGuess = (wordList, letterData) => {
  let validWords = wordList;
  Object.entries(letterData);
  const invalidLetters = [
    ...new Set(
      Object.entries(letterData)
        .filter(([k, v]) => v.invalid)
        .map(([k, v]) => k)
    ),
  ];
  validWords = validWords.filter(
    (word) => !intersection(invalidLetters, word.split("")).length
  );
  validWords = doFilter(letterData, validWords, "green", wordContainsAllGreens);
  validWords = doFilter(
    letterData,
    validWords,
    "yellow",
    wordContainsAllYellows
  );

  return [getBestValid(validWords) || "error", validWords];
};

const doFilter = (letterData, validWords, arr, filterFunction) => {
  const filterData = Object.entries(letterData)
    .filter(([k, v]) => v[arr].length)
    .reduce((acc, [char, data]) => {
      acc[char] = data[arr];
      return acc;
    }, {});

  return validWords.filter((word) =>
    filterFunction(word, validWords, filterData)
  );
};

const wordContainsAllGreens = (word, validWords, greens) => {
  const greenArr = Object.entries(greens);
  for (let i = 0; i < greenArr.length; i += 1) {
    const [char, indexes] = greenArr[i];
    for (let j = 0; j < indexes.length; j += 1) {
      if (word[indexes[j]] !== char) {
        return false;
      }
    }
  }
  return true;
};

const wordContainsAllYellows = (word, validWords, yellows) => {
  const yellowArr = Object.entries(yellows);
  for (let i = 0; i < yellowArr.length; i += 1) {
    const [char, indexes] = yellowArr[i];
    if (!word.includes(char)) {
      return false;
    }
    for (let j = 0; j < indexes.length; j += 1) {
      if (word[indexes[j]] === char) {
        return false;
      }
    }
  }
  return true;
};
