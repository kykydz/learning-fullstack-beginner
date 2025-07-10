import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

let globalCounter = 0;

// GET /hello → hanya kirim salam
app.get("/hello", (req: Request, res: Response) => {
  res.status(200).send("Hello, Bayu! Welcome to Buggy Server 🚀");
});

// PATCH /hello → jika ada body.message, tampilkan dalam response
app.patch("/hello", (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Request body harus mengandung 'message'" });
  }

  res.status(200).json({ reply: `Pesan kamu: ${message}` });
});

// POST /count → kirim angka 1–10 + total global counter
app.post("/count", (req: Request, res: Response) => {
  const output = [];
  for (let i = 1; i <= 10; i++) {
    output.push(`Angka ke-${i}`);
    globalCounter++;
  }

  res.json({
    data: output,
    totalRequest: globalCounter
  });
});

// POST /async-error → simulasi error async
app.post("/async-error", async (req: Request, res: Response) => {
  try {
    const result = await Promise.reject("Simulasi error async terjadi!");
    res.send(result); // tidak akan tercapai
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
