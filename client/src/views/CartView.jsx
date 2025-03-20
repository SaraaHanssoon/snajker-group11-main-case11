import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateCart } from "../services/CartService";
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Divider, 
  Button,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function CartView({ userId }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        if (userId) {
          const fetchedCart = await getCart(userId);
          setCartItems(fetchedCart.CartItems || []);
        } else {
          const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          setCartItems(guestCart);
        }
      } catch (error) {
        console.error(" Failed to fetch cart:", error);
      }
    }

    fetchCart();
  }, [userId]);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price ?? 0) * item.amount, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(userId || "guest", productId);
      setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error(" Failed to remove item:", error);
    }
  };

  const handleAmountChange = async (productId, newAmount) => {
    if (newAmount < 1) return; 

    try {
      await updateCart(userId || "guest", productId, newAmount);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product_id === productId ? { ...item, amount: newAmount } : item
        )
      );
    } catch (error) {
      console.error(" Failed to update item amount:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Varukorg
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Din varukorg är tom.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item.product_id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              }>
                <ListItemText
                  primary={` ${item.name} - ${item.price} kr`}
                  secondary={
                    <>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={item.amount}
                        onChange={(e) => handleAmountChange(item.product_id, parseInt(e.target.value))}
                        sx={{ width: "80px", mr: 1 }}
                      />
                      Totalt: {item.price * item.amount} kr
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">
            Totalt pris: {totalPrice} kr
          </Typography>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        startIcon={<ChevronLeftIcon />}
        sx={{ mt: 3, backgroundColor: 'primary', '&:hover': { backgroundColor: 'primary' } }}
        onClick={() => navigate('/')}
      >
        Startsida
      </Button>
    </Container>
  );
}

export default CartView;
