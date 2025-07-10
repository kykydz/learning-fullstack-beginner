import express from 'express';


const app = express();
const port = 8016; // Port untuk server Anda

// Middleware untuk parsing JSON body
app.use(express.json());
let counter = 0;

// Contoh endpoint GET
app.get('/', (req, res) => {
 res.send('Halo dari server Express TypeScript!');
});


// Contoh endpoint POST
app.post('/api/data', (req, res) => {
 const { message } = req.body;
 if (message) {
   res.status(200).json({ received: message, status: 'success' });
 } else {
   res.status(400).json({ error: 'Pesan tidak ditemukan di body permintaan.' });
 }
});

app.patch("/counter", (req, res) => {
  const { value } = req.body;

  if (typeof value !== "number") {
    return res.status(400).json({ error: "Value harus berupa angka" });
  }

  counter += value; // Tambahkan ke counter
  res.json({ counter }); // Kirim nilai counter terbaru
});

// Menjalankan server
app.listen(port, () => {
 console.log(`Server berjalan di http://localhost:${port}`);
});
