import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const nameRef = useRef("");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const emailRef = useRef("");

  // Name Check
  const atLeastOneNonSpaceCharacterCheck = /\S/;
  const enteredNameisValid = enteredName.match(atLeastOneNonSpaceCharacterCheck);
  const nameInputIsInvalid = !enteredNameisValid && enteredNameTouched;

  // Email Check
  const mailformat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const enteredEmailisValid = enteredEmail.toLowerCase().match(mailformat);
  const emailInputIsInvalid = !enteredEmailisValid && enteredEmailTouched;

  // Form Check
  const formIsValid = enteredNameisValid && enteredEmailisValid; // and any other fields

  useEffect(() => {
    console.log("Init useEffect");
    nameRef.current.focus();
  }, []);

  const nameChangeHandler = (event) => {
    setEnteredNameTouched(true);
    setEnteredName(event.target.value);
    console.log("enteredName: " + enteredName);
  };

  const onNameBlurHandler = () => {
    setEnteredNameTouched(true);
    console.log("onBlurHandler, enteredName: " + enteredName);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmailTouched(true);
    setEnteredEmail(event.target.value);
    console.log("enteredEmail: " + enteredEmail);
  };

  const onEmailBlurHandler = () => {
    setEnteredEmailTouched(true);
    console.log("onBlurHandler, enteredEmail: " + enteredEmail);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    if (!enteredNameisValid) {
      alert("Name is invalid");
      nameRef.current.focus();
    } else if (!enteredEmailisValid) {
      alert("email is invalid");
      emailRef.current.focus();
    } else {
      setEnteredName(enteredName.trim());
      setEnteredEmail(enteredEmail.trim());
      console.log("submitHandler, enteredName: " + enteredName.trim());
      console.log("submitHandler, enteredEmail: " + enteredEmail);
    }
    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const formNameClassName = nameInputIsInvalid ? "form-control invalid" : "form-control";
  const formEmailClassName = emailInputIsInvalid ? "form-control invalid" : "form-control";

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
          onBlur={onNameBlurHandler}
        />
        {nameInputIsInvalid && <div className='error-text'>Name is mandatory</div>}
      </div>
      <div className={formEmailClassName}>
        <label htmlFor='email'>Your Email Address</label>
        <input
          ref={emailRef}
          type='email'
          id='email'
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={onEmailBlurHandler}
        />
        {emailInputIsInvalid && <div className='error-text'>Email needs to contain @ etc.</div>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
