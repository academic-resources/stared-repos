import React from "react";
import { useState } from "react";
import "./App.css";
import { numbers, operators, specials } from "./data";
// STEP 4 - import the button and display components
// Don't forget to import any extra css/scss files you build into the correct component

// Logo has already been provided for you. Do the same for the remaining components
import Logo from "./components/DisplayComponents/Logo";

function App() {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  const operators = ["/", "*", "-", "+", "="];
  const specials = ["C", "+/-", "%"];
  // STEP 5 - After you get the components displaying using the provided data file, write your state hooks here.

  /*const [numbersState, setNumbersState] = useState(numbers);
  const [operatorsState, setOperatorsState] = useState(operators);
  const [specialState, setSpecialState] = useState(specials);
  */
  let [displayAmount, buttonClick] = useState(1);
  /*
  buttonClick (id) => {
      console.log(id);
      if (id === "C") {
        console.log(id + " button clicked!");
      } else if (id === "+/-") {
        console.log(id + " button clicked else if!");
      } else if (id === "%") {
        console.log(id + " button clicked else if 2!");
      }
  };
  
  */

  buttonClick = e => {
    console.log("inside the buttonClick function with item:  " + e.item);
    if (e.item === "C") {
      displayAmount = 0;
      console.log(displayAmount);
      return;
    } else if (e.item === "+/-") {
      console.log(e.item + " button clicked else if!");
      return;
    } else if (e.item === "%") {
      console.log(e.item + " button clicked else if 2!");
      return;
    } else if (
      e.item === "0" ||
      e.item === "1" ||
      e.item === "2" ||
      e.item === "3" ||
      e.item === "4" ||
      e.item === "5" ||
      e.item === "6" ||
      e.item === "7" ||
      e.item === "8" ||
      e.item === "9"
    ) {
      console.log(e.item + " button clicked else if 3!");
    } else if (e.item === ".") {
      console.log(e.item + " button clicked else if 5!");
    } else if (
      e.item === "/" ||
      e.item === "*" ||
      e.item === "+" ||
      e.item === "-" ||
      e.item === "="
    ) {
      console.log(e.item + " button clicked else if 4!");
    }
  };

  const DisplayWindow = () => {
    return (
      <div id="display" className="display">
        {displayAmount}
      </div>
    );
  };

  const ButtonsSpecials = () => {
    return (
      <div id="specialsRow" className="buttonRow1">
        {specials.map((item, index) => {
          return (
            <div
              id={item}
              className="buttonSp"
              key={index}
              onClickCapture={buttonClick({ item })}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  const NumbersSpecials = () => {
    return (
      <div id="numbersRow" className="buttonRow2">
        {numbers.map((item, index) => {
          return (
            <div
              id={item}
              className="buttonNu"
              key={index}
              onClickCapture={buttonClick({ item })}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  const OperatorsSpecials = () => {
    return (
      <div id="operatorsRow" className="buttonColumn2">
        {operators.map((item, index) => {
          return (
            <div
              id={item}
              className="buttonOp"
              key={index}
              onClickCapture={buttonClick({ item })}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  // onClick={() => incrementA(scoreA + fieldGoal)}
  // if button.textcontent = C Then
  // change displayAmount to 0
  //onClick = {() => {if (document.getElementByClassName("buttonSp").textContent === "C") {displayAmount = 0;}}}

  // if button.textcontent = +/- Then do this
  // nothing if pressed first
  // if number then + /-, then change number to +-
  // onClick={() => incrementA(scoreA + fieldGoal)}

  // if button.textcontent = % Then do this
  // nothing if pressed first
  // if number then %, then change number to %
  // onClick={() => incrementA(scoreA + fieldGoal)}

  // if button.textcontent = 0-9 Then do this
  // add to displayAmount first number clicked/entered
  // second number entered after anything else, do 'anything else' and redisplay displayAmount
  // onClick={() => incrementA(scoreA + fieldGoal)}

  // if button.textcontent = +-/x= Then do this
  // nothing if pressed first
  // if number then +-*/, then arithmetic #s appropriately and redisplay displayAmount
  // onClick={() => incrementA(scoreA + fieldGoal)}

  // Once the state hooks are in place write some functions to hold data in state and update that data depending on what it needs to be doing
  // Your functions should accept a parameter of the the item data being displayed to the DOM (ie - should recieve 5 if the user clicks on
  // the "5" button, or the operator if they click one of those buttons) and then call your setter function to update state.
  // Don't forget to pass the functions (and any additional data needed) to the components as props

  return (
    <div className="container">
      <Logo />
      <div className="App">
        <DisplayWindow />
        <div className="buttonDisplay">
          <div className="buttonColumn1">
            <ButtonsSpecials />
            <NumbersSpecials />
          </div>
          <OperatorsSpecials />
          {/* STEP 4 - Render your components here and be sure to properly import/export all files */}
        </div>
      </div>
    </div>
  );
}

export default App;
