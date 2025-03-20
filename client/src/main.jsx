import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './views/Home';
import ProductEdit from './views/ProductEdit.jsx';
import Product from './views/Products.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import CartView from './views/CartView'; 
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/product/new',
        element: <ProductEdit />
      },
      {
        path: '/product/:id/edit',
        element: <ProductEdit />
      },
      {
        path: '/product/',
        element: <Product />
      },
      {
        path: '/product/:id',
        element: <ProductDetail />
      },
      {
        path: '/products/:id', 
        element: <ProductDetail />
      },
      {
        path: '/users/:id/product',
        element: <Product />
      },
      {
        path: '/cart',
        element: <CartView /> 
    },    
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);