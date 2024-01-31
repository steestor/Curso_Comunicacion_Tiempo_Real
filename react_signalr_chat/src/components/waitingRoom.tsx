import { useState } from "react";
import DxTextBox from "devextreme-react/text-box";
import DxButton from "devextreme-react/button";
import { ValueChangedEvent } from "devextreme/ui/text_box";

interface WaitingRoomProps {
    joinChatRoom?: (userName: string, chatRoom: string) => void;
    
}

export function WaitingRoom({ joinChatRoom} : WaitingRoomProps){
    const [userName, setUserName] = useState('');
    const [chatRoom, setChatRoom] = useState('');

    function joinToChat(){
        if (joinChatRoom) {
            joinChatRoom(userName, chatRoom);
        }
    }

    return (
        <>
            <div className="row px-5 py-5">
                <div className="col">
                    <DxTextBox placeholder="Username"  onValueChanged={(e: ValueChangedEvent) => {
                        setUserName(e.value);
                    }} />
                    <DxTextBox placeholder="Chatroom"  onValueChanged={(e: ValueChangedEvent) => {
                        setChatRoom(e.value);
                    }} />

                </div>
                <div className="col">
                    <DxButton text="Join" type="success"  onClick={joinToChat}/>
                </div>

                <div>
                    <WaitingRoom joinChatRoom={joinChatRoom}/>
                </div>
            </div>
        </>
    )

}