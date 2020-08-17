const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {generatemessage}=require('./utils/messages');
const {addUser,getUsersInRoom,getUser,removeUser}=require('./utils/user');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'../', 'dist/chat')));
// Send all requests to index.html
app.get('/*', function(req, res) {
  // console.log();
  res.sendFile(path.join(__dirname ,'../', '/dist/chat/index.html'));
});



io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    console.log(path.join(__dirname ,'../', '/dist/chat/index.html'))
    socket.on("set_user",(user,callback)=>{
    	const{error,User}=addUser({id:socket.id,...user});
    	if(error)
    		return callback(error)
        callback();
        console.log(User.username+" is inserted in"+User.roomno);
    	socket.join(User.roomno);
    	socket.broadcast.to(User.roomno).emit("welcomeUser",`${User.username} has joined the meeting`);
    	if(User)
        {
            console.log('user');
            console.log(User); 
           io.to(User.roomno).emit("Userjoined",
           {
               users:getUsersInRoom(User.roomno),
               roomno:User.roomno
           })
        }
    })

    socket.on("sendmessage",(message)=>{
        const user=getUser(socket.id);
        console.log(user);
        console.log(message);
        if(user)
        io.to(user.roomno).emit("getmessage",generatemessage(user.username,message));
    })

    socket.on('disconnect', () => {
       console.log('disconnect');
       const user=removeUser(socket.id);
       console.log(user);
       if(user)
      {
          console.log(getUsersInRoom(user.roomno));
           socket.broadcast.to(user.roomno).emit("welcomeUser",`${user.username} has left the meeting`);

       io.to(user.roomno).emit("Userjoined",
              {
                  users:getUsersInRoom(user.roomno),
                  roomno:user.roomno
              })          
        }
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})