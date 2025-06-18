import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity'; // Import entitas User
import jwt from 'jsonwebtoken';

const secretKey = 'abc_key_123';

// Inisialisasi server Express
const app = express();
const port = 3000;

// Middleware untuk parsing JSON body
app.use(express.json());

// Inisialisasi Data Source TypeORM
const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'cindy',
    password: 'cindy', // Isi password jika ada
    database: 'learning_expres_cindy',
    entities: [User],
});

(async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected');

        // Contoh endpoint GET
        app.get('/', (req, res) => {
            res.send('Halo dari server Express TypeScript!');
        });

        
// API to generate JWT token
   app.post('/auth/login', (req:any, res:any) => {
     const { username } = req.body;


     if (!username) {
       return res.status(400).json({ error: 'Username is required' });
     }


     // Generate a JWT token
     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
     res.status(200).json({ token });
   });


        
        // Endpoint POST untuk menerima data
        app.post('/api/data', (req, res) => {
            const { message } = req.body;
            if (message) {
                res.status(200).json({ received: message, status: 'success' });
            } else {
                res.status(400).json({ error: 'Pesan tidak ditemukan di body permintaan.' });
            }
        });

        // Endpoint GET untuk mengambil user dengan query tertentu
        app.get('/users', async (req, res) => {
            try {
                const userRepository = AppDataSource.getRepository(User);
                const users = await userRepository.find({
                    where: { name: 'John Doe' }, // Contoh kondisi
                    take: 10, // Limit hasil
                    order: { id: 'ASC' }, // Urutkan berdasarkan ID secara ascending
                });
                console.log('Fetched users:', users);
                res.status(200).json(users);
            } catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ error: 'Gagal mengambil data user.' });
            }
        });

        // Endpoint POST untuk menambahkan user baru
        app.post('/users/:id', async (req, res) => {
            const id = Number(req.params.id);
            const { name, email } = req.body;
            try {
                const updatedUser = await AppDataSource.getRepository(User).save({
                    id,
                    name,
                    email,
                });
                res.status(200).send(updatedUser);
            } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        // Endpoint PATCH untuk memperbarui data
        app.patch('/users/:id', async (req, res) => {
            const id = Number(req.params.id);
            const { name, email } = req.body;
            try {
                const updatedUser = await AppDataSource
                    .getRepository(User)
                    .update({ id }, { name, email });

                res.status(200).send(updatedUser);
            } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        // Endpoint PATCH untuk contoh update data
        app.patch('/api/data/:id', (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;

            res.status(200).json({
                nama: 'Cindy',
                nim: '221054010',
                data: {
                    message: `Data dengan ID ${id} telah diperbarui.`,
                    updated: updatedData,
                },
            });
        });

        // Endpoint DELETE untuk menghapus data
        app.delete('/api/data/:id', (req, res) => {
            const id = req.params.id;

            res.status(200).json({
                nama: 'Cindy',
                nim: '221054010',
                data: {
                    message: `Data dengan ID ${id} telah dihapus.`,
                },
            });
        });

        // Menjalankan server
        app.listen(port, () => {
            console.log(`Server berjalan di http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
})();
