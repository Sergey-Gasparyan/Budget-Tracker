import { useContext} from "react";
import { HistoryContext } from "./context/HistoryContext";
import "./Finance.css";

export default function Finance() {
  const budget = useContext(HistoryContext);
  const income = budget.length ? budget
        .filter(({ nameTransaction }) => nameTransaction === "income")
        .reduce((acc, { amount }) => acc + Number(amount), 0)
    : 0;

    const expense =  budget.length ? budget
        .filter(({ nameTransaction }) => nameTransaction === "expense")
        .reduce((acc, { amount }) => acc - Number(amount), 0)
    : 0;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="balance income">
          <div className="boxes-finance">Income</div>
          <div className="boxes-finance">+{+income.toFixed(2)}$</div>
        </div>
        <div className="balance expense">
          <div className="boxes-finance">Expense </div>
          <div className="boxes-finance">{+expense.toFixed(2)}$</div>
        </div>
        <div className="balance total">
          <div className="boxes-finance" >Total </div>
          <div className="boxes-finance" >{+(income + expense).toFixed(2)}$</div>
        </div>
      </div>
      <hr style={{ width: "calc(100% - 100px)" }} />
    </>
  );
}
