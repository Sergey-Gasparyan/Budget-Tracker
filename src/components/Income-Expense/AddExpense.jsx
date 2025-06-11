import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function AddExpense({ onClick }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  function onClickHandler() {
    if (name.trim() !== "" && +amount !== 0 && !isNaN(+amount)) {
      onClick({
        nameTransaction: "expense",
        amount: +amount,
        name : name[0].toUpperCase() + name.slice(1),
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
      });
      setName("");
      setAmount("");
    } else console.log("Something went wrong");
  }
  
  function onChangeAmountHandler(e) {
    if (+e.target.value) setAmount(+e.target.value);
    else {
      setAmount("");
      console.log("Please enter number")
    }
  }

  return (
    <div>
      <label htmlFor="income" style={{ marginLeft: "35px", marginTop: "20px" }}>
        Add Expense
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          value={name}
          id="income"
          onChange={(e) => setName(e.target.value)}
          className="income-input"
          placeholder="Name"
        />
        <input
          value={amount}
          onChange={(e) => onChangeAmountHandler(e)}
          className="income-input"
          placeholder="Expense"
        />
        <button
          style={{ height: "30px", fontSize: "12px", color: "white" }}
          onClick={onClickHandler}
          disabled={name.trim() == "" || +amount == 0}
        >
          Add
        </button>
      </div>
    </div>
  );
}
