const express = require("express");
const cors = require("cors");
require("dotenv").config();

const otpRoutes = require("./routes/otpRoutes");
const signupRoutes = require("./routes/signupRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MyCitiverse Email Backend is Running");
});

app.use("/", otpRoutes);
app.use("/", signupRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
