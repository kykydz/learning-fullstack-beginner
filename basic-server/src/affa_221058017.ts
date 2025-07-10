import express from 'express';
const app = express();
const port = 8017; // Port untuk server Anda
// Middleware untuk parsing JSON body
app.use(express.json());
// Contoh endpoint GET
app.get('/', (req, res) => {
 res.send('Halo dari server Express TypeScript!');
});
// Menjalankan server
app.listen(port, () => {
 console.log(`Server berjalan di http://localhost:${port}`);
});
