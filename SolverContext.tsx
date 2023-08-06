import { ReactNode, createContext, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
  ContextType,
  CurrentLetterDataType,
  LetterDataType,
  StatusType,
} from "./types/solverTypes";
import {
  filterWords,
  transformCurrentLetterData,
} from "./utils/letterDataUtils";
import WORDS from "./utils/words.json";
import { getBestValid } from "./utils/wordFiltering";
let wordList: string[] = [...WORDS];

const initialContext: ContextType = {
  currentWord: "soare",
  letterData: [],
  currentLetterData: [],
  addLetterData: () => null,
  submitGuess: () => null,
  resetState: () => null,
};

const SolverContext = createContext<ContextType>(initialContext);

const LETTER_STATUS: Record<string, StatusType> = {
  GREY: "grey",
  YELLOW: "yellow",
  GREEN: "green",
};

const cycleStatus = (status: StatusType) => {
  switch (status) {
    case LETTER_STATUS.YELLOW:
      return LETTER_STATUS.GREEN;
    case LETTER_STATUS.GREEN:
      return LETTER_STATUS.GREY;
    default:
      return LETTER_STATUS.YELLOW;
  }
};

const getCurrentLetterData: (
  word: string,
  letterData?: LetterDataType[],
) => CurrentLetterDataType[] = (word, letterData) => {
  return word.split("").map((character, index) => {
    const found = letterData?.find((ld) => ld.character === character);
    let status: StatusType = "grey";
    if (found) {
      if (
        found.places.find(
          (place) => place.index === index && place.status === "green",
        )
      ) {
        status = "green";
      } else if (
        found.places.find(
          (place) => place.index === index && place.status === "yellow",
        )
      ) {
        status = "yellow";
      }
    }
    return {
      character,
      status,
      index,
    };
  });
};
type Props = { children: ReactNode };
export const SolverProvider: React.FC<Props> = ({ children }: Props) => {
  const [currentWord, setCurrentWord] = useState<string>(
    initialContext.currentWord,
  );
  const [letterData, setLetterData] = useState<LetterDataType[]>([]);

  const [currentLetterData, setCurrentLetterData] = useState<
    CurrentLetterDataType[]
  >(getCurrentLetterData("soare"));

  const resetState = () => {
    setCurrentWord("soare");
    setLetterData([]);
    setCurrentLetterData(getCurrentLetterData("soare"));
    wordList = [...WORDS];
  };

  const addLetterData = (index: number) => {
    const nextData = cloneDeep(currentLetterData);
    nextData[index].status = cycleStatus(nextData[index].status);
    setCurrentLetterData(nextData);
  };

  const submitGuess = () => {
    const letterDataToReplace: LetterDataType[] =
      transformCurrentLetterData(currentLetterData);
    const updatedLetterData = cloneDeep(letterData);
    letterDataToReplace.forEach((ldtr) => {
      const found = updatedLetterData.find(
        (uld) => uld.character === ldtr.character,
      );
      if (found) {
        found.places = ldtr.places;
      } else {
        updatedLetterData.push(ldtr);
      }
    });
    wordList = filterWords(wordList, updatedLetterData);
    const nextBestGuess = getBestValid(wordList) || "error";
    setCurrentWord(nextBestGuess);
    setCurrentLetterData(
      getCurrentLetterData(nextBestGuess, updatedLetterData),
    );
    setLetterData(updatedLetterData);
  };
  return (
    <SolverContext.Provider
      value={{
        currentWord,
        letterData,
        currentLetterData,
        addLetterData,
        submitGuess,
        resetState,
      }}
    >
      {children}
    </SolverContext.Provider>
  );
};

export default SolverContext;
