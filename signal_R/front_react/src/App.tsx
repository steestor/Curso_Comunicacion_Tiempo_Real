import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import "./App.css";
import { GlobalCalendar } from "./components/global-calendar";

function App() {
  // Datos

  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<[string]>([""]);

  useEffect(() => {
    createHubConnection();
  }, []);

  function createHubConnection() {
    const connection = new HubConnectionBuilder().withUrl("https://localhost:7029/hubConnection").build();
    setHubConnection(connection);

    try {
      connection?.start();

      connection?.on("sendMessage", (msg) => {
        const allMessages = messages;
        allMessages?.push(msg);
        setMessages([...allMessages]);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div>Conexión establecida: {hubConnection ? "true" : "false"}</div>
      <div>{messages?.map((msg) => (msg !== "" ? <div>{msg}</div> : <></>))}</div>

      <GlobalCalendar />
    </div>
  );
}

export default App;
