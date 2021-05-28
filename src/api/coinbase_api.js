import { client, w3cwebsocket as W3CWebSocket } from "websocket";

export const getCoinbaseWebSocket = () => {
    const client = new W3CWebSocket('wss://ws-feed.pro.coinbase.com');
    return client;
}

export const subscribeBTC_USD = (socket) => {
    socket.send(JSON.stringify({
        "type": "subscribe",
        "product_ids": ["BTC-USD"],
        "channels": ["full"]
    }));
    console.log("[Coinbase Socket] Subscribed to BTC USD");
}

export const unsubscribeBTC_USD = (socket) => {
    socket.send(JSON.stringify({
        "type": "unsubscribe",
        "product_ids": ["BTC-USD"],
        "channels": ["full"]
    }));    
    console.log("[Coinbase Socket] Unsubscribed to BTC/USD");
}