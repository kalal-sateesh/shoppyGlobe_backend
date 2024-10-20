import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";

export function productRoutes(app) {
  app.get("/products", getProducts);
  app.get("/products/:id", getProductById);
  app.post("/product", createProduct);
  // app.delete("/cart/:id", removeFromCart);
}
