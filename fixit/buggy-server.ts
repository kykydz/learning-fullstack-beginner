import express from "express";
const app = express();
const port = 3000;

// app.use(express.json());

import routes from "./routes";

app.patch("/hello", (req, res) => {
  if (!req.body.error) {
    res.status(500).send("Internal Server Error");
  }
  res.status(200).send(new Error(req.body.error));
});

app.post("/count", (req, res) => {
  let count = 0;
  while (count < 10) {
    res.write(`Count: ${count}`);
  }
  res.end();
});

app.post("/async-error", (req, res) => {
  const result = await Promise.reject("Oops!");
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:3306`);
});
