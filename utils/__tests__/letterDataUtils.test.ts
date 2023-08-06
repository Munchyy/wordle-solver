import { CurrentLetterDataType, LetterDataType } from "../../types/solverTypes";
import { filterWords, transformCurrentLetterData } from "../letterDataUtils";

describe("letterDataUtils", () => {
  describe("transformCurrentLetterData", () => {
    it("should work", () => {
      expect(transformCurrentLetterData([])).toEqual([]);
    });

    it("should get multiple green places", () => {
      const data: CurrentLetterDataType[] = [
        { character: "x", index: 0, status: "green" },
        { character: "x", index: 3, status: "green" },
        { character: "x", index: 4, status: "green" },
      ];
      const expected: LetterDataType[] = [
        {
          character: "x",
          places: [
            { index: 0, status: "green" },
            { index: 3, status: "green" },
            { index: 4, status: "green" },
          ],
        },
      ];
      expect(transformCurrentLetterData(data)).toEqual(expected);
    });

    it("should format some green, some grey", () => {
      const data: CurrentLetterDataType[] = [
        { character: "x", index: 0, status: "green" },
        { character: "x", index: 3, status: "green" },
        { character: "x", index: 4, status: "grey" },
      ];
      const expected: LetterDataType[] = [
        {
          character: "x",
          places: [
            { index: 0, status: "green" },
            { index: 3, status: "green" },
          ],
        },
      ];
      expect(transformCurrentLetterData(data)).toEqual(expected);
    });

    it("should format some green, some yellow", () => {
      const data: CurrentLetterDataType[] = [
        { character: "x", index: 0, status: "green" },
        { character: "y", index: 1, status: "yellow" },
        { character: "y", index: 2, status: "green" },
        { character: "z", index: 3, status: "yellow" },
      ];
      const expected: LetterDataType[] = [
        {
          character: "x",
          places: [{ index: 0, status: "green" }],
        },
        {
          character: "y",
          places: [
            { index: 1, status: "yellow" },
            { index: 2, status: "green" },
          ],
        },
        {
          character: "z",
          places: [{ index: 3, status: "yellow" }],
        },
      ];
      expect(transformCurrentLetterData(data)).toEqual(expected);
    });
  });

  describe("filterWords", () => {
    const wordList = ["hello", "world"];
    it("should return for empty", () => {
      expect(filterWords([], [])).toEqual([]);
    });

    it("should filter green places", () => {
      const data: LetterDataType[] = [
        { character: "h", places: [{ index: 0, status: "green" }] },
      ];
      expect(filterWords(wordList, data)).toEqual(["hello"]);
    });

    it("should filter yellow places", () => {
      const data: LetterDataType[] = [
        { character: "o", places: [{ index: 4, status: "yellow" }] },
      ];
      expect(filterWords(wordList, data)).toEqual(["world"]);
    });

    it("should filter green and yellow places", () => {
      const data: LetterDataType[] = [
        { character: "o", places: [{ index: 4, status: "yellow" }] },
        { character: "l", places: [{ index: 3, status: "green" }] },
      ];
      expect(filterWords(wordList, data)).toEqual(["world"]);
    });

    it("should filter greys", () => {
      const data: LetterDataType[] = [
        { character: "o", places: [{ index: 0, status: "grey" }] },
      ];
      expect(filterWords(wordList, data)).toEqual([]);
    });

    it("should filter some green, some grey", () => {
      const data: LetterDataType[] = [
        {
          character: "l",
          places: [
            { index: 2, status: "grey" },
            { index: 3, status: "green" },
          ],
        },
      ];
      expect(filterWords(wordList, data)).toEqual(["world"]);
    });
  });
});
