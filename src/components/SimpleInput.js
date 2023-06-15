import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameisValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameRef = useRef("");

  useEffect(() => {
    console.log("Init useEffect");
    nameRef.current.focus();
  }, []);

  const nameChangeHandler = (event) => {
    setEnteredNameTouched(true);
    const enteredValue = event.target.value;
    console.log("enteredName: " + enteredValue);
    setEnteredName(enteredValue);
    setEnteredNameIsValid(enteredValue.trim().length > 0);
  };

  const onBlurHandler = () => {
    console.log(
      "onBlurHandler, enteredName: " + enteredName + ", and nameRef: " + nameRef.current.value
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameisValid) {
      alert("enteredName is empty");
    } else {
      console.log(
        "submitHandler, enteredName: " + enteredName + ", and nameRef: " + nameRef.current.value
      );
    }
    setEnteredName("");
  };

  const nameInputIsInvalid = !enteredNameisValid && enteredNameTouched;

  const formClassName = nameInputIsInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={formClassName}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameRef}
          type='text'
          id='name'
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={onBlurHandler}
        />
        {nameInputIsInvalid && <div className='error-text'>Invalid</div>}
      </div>

      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
