const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Email Generator Backend is running!");
});

app.post("/generate", (req, res) => {
  console.log("Received data:", req.body);

  res.json({
    message: "Backend received your email information!"
  });
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});