// import express from 'express';

// const app = express();
// const port = 3000; // Port untuk server Anda

// // Middleware untuk parsing JSON body
// app.use(express.json());

// // Contoh endpoint GET (API)
// app.get('/', (req, res) => {
//  res.send('Halo dari server Express TypeScript!');
// });

// // Contoh endpoint POST (API)
// app.post('/api/data', (req, res) => {
//  const { message } = req.body;
//  if (message) {
//    res.status(200).json({ received: message, status: 'success' });
//  } else {
//    res.status(400).json({ error: 'Pesan tidak ditemukan di body permintaan.' });
//  }
// });

// // PUT: Update data
// // Endpoint PUT (Update)
// app.patch('/api/data/:id', (req, res) => {
//     const id = req.params.id;
//     const updatedData = req.body;

//     res.status(200).json({
//         nama: 'Affa',
//         nim: '221058017',
//         data: {
//             message: 'Data dengan ID ${id} telah diperbarui.',
//             updated: updatedData
//         }
//     });
// });

// // DELETE: Hapus data
// // Endpoint DELETE
// app.delete('/api/data/:id', (req, res) => {
//     const id = req.params.id;

//     res.status(200).json({
//         nama: 'Affa',
//         nim: '221058017',
//         data: {
//             message: 'Data dengan ID ${id} telah dihapus.'
//         }
//     });
// });

// // Menjalankan server
// app.listen(port, () => {
//  console.log(`Server berjalan di http://localhost:${port}`);
// });

import express from 'express';
import { AppDataSource } from './data-source';
import { User } from './entities/user.entity';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    // GET: read users
    app.get('/users', async (req, res) => {
      const users = await AppDataSource.getRepository(User).find({
        where: { name: 'John Doe' },
        take: 10,
        order: { id: 'ASC' },
      });
      res.status(200).send(users);
    });

    // POST: create user
    app.post('/users', async (req, res) => {
      const { name, email } = req.body;
      const newUser = await AppDataSource.getRepository(User).save({ name, email });
      res.status(201).send(newUser);
    });

    // PATCH: update user
    app.patch('/users/:id', async (req, res) => {
      const id = Number(req.params.id);
      const { name, email } = req.body;
      const result = await AppDataSource.getRepository(User).update({ id }, { name, email });
      res.status(200).send(result);
    });

    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch((error) => console.error('Database connection error:', error));
