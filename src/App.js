import React, { useState } from "react";
import { generateEmail } from "./emails/emailGenerator";

function App() {
  const [amount, setAmount] = useState(1);
  const [separation, setSeparation] = useState("commanl");

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
    const emailList = generateEmail(amount);
    const separatedFile = separateFile(emailList, separation);
    const blob = new Blob([separatedFile], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "random-email.txt";
    link.href = url;
    link.click();
  }

  return (
    <div className="App">
      <label>
        Email Amount
        <input
          type="number"
          max="40000"
          min="1"
          value={amount}
          onChange={({target}) => setAmount(target.value)}
        />
      </label>

      <label>
        Separation Type
        <select defaultValue={"commanl"} onChange={({target}) => setSeparation(target.value)}>
          <option value={"commanl"}>Comma and new line</option>
          <option value={"comma"}>Comma</option>
          <option value={"nl"}>New line</option>
        </select>
      </label>
      <button onClick={() => downloadFile(amount, separation)}>Download</button>
    </div>
  );
}

export default App;
