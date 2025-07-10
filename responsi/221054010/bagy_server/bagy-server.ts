import express from "express";

const app = express();
const port = 3000;

app.use(express.json()); // aktifkan parser JSON

// 👉 /hello
app.get("/hello", (req, res) => {
  res.status(200).send("Hello");
});

// 👉 /count
app.post("/count", (req, res) => {
  let count = 0;
  let output = "";

  while (count < 10) {
    output += `Count: ${count}\n`;
    count++;
  }

  res.send(output);
});

// 👉 /async-error
app.post("/async-error", async (req, res) => {
  try {
    const result = await Promise.reject("Oops!");
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
