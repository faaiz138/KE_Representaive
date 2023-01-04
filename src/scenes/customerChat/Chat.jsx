import { Box } from "@mui/material";
import Conversation from "../../components/conversations/Conversation";
import Header from "../../components/Header";
import Message from "../../components/message/Message";
import '../chat/Chat.css'
const Chat = () => {
  return (
    <Box m="20px">
      <Header title="Consumer Chat" subtitle="Contact with Consumer" />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search Consumer" className="chatMenuInput"></input>
            <Conversation/>
          </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                <Message own={true}/>
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
              </div>
              <div className="chatBoxBottom">
                <textarea className="chatMessageInput" placeholder="Enter Message.."></textarea>
                <button className="chatSubmitButton">Send</button>
                </div>              
            </div>
          </div>
      </div>
    </Box>
  );
};

export default Chat;