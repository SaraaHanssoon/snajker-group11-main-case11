import PropTypes from 'prop-types';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Box,
  Paper,
  Typography,
  Rating,
} from "@mui/material";
import { addToCart } from "../services/CartService"; 
function ProductItemLarge({ product, userId }) {
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();

  const getImageUrl = (imageUrl) => {
    return `http://localhost:3000/${imageUrl}`;
  };

  useEffect(() => {
    console.log(' Produktdata:', product);
    console.log(' Bildens sökväg:', getImageUrl(product.imageUrl));
  }, [product]);
  const handleAddToCart = async () => {
    try {
        const currentUserId = userId || "guest"; 
  
        console.log(" Kontrollera input:", {
            userId: currentUserId,
            product_name: product.name, 
            product_id: product.product_id,
            amount,
            price: product.price 
        });
  
        if (!product.product_id || amount <= 0 || isNaN(amount)) {
            alert(" Felaktig input. Kontrollera att du har valt ett giltigt antal.");
            return;
        }
  
        console.log(` Lägger till i varukorg: ${product.name} - Antal: ${amount}, Pris: ${product.price} kr`);
  
        await addToCart(currentUserId, product.product_id, amount, product.name, product.price); 
        alert(`✅ ${product.name} har lagts till i varukorgen!`);
    } catch (error) {
        console.error(" Failed to add product to cart:", error);
        alert("Något gick fel vid tillägg i varukorgen.");
    }
  };
  

  return (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2, width: '100%', maxWidth: '600px', backgroundColor: '#f5f5dc' }} elevation={3}>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h4' sx={{ color: '#6d4c41' }}> {product.name} </Typography>
        <Rating name='read-only' value={product.rating} readOnly />
      </Box>

      <img
        src={getImageUrl(product.imageUrl)}
        alt={`Image of ${product.name}`}
        style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }}
      />

      <Typography variant='body1' sx={{ mt: 4, color: '#3e2723' }}> {product.description} </Typography>

      {typeof product.price !== "undefined" && product.price !== null ? (
        <Typography variant='h6' gutterBottom sx={{ color: '#1b5e20' }}>
          {product.price} kr
        </Typography>
      ) : (
        <Typography variant='body1' color="error">Price not available</Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <TextField
          label="Quantity"
          type="number"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={amount || 1}
          onChange={(e) => {
            const val = Number(e.target.value);
            setAmount(val > 0 ? val : 1);
          }}
          size="small"
          sx={{ width: "100px" }}
        />

        <Button
          sx={{ ml: 1.5 }}
          onClick={handleAddToCart}
          startIcon={<AddShoppingCartIcon />}
          variant="contained"
          color="primary"
        >
          Add to Cart
        </Button>
      </Box>

      <Button
        variant='contained'
        color='primary'
        startIcon={<ChevronLeftIcon />}
        sx={{
          mt: 2,
          backgroundColor: '#795548', 
          '&:hover': { backgroundColor: '#5d4037' },
        }}
        onClick={() => navigate(-1)}
      >
        Back to Shop
      </Button>
    </Paper>
  );
}

ProductItemLarge.propTypes = {
  product: PropTypes.shape({
    rating: PropTypes.number,
    product_id: PropTypes.number,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,
  userId: PropTypes.number, 
};

export default ProductItemLarge;
