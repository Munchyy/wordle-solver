const getLetterCounts = (wordList, currentWord = "") => {
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
    { max: "n/a" },
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
        0,
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
    { max: -1, wordList: [] },
  );
  return weights.wordList[0] ?? "";
};
