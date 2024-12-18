import React, { useState } from "react";
import api from "../Router/api";
import "../comp_css/AddProduct.css";
import { Link, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    category: "",
    available: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Basic validation while typing
    if (name === "price" && value < 0) {
      setErrors({ ...errors, [name]: "Price cannot be negative" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty required fields
    const newErrors = {};
    if (!product.name) newErrors.name = "Product name is required";
    if (!product.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!product.description) newErrors.description = "Description is required";
    if (!product.price || product.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!product.category) newErrors.category = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true); // Set loading state
      const response = await api.post("/ecom/products/add", product);
      console.log("Product added successfully:", response.data);
      alert("Product Added Successfully!");
      setProduct({
        name: "",
        imageUrl: "",
        description: "",
        price: 0,
        category: "",
        available: true,
      });
      setErrors({});
      navigate("/admin");
    } catch (error) {
      alert(error.response.data.message || "Error adding product.");
      console.error("Error adding product:", error.response.data);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="adminAddProduct">
      <h2 style={{ textAlign: "center" }}>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Product Name: <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name (e.g., Apple)"
            autoFocus
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="imageUrl">Image URL: <span className="required">*</span></label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL (e.g., http://example.com/image.jpg)"
          />
          {product.imageUrl && (
            <div className="image-preview">
              <img src={product.imageUrl} alt="Preview" />
            </div>
          )}
          {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="description">Description: <span className="required">*</span></label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="price">Price: <span className="required">*</span></label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="category">Category: <span className="required">*</span></label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="electronics">Electronics</option>
            <option value="gadgets">Gadgets</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;