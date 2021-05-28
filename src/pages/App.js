import '../styles/App.css';

import React, { useEffect, useState, useRef } from "react";
import { getCoinbaseWebSocket, subscribeBTC_USD, unsubscribeBTC_USD } from '../api/coinbase_api';
import OrderRow from '../components/OrderRow';
import OrderHeader from '../components/OrderHeader';

function App() {
  var coinbaseSocket = useRef(null);
  const [buyQueue, setBuyQueue] = useState(new Array());
  const [sellQueue, setSellQueue] = useState(new Array());
  const [depth, setDepth] = useState(20);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(() => {
    // Socket handlers
    coinbaseSocket.current = getCoinbaseWebSocket();
    coinbaseSocket.current.onopen = () => {
      console.log("[Coinbase] Socket open");
      subscribeBTC_USD(coinbaseSocket.current);
    }
    coinbaseSocket.current.onmessage = (message) => {
      const orderData = JSON.parse(message.data);
      if(orderData.type === "received") {
        if(orderData.side === "buy") {
          setBuyQueue(oldQueue => {
            var ret = [orderData, ...oldQueue];
            while(ret.length > depth) {
              ret.pop();
            }
            return ret;
          });
        }

        if(orderData.side === "sell") {
          setSellQueue(oldQueue => {
            var ret = [orderData, ...oldQueue];
            while(ret.length > depth) {
              ret.pop();
            }
            return ret;
          });
        }
      }
    }
    coinbaseSocket.current.onclose = () => {
      unsubscribeBTC_USD(coinbaseSocket.current);
      console.log("Closed");
    }
    
    // Window resizing
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      coinbaseSocket.current.close();
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  var buySum = 0;
  var buyRows = buyQueue.map((val, index) => {
    const totalValueUSD = val.price * val.size;
    buySum += totalValueUSD;
    return (
      <OrderRow
        isBuy
        price={val.price}
        size={val.size}
        total={totalValueUSD}
        sum={buySum}
        index={index+1}
        key={val.order_id}
      />
    );
  });

  var sellSum = 0;
  var sellRows = sellQueue.map((val, index) => {
    const totalValueUSD = val.price * val.size;
    sellSum += totalValueUSD;
    return (
      <OrderRow
        price={val.price}
        size={val.size}
        total={totalValueUSD}
        sum={sellSum}
        index={index+1}
        key={val.order_id}
      />
    );
  });

  return (
    <div className="AppContainer">
      <h1>Coinbase BTC/USD Order Book</h1>
      <div className="App">
        <div className="OrderTable">
          <OrderHeader />
          {buyRows}
        </div>
        <div className="OrderTable">
          <OrderHeader />
          {sellRows}
        </div>
      </div>
    </div>
  );
}

export default App;
