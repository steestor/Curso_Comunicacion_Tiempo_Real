import { MessageContainer } from "./MessageContainer";

interface ChatRoomProps {
    messages: string[];
}

export function ChatRoom({messages}: ChatRoomProps){
return (
    <>
    <div className="row p-5">
        <div className="col-10">
            ChatRoom
        </div>

    </div>

    <div className="row p-5">
          <div className="col">
            {/* <MessageContainer messages={messages}/> */}
          </div>
    </div>
    </>
)}