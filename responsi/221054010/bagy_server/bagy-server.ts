import express from "express";

const app = express();
const port = 3000;

app.use(express.json()); // aktifkan parser JSON

// 👉 /hello
app.get("/hello", (_req, res) => {
  res.status(200).send("Hello");
});

// 👉 /count
app.post("/count", (_req, res) => {
  let output = [];
  for (let count = 0; count < 10; count++) {
    output.push(`Count: ${count}`);
  }
  res.status(200).send(output.join("<br>"));
});

// 👉 /async-error
app.post("/async-error", async (_req, res) => {
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
