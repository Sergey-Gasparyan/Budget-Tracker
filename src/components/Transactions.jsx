import { useContext ,useState } from "react";
import { HistoryContext } from "./context/HistoryContext";
import "./Transactions.css"

export default function Transactions() {
  const history = useContext(HistoryContext);
  const [show, setShow] = useState(false);
  const lastThree = history.length > 3 ? history.slice(-3) : history;

  if (!history.length) {
    return (
      <div style={{
        fontSize: "25px",
        fontWeight: 'bold',
        marginTop: "80px"
      }} className="centered-div">
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
          scrollbarWidth: "thin"
        }}
      >
        {itemsToRender.map(({ name, amount, date, nameTransaction ,id}) => (
          <div
            key={id}
            style={{
              border: '1px solid gray',
              borderRadius: "7px",
         
              padding: "5px",
              marginBottom: "5px"
            }}
            className="centered-div"
          >
             <span style={{ flex: 1 ,color:nameTransaction === "income" ? 'green' : 'red'}}>{name}</span>
             <span style={{ flex: 1, textAlign: "center",color:nameTransaction === "income" ? 'green' : 'red'}}>{nameTransaction === "income" ? '+' + amount : '-' + amount}$</span>
             <span style={{ flex: 1, textAlign: "right", whiteSpace: "nowrap" }}>{date}</span>
          </div>
        ))}
      </div>

      {history.length > 3 && (
        <div style={{ marginLeft: "35px", marginTop: "10px" }}>
          <button className="centered-div" onClick={() => setShow(!show)} style={{height:"35px",fontSize:"16px",color:"white"}}>
            {show ? 'Hide' : 'Show All'}
          </button>
        </div>
      )}
    </div>
  );
}