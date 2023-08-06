export type StatusType = "green" | "yellow" | "grey";
export interface PlaceType {
  status: StatusType;
  index: number;
}

export type LetterDataType = {
  character: string;
  places: PlaceType[];
};

export type ContextType = {
  currentWord: string;
  letterData: LetterDataType[];
  currentLetterData: CurrentLetterDataType[];
  addLetterData: (index: number) => void;
  submitGuess: () => void;
  resetState: () => void;
};

export interface CurrentLetterDataType extends PlaceType {
  character: string;
}
