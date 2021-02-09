import {
  POP_FROM_SELECTED_OPTIONS,
  PUSH_T0_SELECTED_OPTIONS,
  RESET,
} from "./types";
import { SortableOptionsSet } from "./model";
import { Actions } from "./actions";

export const reducer = (
  state: SortableOptionsSet,
  action: Actions
): SortableOptionsSet => {
  switch (action.type) {
    case POP_FROM_SELECTED_OPTIONS: {
      const targetIndex = action.payload.originalIndex;
      const currentIndex = state.selectedOptions.findIndex(
        (option) => option.optionId === action.payload.optionId
      );

      const copiedSelectedOptions = [...state.selectedOptions];
      // 選択済みからは削除する
      copiedSelectedOptions.splice(currentIndex, 1);

      // もとの選択肢には戻す
      const copiedRestOptions = [...state.restOptions];
      copiedRestOptions[targetIndex] = {
        ...action.payload,
        selected: false,
      };

      return {
        restOptions: copiedRestOptions,
        selectedOptions: copiedSelectedOptions,
      };
    }
    case PUSH_T0_SELECTED_OPTIONS: {
      const copiedSelectedOptions = [...state.selectedOptions];
      copiedSelectedOptions.push(action.payload);

      const copiedRestOptions = [...state.restOptions];
      copiedRestOptions[action.payload.originalIndex] = {
        ...copiedRestOptions[action.payload.originalIndex],
        selected: true,
      };
      return {
        restOptions: copiedRestOptions,
        selectedOptions: copiedSelectedOptions,
      };
    }
    case RESET:
      return {
        selectedOptions: [],
        restOptions: action.payload.map((option) => ({
          ...option,
          selected: false,
        })),
      };
  }
};
