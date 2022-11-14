import React from "react";
import { writeFile } from "./emails/emailGenerator";

function App() {

  const debug = () => {
    writeFile(10);
  };

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

      <button onClick={debug}>Generate</button>

      <button>Download</button>
    </div>
  );
}

export default App;
