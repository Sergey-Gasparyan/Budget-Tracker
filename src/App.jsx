import { useState } from "react";
import Finance from "./components/Finance";
import Transactions from "./components/Transactions";
import { HistoryContext } from "./components/context/HistoryContext";
import AddExpense from "./components/Income-Expense/AddExpense";
import AddIncome from "./components/Income-Expense/AddIncome";
import "./App.css";


function App() {
  const [history, setHistory] = useState([]);
  
  function onClickHandler(data) {
    setHistory([...history,data])
  }

  return (
    <HistoryContext.Provider value={history}>
      <div className="wrapper">
          <div style={{display: "flex",justifyContent: "center",fontWeight: "bold",fontSize: "35px"}}>Budget Tracker</div>
           <Finance />
           <AddIncome onClick={onClickHandler} />
           <AddExpense onClick={onClickHandler} />
           <Transactions />
      </div>
    </HistoryContext.Provider>
  );
}

export default App;
