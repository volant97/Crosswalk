'use client';
import React, { useState } from 'react';
import { CheckboxGroup, Checkbox } from '@nextui-org/react';

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);

  const A = '정보 제공 동의 1';
  const B = '정보 제공 동의 2';
  const C = '정보 제공 동의 3';

  const handleCheck = () => {
    if (selected.length === 0) {
      setSelected(['A', 'B', 'C']);
    } else {
      setSelected([]);
    }
  };

  return (
    <div className="flex flex-col gap-3 m-[10rem]">
      <CheckboxGroup label="정보 제공 동의" color="success" value={selected} onValueChange={setSelected}>
        <Checkbox value="A">{A}</Checkbox>
        <Checkbox value="B">{B}</Checkbox>
        <Checkbox value="C">{C}</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">Selected: {selected.join(', ')}</p>
      <button onClick={handleCheck}>모두췍</button>
    </div>
  );
}
