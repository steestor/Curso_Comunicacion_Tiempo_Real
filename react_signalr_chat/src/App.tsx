import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'devextreme/dist/css/dx.light.css';
import { WaitingRoom } from './components/waitingRoom';
import { useState } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ChatRoom } from './components/ChatRoom';

function App() {

  const [ connection, setConnection ] = useState<HubConnection>();
  const [messages, setMessages] = useState<string[]>([]);

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    try{
      const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7222/chatHub")
      .configureLogging(LogLevel.Information)
      .build();
      
      connection.on("JoinSpecificChatRoom", (userName: string, msg) => {
        console.log("msg: ", msg);
      });

      connection.on("ReceiveSpecificMessage", (userName: string, msg) => {
setMessages(messages => [...messages, msg]);
      });

      await connection.start();
      await connection.invoke("JoinSpecificChatRoom",{userName, chatRoom});
      setConnection(connection);
      

    }catch(error){
      console.log(error);
    }
  }


  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1> Chat application </h1>
          </div>
        </div>

        <div>
          {
            !connection ? <WaitingRoom joinChatRoom={joinChatRoom}/> : <ChatRoom messages={messages}/>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
