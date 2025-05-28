import express from 'express';

const app = express();
const port = 3000; // Port untuk server Anda

// Middleware untuk parsing JSON body
app.use(express.json());

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

// Menjalankan server
app.listen(port, () => {
 console.log(`Server berjalan di http://localhost:${port}`);
});
