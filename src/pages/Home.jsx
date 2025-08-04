import { useEffect, useState } from "react";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/item/getall");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch items");
      }

      setItems(data.items);
    } catch (err) {
      console.error("Fetching error:", err);
      alert("Error fetching items: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
     <Typography variant="h4"   sx={{flexGrow: 1, fontFamily: 'Poppins', textAlign: 'center', fontWeight: 'bold', color: '#eaeef2ff', mt: 2,}}>
  All Tea 🍃
</Typography>
      <div className="row">
        {items.length === 0 ? (
          <p className="text-center">No items found.</p>
        ) : (
          items.map((item) => (
            <div className="card-container col-md-4 mb-4" key={item._id}>
              <div className="custom-card h-100 shadow-sm">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="fw-bold">Rs. {item.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
