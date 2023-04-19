import { Grid, Paper,List, ListItem, ListItemIcon, ListItemText, Divider, TextField, Avatar, Fab } from '@mui/material';
import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import Header from "../../components/Header";
const classes = {
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
};
const userList = ["Fasih","Zain", "Alice", "CindyBaker"];
const Chat = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const handleSendMessage = () => {
        if (newMessage.trim() === "") {
          return;
        }
        const time = new Date().toLocaleTimeString();
        const newMsg = {
          message: newMessage,
          time,
          sender: "FaaizAsif",
        };
        setMessages((prevState) => ({
          ...prevState,
          [selectedUser]: [...prevState[selectedUser], newMsg],
        }));
        setNewMessage("");
      };
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredUsers = userList.filter((user) =>
        user.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const [messages, setMessages] = useState({
        Fasih: [
          {
            message: "Hey man, What's up ?",
            time: "09:30",
            sender: "FaaizAsif",
          },
          {
            message: "Hey, Iam Good! What about you ?",
            time: "09:31",
            sender: "Fasih",
          },
          {
            message: "Cool. i am good, let's catch up!",
            time: "10:30",
            sender: "FaaizAsif",
          },
        ],
        Zain: [
              {
                message: "I need some Extra Resources",
                time: "09:31",
                sender: "Zain",
              },
              {
                message: "Dispatched",
                time: "10:30",
                sender: "FaaizAsif",
              },
        ],
        Alice: [
          {
            message: "Hey Alice, How are you?",
            time: "09:30",
            sender: "FaaizAsif",
          },
          {
            message: "I'm good. Thanks for asking",
            time: "09:31",
            sender: "Alice",
          },
        ],
        CindyBaker: [
          {
            message: "Hi Cindy, how's it going?",
            time: "09:30",
            sender: "FaaizAsif",
          },
          {
            message: "I'm doing well, thanks",
            time: "09:31",
            sender: "CindyBaker",
          },
        ],
      });
  return (
      <div>
        <Header title="Supervisor Chat" subtitle="Chat with Supervisor" />
        <Grid container component={Paper} sx={classes.chatSection}>
            <Grid item xs={3} sx={classes.borderRight500}>
                <List>
                <ListItem button key="FaaizAsif" onClick={() => setSelectedUser("FaaizAsif")}>
                        <ListItemIcon>
                        <Avatar alt="Faaiz Asif" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="KE Representative - Faaiz"></ListItemText>
                    </ListItem>
                    <Divider />
                <ListItem>
                            <TextField
                                id="search-bar"
                                label="Search users"
                                variant="outlined"
                                fullWidth
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </ListItem>
                        <Divider />
                        {filteredUsers.map((user) => (
                            <ListItem
                                button
                                key={user}
                                selected={selectedUser === user}
                                onClick={() => setSelectedUser(user)}
                            >
                                <ListItemIcon>
                                    <Avatar
                                        alt={user}
                                        src='https://material-ui.com/static/images/avatar/8.jpg'
                                    />
                                </ListItemIcon>
                                <ListItemText primary={user} />
                            </ListItem>
                        ))}
                </List>
            </Grid>
            <Grid item xs={9}>
                    <List sx={classes.messageArea}>
    {messages[selectedUser] && messages[selectedUser].map((msg) => (
        <ListItem key={msg.id}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText sx={{
                        backgroundColor: msg.sender === selectedUser ? '#007AFF' : '#F5F5F5',
                        color: msg.sender === selectedUser ? '#fff' : '#333',
                        borderRadius: "10px",
                        padding: "10px",
                        fontSize: "16px",
                        float: msg.sender === selectedUser ? "left" : "right" 
                    }}
                    align={msg.sender === selectedUser ? "left" : "right"}
                    primary={msg.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ListItemText
                        align={msg.sender === selectedUser ? "left" : "right"}
                        secondary={msg.time}
                    />
                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>

                <Divider />
                <Grid container sx={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    </Grid>
                    <Grid xs={1} align="right">
                    <Fab color="primary" aria-label="add" onClick={handleSendMessage}>
                    <SendIcon />
                    </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        {console.log(selectedUser)}
      </div>
  );
}

export default Chat;