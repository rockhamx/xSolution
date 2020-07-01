const express = require("express");
const router = require("./src/route");
const app = express();
const port = 4000;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
