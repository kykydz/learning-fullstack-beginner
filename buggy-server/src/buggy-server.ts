import express from "express";
const app = express();
const port = 3000;

app.use(express.json()); // Aktifkan middleware JSON agar bisa baca req.body

// ✅ Perbaiki method PATCH → GET, dan logika response
app.get("/hello", (req, res) => {
  res.status(200).send("Hello, world!");
});

// ✅ Perbaiki infinite loop dan cara pengiriman response
app.post("/count", (req, res) => {
  let count = 0;
  let result = "";

  while (count < 10) {
    result += `Count: ${count}\n`;
    count++;
  }

  res.send(result);
});

// ✅ Perbaiki async function (harus async dan pakai try-catch)
app.post("/async-error", async (req, res) => {
  try {
    const result = await Promise.reject("Oops!");
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
