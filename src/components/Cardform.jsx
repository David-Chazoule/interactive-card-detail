import React, { useState } from "react";
import cardFront from "../images/bg-card-front.png";
import cardBack from "../images/bg-card-back.png";
import cardLogo from "../images/card-logo.svg";
import { ValidNumber } from "../regex/regex";
import { ValidLetter } from "../regex/regex";
import circle from "../images/icon-complete.svg";

function Cardform() {
  // State for storing the card details
  const [cardNumber, setCardNumber] = useState("0000000000000000");
  const [cardHolder, setCardHolder] = useState("Eric Choo");
  const [CVC, setCVC] = useState("000");
  const [month, setMonth] = useState("0");
  const [year, setYear] = useState("0");

   // State for storing validation messages
  const [noValidEnter, setNoValidEnter] = useState("");
  const [cardNovalid, setCardNovalid] = useState("");
  const [cvcNoValid, setCvcNoValid] = useState("");
  const [cardHolderNoValid, setCardHolderNoValid] = useState("");
   
  // State for tracking which fields have errors
  const [errors, setErrors] = useState({
    cardHolder: false,
    cardNumber: false,
    month: false,
    year: false,
    cvc: false,
  });
  const [validate, setValidate] = useState(true);

  // Function to validate the cardholder's name
  const validCardHolder = (value) => {
    setCardHolder(value);
    if (!ValidLetter.test(value)) {
      setCardHolderNoValid("Wrong format, letters only.");
      setErrors((prevErrors) => ({ ...prevErrors, cardHolder: true }));
    } else {
      setCardHolderNoValid("");
      setErrors((prevErrors) => ({ ...prevErrors, cardHolder: false }));
    }
  };

   // Helper function to format the month
  const formatMonth = (month) => {
    if (month.length < 2) {
      return "0" + month;
    } else {
      return month;
    }
  };
  
  // Helper function to format the year
  const formatYear = (year) => {
    if (year.length < 2) {
      return "0" + year;
    } else {
      return year;
    }
  };

  // Function to validate the card number
  const NumberCard = (value) => {
    setCardNumber(value);
    if (!ValidNumber.test(value)) {
      setCardNovalid("Wrong format, numbers only.");
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: true }));
    } else {
      setCardNovalid("");
      setErrors((prevErrors) => ({ ...prevErrors, cardNumber: false }));
    }
  };

  // Function to format the card number into groups of four digits
  const Format = (n) => {
    let array = n.split("");

    for (let i = 4; i < array.length; i += 5) {
      array.splice(i, 0, " ");
    }
    let formattedString = array.join("");

    return formattedString;
  };

  // Function to validate the month
  const NumberMonth = (value) => {
    setMonth(value);
    if (!ValidNumber.test(value)) {
      setNoValidEnter("Can't be blank.");
      setErrors((prevErrors) => ({ ...prevErrors, month: true }));
    } else if (Number(value) > 12) {
      setNoValidEnter("they are not more then 12 months");
      setErrors((prevErrors) => ({ ...prevErrors, month: true }));
    } else {
      setNoValidEnter("");
      setErrors((prevErrors) => ({ ...prevErrors, month: false }));
    }
  };

  // Function to validate the year
  const NumberYear = (value) => {
    setYear(value);
    if (!ValidNumber.test(value)) {
      setNoValidEnter("Can't be blank.");
      setErrors((prevErrors) => ({ ...prevErrors, year: true }));
    } else {
      setNoValidEnter("");
      setErrors((prevErrors) => ({ ...prevErrors, year: false }));
    }
  };

   // Function to validate the CVC number
  const ValidCvc = (value) => {
    setCVC(value);
    if (!ValidNumber.test(value)) {
      setCvcNoValid("Wrong format, numbers only.");
      setErrors((prevErrors) => ({ ...prevErrors, cvc: true }));
    } else {
      setCvcNoValid("");
      setErrors((prevErrors) => ({ ...prevErrors, cvc: false }));
    }
  };

  // Function to handle form submission
  const handlePost = (e) => {
    e.preventDefault();
    setValidate(false);
  };

  const reset = () => {
    setValidate(true);
    setCardNumber("0000000000000000");
setCardHolder("Eric Choo");
setCVC("000");
setMonth("0");
setYear("0");
}

  return (
    <div className="container">
      <div className="cards-container">
        <div className="all-cards">
          <div className="card-front-container">
            <img className="card" src={cardFront} alt="card-image" />
            <img className="logo-card" src={cardLogo} alt="logo-card" />
            <div className="card-info">
              <h2>{Format(cardNumber)}</h2>
              <div className="bottom_card">
                <p>{cardHolder ? cardHolder.toUpperCase() : ""}</p>
                <p>
                  {formatMonth(month)}/{formatYear(year)}
                </p>
              </div>
            </div>
          </div>
          <div className="card-back-container">
            <img src={cardBack} alt="back-card-image" />
            <p>{CVC}</p>
          </div>
        </div>
      </div>
      <div className="form_container">
        {validate ? (
          <form onSubmit={(e) => handlePost(e)}>
            <label>
              CARDHOLDER NAME{" "}
              <input
                type="text"
                id="card-holder"
                className={errors.cardHolder ? "error" : ""}
                placeholder="e.g Eric Choo"
                required
                onChange={(e) => validCardHolder(e.target.value)}
              />
              <div className="error-box">
                <p className="message-error">{cardHolderNoValid}</p>
              </div>
            </label>

            <label>
              CARD NUMBER{" "}
              <input
                type="text"
                id="card-number"
                className={errors.cardNumber ? "error" : ""}
                placeholder="e.g 1234 5678 9123 0000"
                minLength="16"
                maxlength="16"
                required
                onChange={(e) => NumberCard(e.target.value)}
              />
              <div className="error-box">
                <p className="message-error">{cardNovalid}</p>
              </div>
            </label>

            <div className="date-container">
              <label>
                EXP. DATE (MM/YY)
                <span>
                  <input
                    type="text"
                    id="month"
                    className={errors.month ? "error" : ""}
                    placeholder="MM"
                    maxLength="2"
                    required
                    onChange={(e) => {
                      const value = e.target.value;
                      setMonth(value);
                      NumberMonth(value);
                    }}
                  />
                  <input
                    type="text"
                    id="year"
                    className={errors.year ? "error" : ""}
                    placeholder="YY"
                    maxLength="2"
                    required
                    onChange={(e) => NumberYear(e.target.value)}
                  />
                </span>
                <div className="error-box">
                  <p className="message-error">{noValidEnter}</p>
                </div>
              </label>

              <label>
                CVC{" "}
                <input
                  type="text"
                  placeholder="e.g 123"
                  className={errors.cvc ? "error" : ""}
                  maxlength="3"
                  minLength="3"
                  required
                  onChange={(e) => ValidCvc(e.target.value)}
                />
                <div className="error-box">
                  <p className="message-error"> {cvcNoValid}</p>
                </div>
              </label>
            </div>
            <button>Confirm</button>
          </form>
        ) : (
          <div className="confirm-container">
            <img src={circle} alt="validation-logo-image" />
            <h3>THANK YOU</h3>
            <p>We've added your card details</p>
            <button onClick={reset} >Continue</button>
          </div>
        )}

        <div class="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href="https://github.com/David-Chazoule">David</a>.
        </div>
      </div>
    </div>
  );
}

export default Cardform;
