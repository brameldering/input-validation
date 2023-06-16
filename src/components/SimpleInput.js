import { useRef, useEffect } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const [
    enteredName,
    enteredNameisValid,
    nameHasError,
    nameChangeHandler,
    nameBlurHandler,
    resetName,
  ] = useInput((value) => value.match(/\S/));

  const nameRef = useRef("");

  const [
    enteredEmail,
    enteredEmailisValid,
    emailHasError,
    emailChangeHandler,
    emailBlurHandler,
    resetEmail,
  ] = useInput((value) =>
    value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  );

  const emailRef = useRef("");

  // Form Check
  const formIsValid = enteredNameisValid && enteredEmailisValid; // and any other fields

  useEffect(() => {
    console.log("Init useEffect");
    nameRef.current.focus();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!enteredNameisValid) {
      alert("Name is invalid");
      nameRef.current.focus();
    } else if (!enteredEmailisValid) {
      alert("email is invalid");
      emailRef.current.focus();
    } else {
      console.log("submitHandler, enteredName: " + enteredName.trim());
      console.log("submitHandler, enteredEmail: " + enteredEmail);
    }
    resetName();
    resetEmail();
  };

  const formNameClassName = nameHasError ? "form-control invalid" : "form-control";
  const formEmailClassName = emailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={formNameClassName}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameRef}
          type='text'
          id='name'
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <div className='error-text'>Name is mandatory</div>}
      </div>
      <div className={formEmailClassName}>
        <label htmlFor='email'>Your Email Address</label>
        <input
          ref={emailRef}
          type='email'
          id='email'
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <div className='error-text'>Email needs to contain @ etc.</div>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
