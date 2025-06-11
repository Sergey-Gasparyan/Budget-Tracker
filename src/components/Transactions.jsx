import { useContext, useState } from "react";
import { HistoryContext } from "./context/HistoryContext";
import "./Transactions.css";

export default function Transactions({ onClick }) {
  const history = useContext(HistoryContext)
  const [show, setShow] = useState(false)
  const [inputs, setInputs] = useState({})
  const lastThree = history.length > 3 ? history.slice(-3) : history

  function changeHandler(id) {
    const selected = history.find((el) => el.id === id);
    const updatedInputs = {
      ...inputs,
      [id]: {
        name: selected.name,
        amount: selected.nameTransaction === "income" ? selected.amount : -selected.amount
      }
    }

    setInputs(updatedInputs)
    const newHistory = history.map((el) => {
       if (el.id !== id) return el
       return { ...el, mustEdit: true }
    })

    onClick(newHistory);
  }

  
  function editHandler(id) {
    const { name, amount } = inputs[id]

    const editedHistory = history.map((el) => {
      if (el.id !== id) return el
      return {
        ...el,
        name,
        amount: Math.abs(amount),
        mustEdit: false,
        nameTransaction: amount > 0 ? "income" : "expense",
      };
    });

    const updatedInputs = { ...inputs }
    delete updatedInputs[id]

    setInputs(updatedInputs)
    onClick(editedHistory)
  }


  function deleteHandler(id) {
    const newHistory = history.filter((el) => el.id !== id)
    onClick(newHistory)
  }

  if (!history.length) {
    return (
      <div
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          marginTop: "80px",
        }}
        className="centered-div"
      >
        Your Transactions is empty!
      </div>
    );
  }

  const itemsToRender = show ? history : lastThree;

  return (
    <div>
      <h3 style={{ marginLeft: "35px", fontSize: "22px" }}>Transactions</h3>
      <div
        style={{
          maxHeight: show ? "140px" : "auto",
          overflowY: show ? "auto" : "visible",
          margin: "10px 35px",
          scrollbarColor: "#888 #f1f1f1",
          scrollbarWidth: "thin",
        }}
      >
        {itemsToRender.map(
          ({ name, amount, date, nameTransaction, id, mustEdit }) =>
            mustEdit ? (
              <div
                key={id}
                style={{
                  border: "1px solid gray",
                  borderRadius: "7px",
                  padding: "5px",
                  marginBottom: "5px",
                }}
                className="centered-div"
              >
                <input
                  value={inputs[id]?.name || ""}
                  id="income"
                  onChange={(e) => setInputs({...inputs,[id] : {...inputs[id] , name:e.target.value}})}
                  className="income-input"
                  style={{ width: "120px" }}
                  placeholder="Name"
                />
                <input
                  value={inputs[id]?.amount || ""}
                  onChange={(e) => setInputs({...inputs,[id] : {...inputs[id] , amount:+e.target.value}})}
                  className="income-input"
                  style={{ width: "120px" }}
                  placeholder="Amount"
                />
                <button
                  style={{
                    height: "30px",
                    fontSize: "12px",
                    color: "white",
                    marginLeft: "15px",
                  }}
                  onClick={() => editHandler(id)}
                  disabled={isNaN(inputs[id].amount) || +inputs[id].amount == 0 || inputs[id].name.trim() == ""}
                >
                  Edit
                </button>
                <button
                  style={{
                    height: "30px",
                    fontSize: "12px",
                    color: "white",
                    marginLeft: "15px",
                  }}
                  onClick={() => deleteHandler(id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div
                key={id}
                style={{
                  border: "1px solid gray",
                  borderRadius: "7px",

                  padding: "5px",
                  marginBottom: "5px",
                }}
                className="centered-div"
              >
                <span
                  style={{
                    flex: 1,
                    color: nameTransaction === "income" ? "green" : "red",
                  }}
                >
                  {name}
                </span>
                <span
                  style={{
                    flex: 1,
                    textAlign: "center",
                    color: nameTransaction === "income" ? "green" : "red",
                  }}
                >
                  {nameTransaction === "income" ? "+" + Math.abs(amount) : "-" + Math.abs(amount)}$
                </span>
                <span
                  style={{ flex: 1, textAlign: "right", whiteSpace: "nowrap" }}
                >
                  {date}
                </span>
                <button
                  style={{
                    height: "30px",
                    fontSize: "12px",
                    color: "white",
                    marginLeft: "15px",
                  }}
                  onClick={() => changeHandler(id)}
                >
                  Change
                </button>
              </div>
            )
        )}
      </div>

      {history.length > 3 && (
        <div style={{ marginLeft: "35px", marginTop: "10px" }}>
          <button
            className="centered-div"
            onClick={() => setShow(!show)}
            style={{ height: "35px", fontSize: "16px", color: "white" }}
          >
            {show ? "Hide" : "Show All"}
          </button>
        </div>
      )}
    </div>
  );
}
