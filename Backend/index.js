import connectToMango from "./db.js";
import registration from "./routes/registration.js";
import login from "./routes/login.js";
import getProfileRoute from "./routes/get_profile.js"; 
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connectToMango();

app.get("/", (req, res) => {
  res.send({ status: "ok", message: "Backend running successfully!" });
});

app.use("/api", registration);
app.use("/api", login);
app.use("/api/get_profile", getProfileRoute);

app.listen(PORT);
