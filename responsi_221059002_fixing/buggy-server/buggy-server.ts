const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.patch("/hello", (req: any, res: any) => {
  if (!req.body.error) {
    return res.status(400).send("Field 'error' tidak ditemukan di body.");
  }
  res.status(200).send(`Pesan error: ${req.body.error}`);
});

app.post("/count", (req: any, res: any) => {
  let count = 0;
  const interval = setInterval(() => {
    if (count >= 10) {
      clearInterval(interval);
      return res.end();
    }
    res.write(`Count: ${count}\n`);
    count++;
  }, 500);
});

app.post("/async-error", async (req: any, res: any) => {
  try {
    const result = await Promise.reject("Oops!");
    res.send(result); // tidak akan terpanggil
  } catch (err) {
    res.status(500).send(`Terjadi error async: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
