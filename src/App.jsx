import { useState } from "react";
import Finance from "./components/Finance";
import Transactions from "./components/Transactions";
import { HistoryContext } from "./components/context/HistoryContext";
import AddTrasaction from "./components/Income-Expense/AddTrasaction"
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
           <AddTrasaction onClick={onClickHandler} trasactionName="Income" />
           <AddTrasaction onClick={onClickHandler} trasactionName="Expense" />
           <Transactions onClick={setHistory}/>
      </div>
    </HistoryContext.Provider>
  );
}

export default App;
