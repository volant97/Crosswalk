export type CheckBoxProps = {
  id: string;
  checked: boolean;
  checkItemHandler: (id: string, isChecked: boolean) => void;
};
