// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// let users = [];

// const addUser = (userId, socketId) => {
//   console.log(userId, socketId)
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId })
//     console.log(users, "ONLINE USERS");
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   console.log(userId, users, "THESE ARE THE USERS");
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   console.log("user has logged on");

//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     if (user) {
//       io.to(user.socketId).emit("getMessage", {
//         senderId,
//         text,
//       });
//     }
//   });

  

//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });


