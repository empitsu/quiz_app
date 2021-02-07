import { SortableOptionsSet } from "./model";
import {
  POP_FROM_SELECTED_OPTIONS,
  PUSH_T0_SELECTED_OPTIONS,
  RESET,
} from "./types";

export const popFromSelectedOptions = (
  removingOption: NonNullable<SortableOptionsSet["selectedOptions"][number]>
) =>
  ({
    type: POP_FROM_SELECTED_OPTIONS,
    payload: removingOption,
  } as const);

export const pushToSelectedOptions = (
  addingOption: NonNullable<SortableOptionsSet["selectedOptions"][number]>
) =>
  ({
    type: PUSH_T0_SELECTED_OPTIONS,
    payload: addingOption,
  } as const);

export const reset = (originalOptions: SortableOptionsSet["restOptions"]) =>
  ({
    type: RESET,
    payload: originalOptions,
  } as const);

export type Actions =
  | ReturnType<typeof popFromSelectedOptions>
  | ReturnType<typeof pushToSelectedOptions>
  | ReturnType<typeof reset>;
