import '../styles/OrderHeader.css';

import React from "react";

function OrderHeader() {  
  return (
    <div className="row">
        <p className="row-cell">Side</p>
        <p className="row-cell">Price (USD)</p>
        <p className="row-cell">Amount (BTC)</p>
        <p className="row-cell">Total (USD)</p>
        <p className="row-cell">Sum (USD)</p>
    </div>
  );
}

export default OrderHeader;
