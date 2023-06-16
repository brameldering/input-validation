import { useState, useRef, useEffect } from "react";

const useInputValidation = (checkRegex) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [enteredInputTouched, setEnteredInputTouched] = useState(false);
  const inputRef = useRef("");

  const enteredInputisValid = enteredInput.match(checkRegex);
  const inputIsInvalid = !enteredInputisValid && enteredInputTouched;

  const inputChangeHandler = (event) => {
    setEnteredInputTouched(true);
    setEnteredInput(event.target.value);
    console.log("enteredInput: " + event.target.value);
  };

  const onNameBlurHandler = () => {
    setEnteredInputTouched(true);
    console.log("onBlurHandler, enteredInput: " + enteredInput);
  };

  return {
    enteredInput,
    enteredInputTouched,
    inputRef,
    enteredInputisValid,
    inputIsInvalid,
    inputChangeHandler,
    onNameBlurHandler,
  };
};
export default useInputValidation;
