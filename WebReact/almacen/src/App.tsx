import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hubConnection, setHubConnection] = useState<HubConnection>();

  useEffect(() => {
    createHubConnection();
  }, []);

  function createHubConnection() {
    const connection = new HubConnectionBuilder().withUrl("https://localhost:7029/hubConnection").build();
    setHubConnection(connection);

    try {
      connection?.start().then(() => {
        debugger;
        alert("Conexión establecida");
      });
    } catch (e) {
      console.log(e);
    }
  }

  return <div className="App">Conexión 2: {hubConnection ? "true" : "false"}</div>;
}

export default App;
