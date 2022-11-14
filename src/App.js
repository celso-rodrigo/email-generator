import React, { useState } from "react";
import { generateEmail } from "./emails/emailGenerator";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [separation, setSeparation] = useState("commanl");
  const [problem, setProblem] = useState("Please choose the email amount.");

  const separateFile = (emailList, separation) => {
    switch(separation) {
      case "commanl":
        return  emailList.reduce((prev, curr) => `${prev},\n${curr}`);
      case "comma":
        return  emailList.reduce((prev, curr) => `${prev}, ${curr}`);
      default:
        return  emailList.reduce((prev, curr) => `${prev}\n${curr}`);
    }
  };

  function downloadFile(amount, separation) {
    setLoading(true);
    const emailList = generateEmail(amount);
    const separatedFile = separateFile(emailList, separation);
    const blob = new Blob([separatedFile], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "random-email.txt";
    link.href = url;
    link.click();
    setLoading(false);
  }

  const handleInput = (amount) => {
    if (amount <= 0) return setProblem("You cannot generate less than one email.");
    if (amount > 40000) return setProblem("You cannot generate more than 40.000 emails.");
    setProblem("");
    setAmount(amount);
  };

  return (
    <fieldset className="main">
      <legend className="title">Email Generator</legend>
      <label className="amount-input">
        Email Amount
        <input
          type="number"
          onChange={({target}) => handleInput(target.value)}
        />
      </label>

      <label className="separation-input">
        Separation Type
        <select defaultValue={"commanl"} onChange={({target}) => setSeparation(target.value)}>
          <option value={"commanl"}>Comma and new line</option>
          <option value={"comma"}>Comma</option>
          <option value={"nl"}>New line</option>
        </select>
      </label>

      {loading 
        ? <div className="loading" />
        : (
          <>
            {<p className="problem">{problem !== "EMPTY" && problem}</p>}
            <button
              disabled={problem.length}
              onClick={() => downloadFile(amount, separation)}
              className="download"
            >
              Download
            </button>
          </>
        )
      }
    </fieldset>
  );
}

export default App;
