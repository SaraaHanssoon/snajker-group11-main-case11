import { 
  Box, 
  Alert, 
  Grid, 
  Paper, 
  Typography, 
  Container, 
  CircularProgress, 
  Card, 
  CardMedia, 
  CardContent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function Home() {
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error(" Kunde inte hämta användare:", err));
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then(() => {
        setUser(null);
        window.location.href = "http://localhost:5173";
      })
      .catch((err) => console.error(" Fel vid utloggning:", err));
  };

  function clearMessage() {
    window.history.replaceState({}, "");
  }

  const fetchProducts = () => {
    setLoading(true);
    setError(null);

    let url = "http://localhost:3000/products"; 
    let params = [];

    if (category) params.push(`category=${category}`);
    if (inStock) params.push(`stock=${inStock}`);

    if (params.length) url = `http://localhost:3000/products/filter?${params.join("&")}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [category, inStock]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {message && open && (
        <Alert
          onClose={() => {
            setOpen(false);
            clearMessage();
          }}
          variant="filled"
          severity="success"
          sx={{ mb: 2, bgcolor: "#87CEEB", color: "#fff", fontWeight: "bold" }}
        >
          {message}
        </Alert>
      )}



      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "#FAA968",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Varumärke</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="">Alla</MenuItem>
              <MenuItem value="1">Adidas</MenuItem>
              <MenuItem value="2">Nike</MenuItem>
              <MenuItem value="3">Puma</MenuItem>
              <MenuItem value="4">Converse</MenuItem>
              <MenuItem value="5">Vans</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Lagerstatus</InputLabel>
            <Select value={inStock} onChange={(e) => setInStock(e.target.value)}>
              <MenuItem value="">Alla</MenuItem>
              <MenuItem value="true">I lager</MenuItem>
              <MenuItem value="false">Slut i lager</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Typography variant="h6" sx={{ color: "red", textAlign: "center" }}>
            Error loading products: {error}
          </Typography>
        ) : (
<Grid container spacing={3}>
  {products.length > 0 ? (
    products.map((item) => (
      <Grid item xs={12} sm={6} md={4} key={item.product_id}>
        <Card 
          sx={{ 
            borderRadius: 3, 
            backgroundColor: "#F6DCAC", 
            cursor: "pointer",
            border: "4px solid #000", 
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)"
          }}
          component={Link}
          to={`/products/${item.product_id}`} 
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardMedia
            component="img"
            height="250" 
            image={`http://localhost:3000/${item.imageUrl}`}
            alt={item.name}
            sx={{ objectFit: "cover" }} 
          />
          <CardContent
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between",
              height: "80px", 
            }}
          >
<Typography 
  variant="h6" 
  sx={{  textAlign: "center", fontFamily: "Fantasy" }} 
>
  {item.name}
</Typography>
<Typography 
  variant="h7" 
  sx={{ color: "black", textAlign: "center", fontFamily: "Fantasy" }} 
>
  {item.price} kr
</Typography>

          </CardContent>
        </Card>
      </Grid>
    ))
  ) : (
    <Typography>No products found.</Typography>
  )}
</Grid>

        )}
      </Paper>
    </Container>
  );
}

export default Home;
