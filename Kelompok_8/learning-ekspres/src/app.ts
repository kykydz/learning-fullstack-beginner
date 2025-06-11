import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity'; // Import entitas User

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

        // Endpoint POST untuk menerima data
        app.post('/api/data', (req, res) => {
            const { message } = req.body;
            if (message) {
                res.status(200).json({ received: message, status: 'success' });
            } else {
                res.status(400).json({ error: 'Pesan tidak ditemukan di body permintaan.' });
            }
        });

        // Endpoint GET untuk mengambil semua user
        app.get('/users', async (req, res) => {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            res.json(users);
        });

        // Endpoint POST untuk menambahkan user baru
        app.post('/users', async (req, res) => {
            const userRepository = AppDataSource.getRepository(User);
            const user = userRepository.create(req.body);
            const result = await userRepository.save(user);
            res.status(201).json(result);
        });

        // Endpoint PATCH (Update)
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

        // Endpoint DELETE
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
