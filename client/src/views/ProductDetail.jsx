import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/ProductService"; 
import { addToCart } from "../services/CartService";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await productService.getById(id); 
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error(" Failed to fetch product:", error);
        setError("Kunde inte ladda produkten.");
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart("guest", product.product_id, 1, product.name, product.price);
      alert(` ${product.name} har lagts till i varukorgen!`);
    } catch (error) {
      console.error(" Failed to add to cart:", error);
      alert("Något gick fel vid tillägg i varukorgen.");
    }
  };

  if (loading) return <Typography>Laddar...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm">
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={`http://localhost:3000/${product.imageUrl}`}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6" sx={{ color: "black", mt: 2 }}>
            {product.price} kr
          </Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            sx={{ mt: 2 }}
            onClick={handleAddToCart}
          >
            Lägg till i varukorgen
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<ChevronLeftIcon />}
            sx={{ mt: 2, ml: 2 }}
            onClick={() => navigate('/')}
          >
            Tillbaka till startsidan
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetail;
