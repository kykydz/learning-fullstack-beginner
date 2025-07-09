import express from "express";
import { DataSource } from "typeorm";
import cors from "cors";
import jwt from "jsonwebtoken";
import "reflect-metadata";

import { User } from "./entities/User";
import { Product } from "./entities/Product";
import { CartItem } from "./entities/CartItem";
import { authMiddleware } from "./middleware/auth";

const app = express();
const PORT = 3001;
const SECRET = "abc_key_123";

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
app.use(express.json());

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "cindy",
  password: "cindy",
  database: "supermarket",
  synchronize: false,
  entities: [User, Product, CartItem],
});

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected Successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: AppDataSource.isInitialized ? "Connected" : "Disconnected",
  });
});

app.post("/auth/login", async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }

    const userRepo = AppDataSource.getRepository(User);
    let user = await userRepo.findOneBy({ username });
    if (!user) {
      user = await userRepo.save({ username, password: "" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
    res.json({ token, user, message: "Login successful" });
  } catch (err) {
    next(err);
  }
});

app.get("/products", authMiddleware, async (req, res, next) => {
  try {
    const products = await AppDataSource.getRepository(Product).find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

app.get("/products/:id", authMiddleware, async (req, res, next) => {
  try {
    const product = await AppDataSource.getRepository(Product).findOneBy({ id: +req.params.id });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.post("/products", authMiddleware, async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const product = await AppDataSource.getRepository(Product).save({ name, price, description });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.patch("/products/:id", authMiddleware, async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    await AppDataSource.getRepository(Product).update(
      { id: +req.params.id },
      { name, price, description }
    );
    res.json({ message: "Product updated" });
  } catch (err) {
    next(err);
  }
});

app.delete("/products/:id", authMiddleware, async (req, res, next) => {
  try {
    await AppDataSource.getRepository(Product).delete({ id: +req.params.id });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
});

app.get("/cart", authMiddleware, async (req, res, next) => {
  try {
    const userId = (req as any).user.userId;
    const cart = await AppDataSource.getRepository(CartItem).find({
      relations: ["product"],
      where: { user: { id: userId } },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

app.post("/cart", authMiddleware, async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;
    const userId = (req as any).user.userId;

    const cartItem = await AppDataSource.getRepository(CartItem).save({
      user: { id: userId },
      product: { id: product_id },
      quantity,
    });
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});

app.patch("/cart/:id", authMiddleware, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    await AppDataSource.getRepository(CartItem).update(
      { id: +req.params.id },
      { quantity }
    );
    res.json({ message: "Cart item updated" });
  } catch (err) {
    next(err);
  }
});

app.delete("/cart/:id", authMiddleware, async (req, res, next) => {
  try {
    await AppDataSource.getRepository(CartItem).delete({ id: +req.params.id });
    res.json({ message: "Cart item deleted" });
  } catch (err) {
    next(err);
  }
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
