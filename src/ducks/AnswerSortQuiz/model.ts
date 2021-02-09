type Option = {
  optionId: number;
  originalIndex: number;
  text: string;
  selected: boolean;
};

export type SortableOptionsSet = {
  selectedOptions: Option[];
  restOptions: Option[];
};

export const sortableOptionsSet: SortableOptionsSet = {
  selectedOptions: [],
  restOptions: [],
};
