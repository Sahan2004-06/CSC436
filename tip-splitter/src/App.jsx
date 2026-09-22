import { useState } from "react";
import "./App.css";
import TipButton from "./TipButton.jsx";

function App() {
  const [bill, setBill] = useState("");
  const [percent, setPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const tipAmount = (Number(bill) * percent) / 100;
  const total = Number(bill) + tipAmount;
  const perPerson = total / people;

    return (
    <div>
      <h1>Tip Splitter</h1>

      <label>
        Bill amount: $
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </label>

      <div>
        <TipButton percent={15} active={percent === 15} onSelect={setPercent} />
        <TipButton percent={18} active={percent === 18} onSelect={setPercent} />
        <TipButton percent={20} active={percent === 20} onSelect={setPercent} />
      </div>
      <p>Tip: {percent}%</p>

      <div>
        <button onClick={() => setPeople(Math.max(1, people - 1))}>-</button>
        <span> People: {people} </span>
        <button onClick={() => setPeople(people + 1)}>+</button>
      </div>

      {Number(bill) > 0 ? (
        <div>
          <p>Tip amount: ${tipAmount.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <p>Per person: ${perPerson.toFixed(2)}</p>
        </div>
      ) : (
        <p>Enter a bill to start</p>
      )}
    </div>
  );
}

export default App;
