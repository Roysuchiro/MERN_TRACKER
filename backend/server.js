require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/location", require("./routes/locationRoutes"));

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("sendLocation", (data) => {
    socket.broadcast.emit("receiveLocation", data);
  });
});

// Start


server.listen(5000, () => {
  console.log(`Server running on ${5000}`);
});
