import {
  popFromSelectedOptions,
  pushToSelectedOptions,
  reducer,
  reset,
} from "../../../src/ducks/AnswerSortQuiz";

const testOption = {
  optionId: 0,
  text: "test",
  originalIndex: 0,
};
describe("reducer()", () => {
  it("should remove an option from selected options with 'popFromSelectedOptions action", () => {
    const result = reducer(
      {
        restOptions: [],
        selectedOptions: [testOption],
      },
      popFromSelectedOptions(testOption)
    );
    expect(result).toEqual({
      restOptions: [testOption],
      selectedOptions: [],
    });
  });

  it("should remove an option from selected options with 'popFromSelectedOptions' is invoked", () => {
    const result = reducer(
      {
        restOptions: [],
        selectedOptions: [testOption],
      },
      popFromSelectedOptions(testOption)
    );
    expect(result).toEqual({
      restOptions: [testOption],
      selectedOptions: [],
    });
  });

  it("should add an option to selected options when 'pushToSelectedOptions' is invoked", () => {
    const result = reducer(
      {
        restOptions: [testOption],
        selectedOptions: [],
      },
      pushToSelectedOptions(testOption)
    );
    expect(result).toEqual({
      restOptions: [{ ...testOption, text: "" }],
      selectedOptions: [testOption],
    });
  });

  it("should reset state with the payload when 'reset' is invoked", () => {
    const result = reducer(
      {
        restOptions: [{ ...testOption, text: "" }],
        selectedOptions: [testOption],
      },
      reset([testOption])
    );
    expect(result).toEqual({
      restOptions: [testOption],
      selectedOptions: [],
    });
  });
});
