import {
  addToCart,
  updateCart,
  removeFromCart,
  getCartProducts,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export function cartRoutes(app) {
  app.get("/cart/products", authMiddleware, getCartProducts);
  app.post("/cart", authMiddleware, addToCart);
  app.put("/cart/:id", authMiddleware, updateCart);
  app.delete("/cart/:id", authMiddleware, removeFromCart);
}
