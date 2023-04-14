import React, { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

  //overall form validation
  const OverallFormValidation = () => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
      alert("Form submitted");
    }
  };

  //validate the form when input loses focus

  const emailInputBlurHandler = (event) => {
    setEnteredEmailIsTouched(true);
  };

  //****set input on keystroke- validate input on keystroke*/

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredEmailIsTouched(true);
    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }
    resetNameInput();
    setEnteredEmail("");
    setEnteredEmailIsTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
      </div>
      {nameInputHasError && (
        <p className="error-text">Name must not be empty!</p>
      )}
      <div className={emailInputClasses}>
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          onBlur={emailInputBlurHandler}
          onChange={emailInputChangeHandler}
          value={enteredEmail}
        />
      </div>

      {emailInputIsInvalid && (
        <p className="error-text">Enter a valid email address!</p>
      )}
      <div className="form-actions">
        <button onClick={OverallFormValidation}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
