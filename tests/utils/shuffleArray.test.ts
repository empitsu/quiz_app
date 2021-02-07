import { shuffleArray } from "../../utils/shuffleArray";

describe("shuffleArray", () => {
  it.skip("should exchange elements", () => {
    const testArray = [0, 1];
    const shuffledArray = shuffleArray(testArray);
    expect(shuffledArray).toEqual([1, 0]);
  });
});
