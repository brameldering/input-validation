import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const nameRef = useRef("");

  const enteredNameisValid = enteredName.trim().length > 0;
  const nameInputIsInvalid = !enteredNameisValid && enteredNameTouched;

  useEffect(() => {
    console.log("Init useEffect");
    nameRef.current.focus();
  }, []);

  const nameChangeHandler = (event) => {
    setEnteredNameTouched(true);
    setEnteredName(event.target.value);
    console.log("enteredName: " + enteredName);
  };

  const onBlurHandler = () => {
    setEnteredNameTouched(true);
    console.log("onBlurHandler, enteredName: " + enteredName);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    if (!enteredNameisValid) {
      alert("enteredName is empty");
    } else {
      console.log("submitHandler, enteredName: " + enteredName);
    }
    setEnteredName("");
    setEnteredNameTouched(false);
  };

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
