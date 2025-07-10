import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

let globalCounter = 0;

// GET /hello → menyapa
app.get("/hello", (req: Request, res: Response) => {
  res.status(200).send("Hello! Welcome to the server.");
});

// PATCH /hello → kirim balik pesan dari body.message
app.patch("/hello", (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Body harus berisi 'message'" });
  }

  res.status(200).json({ reply: `Pesan: ${message}` });
});

// POST /count → kirim angka 1–10 & update global counter
app.post("/count", (req: Request, res: Response) => {
  const output: string[] = [];

  for (let i = 1; i <= 10; i++) {
    output.push(`Angka ke-${i}`);
    globalCounter++;
  }

  res.status(200).json({
    data: output,
    totalRequest: globalCounter
  });
});

// POST /async-error → simulasi error async
app.post("/async-error", async (req: Request, res: Response) => {
  try {
    const result = await Promise.reject("Terjadi error async!");
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
