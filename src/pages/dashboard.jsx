import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {  Typography } from "@mui/material";
import EditProduct from '../pages/EditProduct';
const Button = ({ title, btnColor }) => {
  return (
    <button type="submit" className={btnColor}>
      {title}
    </button>
  );
};
const TextField = ({ placeholder, type, name, value, handleChange }) => {
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

        {value && typeof value === "object" && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(value)}
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

const ProductTable = ({Productdata}) => {
  return (
    <div className="product-table">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {Productdata.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid"
                  style={{ maxWidth: "100px" }}
                />
              </td>
              <td>
               <Link to={`/editProduct/${item._id}`}><button className="editButton">Edit</button></Link> 
                <button className="deleteButton">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};


const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [items, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/item/getall");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong on the server");
        }
       setItem(data.items);
       setLoading(false);
       console.log(data);
      } catch (err) {
        console.error("Fetching error:", err);
        setError(err.message);
      }
    };
    fetchItems();
  },[]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:5000/api/item/create", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong on the server");
      }

      alert(result.message);
      setFormData({ title: "", description: "", price: "", image: null });
    } catch (error) {
      console.error("Error from frontend:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card col-md-8 col-lg-6 mx-auto">
        <div className="card-header">
          <h1 className="text-center card-title">Add New Product</h1>
        </div>
        <div className="card-body">
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
              value={formData.image}
              handleChange={handleChange}
            />
            <div className="p-3">
              <Button title="Save Product" btnColor="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
      <div className="card mt-4 mb-4">
      <div className="card-header">
         <Typography variant="h4"   sx={{flexGrow: 1, fontFamily: 'Poppins', textAlign: 'center', fontWeight: 'bold', color: '#2e11e8ff', mt: 2,}}>
  All Tea 🍃
</Typography>
      </div>
      <div className="card-body">
        <ProductTable Productdata={items}/>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
