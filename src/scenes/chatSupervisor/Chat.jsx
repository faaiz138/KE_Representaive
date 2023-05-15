import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Avatar,
  Fab,
} from "@mui/material";
import { Box, Typography, useTheme } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Header from "../../components/Header";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const classes = {
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
};
const userList = ["fyptesting@gmail.com", "fyptesting2@gmail.com"];
const Chat = ({ route, navigation }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  //Client 1
  const [currentMessage, setCurrentMessage] = useState("");
  const [client1, getClient1] = useState(false);
  const [sname, getSession1] = useState("");
  const [cemail, getEmail1] = useState("Waiting for Client");
  const [swapscreens, setScreens] = useState(true);
  const [messageList, setMessageList] = useState([]);

  //Client 2
  const [messageList2, setMessageList2] = useState([]);
  const [client2, getClient2] = useState(false);
  const [sname2, getSession2] = useState("");
  const [cemail2, getEmail2] = useState("Waiting for Client");
  const email = localStorage.getItem("loggedInUserEmail");

  const sendMessage = async () => {
    if (currentMessage != "") {
      const messageData = {
        room: sname,
        author: email,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((List) => [...List, messageData]);
      setCurrentMessage("");
    }
  };

  const sendMessage2 = async () => {
    if (currentMessage != "") {
      const messageData = {
        room: sname2,
        author: email,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList2((List) => [...List, messageData]);
      setCurrentMessage("");
    }
  };

  // const update_status = async () => {
  //   await axios
  //     .patch(`http://192.168.4.201:3300/update_status/${email}/${status}`)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const update_client = async () => {
    await axios
      .put("http://localhost:3080/consumer_chat/exit_chat", {
        email: email,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log("Updated");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const exitchat = async (room) => {
    await socket.emit("leave_room", room);
  };

  const exit_chat = useCallback(
    (data) => {
      console.log(data);
      console.log(sname);
      if (data.localeCompare(sname) == 0) {
        // exitchat(sname)
        console.log("this got hit");
        update_client();
        getEmail1("Waiting for Client");
        getSession1("");
        setMessageList([]);
        getClient1(false);
      } else {
        //exitchat(sname2)
        update_client();
        console.log("The second one got hit");
        getEmail2("Waiting for Client");
        getSession2("");
        setMessageList2([]);
        getClient2(false);
      }
    },
    [sname, sname2]
  );

  useEffect(() => {
    socket.removeAllListeners("user_left");
    socket.on("user_left", exit_chat);
  }, [socket, exit_chat]);

  const receiveMessage = useCallback(
    (data) => {
      console.log(data);
      console.log(messageList);
      console.log("sname is  :" + sname);
      console.log("ans: " + data.room.localeCompare(sname));
      if (data.room.localeCompare(sname) === 0 && sname !== "") {
        setMessageList((List) => [...List, data]);
      } else if (sname2 !== "") {
        console.log("This one executed");
        setMessageList2((List) => [...List, data]);
      }
    },
    [sname, sname2]
  );

  useEffect(() => {
    socket.removeAllListeners("receive_message");
    socket.on("receive_message", receiveMessage);
    //   socket.removeAllListeners('user_left');
  }, [socket, receiveMessage]);

  const get_client = async () => {
    await axios
      .put("http://localhost:3080/consumer_chat/get_client", {
        email: email,
      })
      .then(function (response) {
        if (response.status === 200) {
          if (client1 === false) {
            getClient1(true);
            console.log(response.data);
            // sname1=response.data['sname'];
            getSession1(response.data["session_name"]);
            getEmail1(response.data["consumer_id"]);
            socket.emit("join_room", response.data["session_name"]);
            //     joinRoom1();
            console.log("Session " + response.data["session_name"] + " joined");
          } else if (client2 === false) {
            getClient2(true);
            getSession2(response.data["session_name"]);
            getEmail2(response.data["client_email"]);
            //     sname3=response.data['sname']
            socket.emit("join_room", response.data["session_name"]);
            //     joinRoom1();
            console.log("Session " + response.data["session_name"] + " joined");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (client1 === false || client2 === false) {
        get_client();
        console.log("API called after for vendor ...");
        console.log(client1 + " and " + client2);
      }
      // else if(client2===false)
      // {
      //   get_client()
      //   console.log('API for client 2 called after for vendor ...')
      //   console.log(client2)
      // }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [client1, client2]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = userList.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <Header title="Supervisor Chat" subtitle="Chat with Supervisor" />
      <Grid container component={Paper} sx={classes.chatSection}>
        <Grid item xs={3} sx={classes.borderRight500}>
          <List>
            <ListItem
              button
              key="FaaizAsif"
              onClick={() => setSelectedUser("FaaizAsif")}
            >
              <ListItemIcon>
                <Avatar
                  alt="Faaiz Asif"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
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
                    src="https://material-ui.com/static/images/avatar/8.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary={user} />
              </ListItem>
            ))}
            <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: green[800],
              marginTop: '270px',
              width: '26%',
              height: '50px',
              fontSize: '0.9rem',
              marginRight:'2px',
              marginLeft:'24px'
            }}
          >
            Go Online
          </Button>
            <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: green[800],
              marginTop: '270px',
              width: '27%',
              height: '50px',
              fontSize: '0.9rem',
              marginRight:'10px',
              marginLeft:'10px'
            }}
          >
            End Chat 1
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: green[800],
              marginTop: '270px',
              width: '27%',
              height: '50px',
              fontSize: '0.9rem',
            }}
          >
            End Chat 2
          </Button>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List sx={classes.messageArea}>
            {selectedUser == userList[0] &&
              messageList.map((msg) => (
                <ListItem key={msg.author}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{
                          backgroundColor:
                            msg.author === selectedUser ? "#007AFF" : "#F5F5F5",
                          color: msg.author === selectedUser ? "#fff" : "#333",
                          borderRadius: "10px",
                          padding: "10px",
                          fontSize: "16px",
                          float: msg.author === selectedUser ? "left" : "right",
                        }}
                        align={msg.author === selectedUser ? "left" : "right"}
                        primary={msg.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={msg.author === selectedUser ? "left" : "right"}
                        secondary={msg.time}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            {selectedUser == userList[1] &&
              messageList2.map((msg) => (
                <ListItem key={msg.author}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{
                          backgroundColor:
                            msg.author === selectedUser ? "#007AFF" : "#F5F5F5",
                          color: msg.author === selectedUser ? "#fff" : "#333",
                          borderRadius: "10px",
                          padding: "10px",
                          fontSize: "16px",
                          float: msg.author === selectedUser ? "left" : "right",
                        }}
                        align={msg.author === selectedUser ? "left" : "right"}
                        primary={msg.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={msg.author === selectedUser ? "left" : "right"}
                        secondary={msg.time}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
          </List>
          <Divider />
          <Grid container sx={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                onClick={
                  selectedUser === userList[0] ? sendMessage : sendMessage2
                }
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {console.log(selectedUser)}
    </div>
  );
};

export default Chat;
