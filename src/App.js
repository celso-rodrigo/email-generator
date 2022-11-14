import React from "react";
import { generateEmail } from "./emails/emailGenerator";

function App() {

  const separateFile = (emailList, separation) => {
    if (separation === "commanl") {
      return  emailList.reduce((prev, curr) => `${prev},\n${curr}`);
    } else if (separation === "comma") {
      return  emailList.reduce((prev, curr) => `${prev}, ${curr}`);
    } else {
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
        />
      </label>

      <label>
        Separation Type
        <select defaultValue={"commanl"}>
          <option value={"commanl"}>Comma and new line</option>
          <option value={"comma"}>Comma</option>
          <option value={"nl"}>New line</option>
        </select>
      </label>
      <button onClick={() => downloadFile(50, "nl")}>Download</button>
    </div>
  );
}

export default App;
