const express = require("express");
const cors = require("cors")
const app = express();
const dbRoutes = require("./Routes/db");

app.use(cors());
app.use(express.json());
app.use("/api", dbRoutes); 

app.listen(9001, () => {
    console.log("Server is running on http://localhost:9001");
  });
