import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

let globalCounter = 0;

// GET /API/hello → menyapa
app.get("/API/hello", (req: Request, res: Response) => {
  res.status(200).send("Hello! Welcome to the server.");
});

// PATCH /API/hello → mengirim ulang pesan
app.patch("/API/hello", (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Body harus berisi 'message'" });
  }

  res.status(200).json({ reply: `Pesan: ${message}` });
});

// POST /API/count → menampilkan angka dan menghitung akses
app.post("/API/count", (req: Request, res: Response) => {
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

// ✅ POST /API/async-error → menangani error async
app.post("/API/async-error", async (req: Request, res: Response) => {
  try {
    // Simulasi error asynchronous
    await Promise.reject(new Error("Simulasi error async terjadi!"));
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
