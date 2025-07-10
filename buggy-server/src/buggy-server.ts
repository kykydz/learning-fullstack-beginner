import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.patch("/hello", (req, res) => {
const { error } = req.body;
  if (!error) {
    return res.status(500).send("Internal Server Error");
  }
  res.status(200).send(`Pesan error: ${error}`);
});

app.post("/count", (req, res) => {
  let count = 0;
  const interval = setInterval(() => {
    res.write(`Count: ${count}\n`);
    count++;

    if (count >= 10) {
      clearInterval(interval);
      res.end();
    }
  }, 200);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});