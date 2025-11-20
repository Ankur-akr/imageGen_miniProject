const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "15mb" }));

app.get("/", (req, res) => res.json({ ok: true, msg: "AI Image Generator Backend (No DB)" }));

app.use("/api/image", require("./routes/image"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on port", PORT));
