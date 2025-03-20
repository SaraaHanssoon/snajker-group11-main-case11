import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardHeader, CardContent, Typography } from "@mui/material";

function ProductItemSmall({ product }) {
  const getImageUrl = (imageUrl) => {
    const url = `http://localhost:3000/${imageUrl}`;
    console.log(` Försöker ladda bild: ${url}`);  
    return url;
  };

  return (
    <Card variant='outlined' sx={{
      height: "450px",
      backgroundColor: '#fff8e1',
      border: '2px solid #bcbbb7'
    }}>
      <CardHeader
        title={
          <Typography variant='h5' component='div'>
            <Link to={`/products/${product.product_id}`} style={{ textDecoration: 'none', color: '#795548' }}>
              {product.name} 
            </Link>
          </Typography>
        }
        sx={{ paddingBottom: 0 }}
      />
      <CardContent sx={{ paddingTop: '8px' }}>
        <CardMedia
          component="img"
          image={getImageUrl(product.imageUrl)}
          alt={`Image of ${product.name}`}
          sx={{ borderRadius: 2, objectFit: 'cover', width: "100%", height: "200px" }}
        />
        <Typography variant='body1' sx={{ mt: 2, color: '#4e342e' }}>
          {product.description}
        </Typography>
        <Typography variant='subtitle1' sx={{ color: '#1b5e20' }}>
          {product.price} kr
        </Typography>
      </CardContent>
    </Card>
  );
}

ProductItemSmall.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired
};

export default ProductItemSmall;
