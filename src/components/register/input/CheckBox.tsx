import { CheckBoxProps } from '@/types/checkBoxPropsType';
import { Checkbox } from '@nextui-org/react';
import React from 'react';

function CheckBox({ id, checked, checkItemHandler }: CheckBoxProps) {
  const checkHandled = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checkHandled');
    checkItemHandler(e.target.id, e.target.checked);
  };

  return (
    <label className="flex-col block border-1">
      <input id={id} type="checkbox" checked={checked} onChange={checkHandled} />
      {id}
    </label>
  );
}
export default CheckBox;
