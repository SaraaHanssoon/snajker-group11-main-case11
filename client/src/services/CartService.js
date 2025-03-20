import axios from './api';

const API_URL = "http://localhost:3000/carts";

export async function getCart(userId) {
  try {
    if (userId === "guest") {
      console.log(" Hämtar varukorg för gäst från localStorage.");
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      return { CartItems: guestCart };
    }

    const response = await axios.get(`${API_URL}/${userId}`);
    return { CartItems: response.data.CartItems };
  } catch (error) {
    console.error(" Failed to fetch cart:", error.response?.data || error.message);
    throw error;
  }
}

export const addToCart = async (fk_userid, fk_productid, quantity, productName, price) => {
  try {
    if (fk_userid === "guest") {
      let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      let existingItem = guestCart.find(item => item.product_id === fk_productid);

      if (existingItem) {
        existingItem.amount += quantity;
      } else {
        guestCart.push({ product_id: fk_productid, amount: quantity, name: productName, price });
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      return guestCart;
    }

    const requestData = { fk_userid, fk_productid, quantity, name: productName, price };
    const response = await axios.post(`${API_URL}/add`, requestData);
    return response.data;
  } catch (error) {
    console.error(" API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateCart = async (fk_userid, fk_productid, newAmount) => {
  try {
    if (fk_userid === "guest") {
      let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      let updatedCart = guestCart.map(item =>
        item.product_id === fk_productid ? { ...item, amount: newAmount } : item
      );

      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      return updatedCart;
    }

    const requestData = { fk_userid, fk_productid, newAmount };
    await axios.put(`${API_URL}/update`, requestData);
  } catch (error) {
    console.error(" Failed to update cart:", error.response?.data || error.message);
    throw error;
  }
};

export const removeFromCart = async (fk_userid, fk_productid) => {
  try {
    if (fk_userid === "guest") {
      console.log(` Tar bort produkt med ID ${fk_productid} från gästvarukorgen`);

      let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      guestCart = guestCart.filter(item => item.product_id !== fk_productid);
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      return guestCart;
    }

    console.log(` Skickar DELETE request till backend för produkt ID: ${fk_productid}`);
    await axios.delete(`${API_URL}/remove/${fk_productid}`, { data: { fk_userid } });

  } catch (error) {
    console.error(" Failed to remove item from cart:", error.response?.data || error.message);
    throw error;
  }
};
