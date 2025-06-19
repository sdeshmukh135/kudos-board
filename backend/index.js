const express = require("express"); // to import the Express library
const app = express(); // to initialize an express application
const cors = require("cors");
const PORT = 3001; // port

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

app.use(express.json()); // middleware (to accept and send json data)
app.use(cors()); // enable CORs for all routes

// establishing routes
const boardRoutes = require("./routes/boards.js");
const cardRoutes = require("./routes/cards.js");
const commentRoutes = require("./routes/comments.js");

app.use("/boards", boardRoutes);
app.use("/cards", cardRoutes);
app.use("/comments", commentRoutes);
