import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

//get /cart : Get the products from cart

export const getCartProducts = async (req, res) => {
  try {
    const products = await Cart.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products from cart" });
  }
};

// POST /cart: Add product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product || product.stockQuantity < quantity) {
      return res
        .status(400)
        .json({ message: "Invalid product or insufficient stock" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// PUT /cart/:id: Update cart quantity
export const updateCart = async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    const item = cart.items.find((item) =>
      item.productId.equals(req.params.id)
    );
    if (!item)
      return res.status(404).json({ message: "Product not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.json({ message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart" });
  }
};

// DELETE /cart/:id: Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    cart.items = cart.items.filter(
      (item) => !item.productId.equals(req.params.id)
    );
    await cart.save();
    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart" });
  }
};
