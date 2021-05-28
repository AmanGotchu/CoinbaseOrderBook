import '../styles/OrderRow.css';

import React from "react";


function OrderRow(props) {  
  return (
    <div className={props.isBuy ? "row-buy" : "row-sell"}>
        <p className="row-cell" style={{ fontWeight: "bold", color: (props.isBuy ? "#00C582" : "#FF0372")}}>
            {props.isBuy ? "BUY" : "SELL"} - {props.index}
        </p>
        <p className="row-cell">{props.price}</p>
        <p className="row-cell">{props.size}</p>
        <p className="row-cell">{props.price * props.size}</p>
        <p className="row-cell">{props.sum}</p>
    </div>
  );
}

export default OrderRow;
