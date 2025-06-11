import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./AddTransaction.css";

function AddTrasaction({ onClick,trasactionName }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  function onClickHandler() {
    if (name.trim() !== "" && +amount !== 0 && !isNaN(+amount)) {
      onClick({
        nameTransaction: trasactionName,
        id: uuidv4(),
        amount: +Number(+amount).toFixed(2),
        name: name[0].toUpperCase() + name.slice(1),
        date: new Date().toLocaleDateString(),
      });
      setName("");
      setAmount("");
    } else console.log("Something went wrong");
  }

  function onChangeAmount(e) {
    if (+e.target.value) setAmount(e.target.value);
    else {
      setAmount("");
      console.log("Please enter number");
    }
  }
  return (
    <div>
      <label htmlFor="income" style={{ marginLeft: "50px", marginTop: "20px" }}>
        Add {trasactionName[0].toUpperCase() + trasactionName.slice(1)}
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
          className="income-input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={amount}
          className="income-input"
          placeholder={trasactionName}
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

export default AddTrasaction;
