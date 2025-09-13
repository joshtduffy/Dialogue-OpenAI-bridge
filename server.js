import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
