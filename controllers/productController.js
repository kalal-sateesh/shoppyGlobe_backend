import { Product } from "../models/productModel.js";

// GET /products: Fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// GET /products/:id: Fetch product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, stockQuantity } = req.body;

  // Validate input data
  if (!name || !price || !stockQuantity) {
    return res
      .status(400)
      .json({ message: "Name, price, and stock quantity are required." });
  }

  // Create a new product instance
  const newProduct = new Product({
    name: name,
    price: price,
    description: description,
    stockQuantity: stockQuantity,
  });

  try {
    const data = await newProduct.save(); // Save the product to the database

    // Check if the data is saved successfully
    if (!data) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    // Send the saved product data in the response
    res.status(201).json(data); // 201 Created
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product" }); // Return a 500 status if an error occurs
  }
};
