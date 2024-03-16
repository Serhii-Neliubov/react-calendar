import {ChangeEvent, useState} from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>|  ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
  };
}