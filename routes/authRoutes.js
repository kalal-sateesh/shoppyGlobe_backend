import { registerUser, loginUser } from "../controllers/authController.js";

export function authRoutes(app) {
  app.post("/register", registerUser);
  app.post("/login", loginUser);
}
