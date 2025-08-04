import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";

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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress size={60} sx={{ color: "#4caf50" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
    
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          background: "linear-gradient(to right, #f5f5f5, #e8f5e9)",
          p: 4,
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 700,
            color: "#2e7d32",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Discover Our Tea Collection 🍃
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Poppins",
            color: "#455a64",
            fontSize: "1.2rem",
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Experience the finest selection of premium teas, carefully sourced
          from the lush gardens of Sri Lanka. Each cup tells a story of
          tradition and exquisite flavor.
        </Typography>
      </Box>

      {/* Tea Grid */}
      {items.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          No tea items available at the moment.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {item.image && (
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      height: 220,
                      objectFit: "cover",
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      color: "#2e7d32",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#d32f2f",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Rs. {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
