import useInputUseReducer from "../hooks/use-input-usereducer";

const fnValueIsNotEmpty = (value) => value.match(/\S/);

const fnEmailIsValid = (value) =>
  value.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const BasicForm = (props) => {
  const [
    firstnameValue,
    firstnameIsValid,
    firstnameHasError,
    firstnameChangeHandler,
    firstnameBlurHandler,
    resetFirstname,
  ] = useInputUseReducer(fnValueIsNotEmpty);

  const [
    lastnameValue,
    lastnameIsValid,
    lastnameHasError,
    lastnameChangeHandler,
    lastnameBlurHandler,
    resetLastname,
  ] = useInputUseReducer(fnValueIsNotEmpty);

  const [
    emailValue,
    emailIsValid,
    emailHasError,
    emailChangeHandler,
    emailBlurHandler,
    resetEmail,
  ] = useInputUseReducer(fnEmailIsValid);

  const formIsValid = firstnameIsValid && lastnameIsValid && emailIsValid;

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(firstnameValue + " - " + lastnameValue + " - " + emailValue);
    resetFirstname();
    resetLastname();
    resetEmail();
  };

  const firstnameClass = firstnameHasError ? "form-control invalid" : "form-control";
  const lastnameClass = lastnameHasError ? "form-control invalid" : "form-control";
  const emailClass = emailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={firstnameClass}>
        <div className='form-control'>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            id='firstname'
            value={firstnameValue}
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
          />
          {firstnameHasError && <p className='error-text'>Firstname is mandatory</p>}
        </div>
        <div className={lastnameClass}>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            value={lastnameValue}
            onChange={lastnameChangeHandler}
            onBlur={lastnameBlurHandler}
          />
          {lastnameHasError && <p className='error-text'>Lastname is mandatory</p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p className='error-text'>Not a valid email address</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
