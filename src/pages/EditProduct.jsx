import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  Typography } from "@mui/material";

const TextField = ({ placeholder,type,name,value,handleChange,existingImage,
}) => {
  if (type === "file") {
    return (
      <div className="p-3">
        <label htmlFor={name} className="form-label">
          {placeholder}
        </label>
        <input
          type="file"
          name={name}
          className="form-control"
          id={name}
          onChange={handleChange}
          accept="image/*"
        />

        {(value || existingImage) && (
          <div className="mt-3">
            <img
              src={
                value
                  ? URL.createObjectURL(value)
                  : `http://localhost:5000${existingImage}`
              }
              alt="Preview"
              className="img-thumbnail"
              style={{ maxHeight: "200px" }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-3">
      <input
        type={type}
        name={name}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

// Main EditProduct Component
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    existingImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product by ID when component mounts
  useEffect(() => {
    const findProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/item/find/${id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setFormData({
          title: data.item.title,
          description: data.item.description,
          price: data.item.price,
          image: null,
          existingImage: data.item.image,
        });

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    findProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("price", formData.price);
    formPayload.append("image", formData.image);
    formPayload.append("existingImage", formData.existingImage);

    try {
      const response = await fetch(
        `http://localhost:5000/api/item/update/${id}`,
        {
          method: "PUT",
          body: formPayload,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update product");
      }

      alert("Product updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error)
    return <p className="text-center text-danger mt-5">Error: {error}</p>;

  return (
    <div className="mt-20">
      <div className="edit-container mt-3">
        <div className="edit-card">
          <div className="edit-card-header">
            <Typography className="edit-card-title" variant="h4"   sx={{flexGrow: 1, fontFamily: 'Poppins', textAlign: 'center', fontWeight: 'bold', color: '#2e11e8ff', mt: 2,}}>
              Edit Product🍃
            </Typography>
          </div>
          <div className="edit-card-body">
            <form onSubmit={handleSubmit}>
              <TextField
                placeholder="Product Title"
                type="text"
                name="title"
                value={formData.title}
                handleChange={handleChange}
              />
              <TextField
                placeholder="Description"
                type="text"
                name="description"
                value={formData.description}
                handleChange={handleChange}
              />
              <TextField
                placeholder="Price"
                type="number"
                name="price"
                value={formData.price}
                handleChange={handleChange}
              />
              <TextField
                placeholder="Product Image"
                type="file"
                name="image"
                existingImage={formData.existingImage}
                handleChange={handleChange}
              />
              <div className="text-center p-3">
                <button type="submit" className="btn-edit">
                  Update Product
                </button>
              </div>
              <div className="text-center p-3">
             <Link to="/dashboard">
              <button className="btn-cancel">
                  Cansel
                </button>
             </Link>  
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
