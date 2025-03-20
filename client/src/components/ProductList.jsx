import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import productService from "../services/ProductService"; 

import ProductItemSmall from './ProductItemSmall'; 


function ProductList({ pathname }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productService.getAll(); 
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Produkter kunde inte laddas.");
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Ett fel uppstod vid hämtning av produkter.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <Typography variant="h6">Laddar produkter...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: "2rem", backgroundColor: "#efebe9" }}>
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`product_${product.product_id}`}>
              <ProductItemSmall product={product} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Inga produkter hittades.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

ProductList.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default ProductList;
