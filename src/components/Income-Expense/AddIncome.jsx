import { useState } from "react";
import "./AddIncome.css";

function AddIncome({ onClick }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  function onClickHandler() {
    if (name.trim() !== "" && +amount !== 0 && !isNaN(+amount)) {
      onClick({
        nameTransaction: "income",
        id: new Date().toLocaleString(),
        amount: +amount,
        name: name[0].toUpperCase() + name.slice(1),
        date: new Date().toLocaleDateString(),
      });
      setName("");
      setAmount("");
    } else console.log("Something went wrong");
  }

  function onChangeAmount(e) {
    if (+e.target.value) setAmount(+e.target.value);
    else {
      setAmount("");
      console.log("Please enter number");
    }
  }
  return (
    <div>
      <label htmlFor="income" style={{ marginLeft: "35px", marginTop: "20px" }}>
        Add Income
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
          className="income-input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={amount}
          className="income-input"
          placeholder="Income"
          onChange={(e) => onChangeAmount(e)}
        />
        <button
          style={{ height: "30px", fontSize: "12px", color: "white" }}
          onClick={onClickHandler}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddIncome;
