import { useState } from 'react';

const useForm = (initialState: { gender: string; name: string; age: number; height: number }) => {
  const [formState, setFormState] = useState(initialState);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return { formState, onChangeHandler };
};

export default useForm;
