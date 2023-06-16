import { useState } from "react";

const useInput = (fnValidateValue) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = fnValidateValue(inputValue);
  const hasError = !inputIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setIsTouched(true);
    setInputValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue("");
    setIsTouched("");
  };

  return [inputValue, inputIsValid, hasError, inputChangeHandler, inputBlurHandler, reset];
};
export default useInput;
