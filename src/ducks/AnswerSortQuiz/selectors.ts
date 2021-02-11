import { SortableOptionsSet } from "./model";

export function isAnswerCorrect(state: SortableOptionsSet): boolean {
  if (state.selectedOptions.length === 0) return false;
  if (state.selectedOptions.length !== state.restOptions.length) return false;
  return state.selectedOptions.every((option, index) => {
    return option.optionId === index + 1;
  });
}
