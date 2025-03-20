import { Link, Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  createTheme,
  ThemeProvider,
  Typography
} from "@mui/material";
import { useState, useEffect } from "react";

const theme = createTheme({
  palette: {
    background: {
      default: "#028391",
    },
    primary: {
      main: "#01204E",
    },
    secondary: {
      main: "#FFB6C1",
    },
    text: {
      primary: "#2C3E50",
    },
  },
  typography: {
    fontFamily: "fantasy",
    fontSize: 18, 
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#028391",
          padding: "15px 20px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "18px",
          padding: "14px 28px",
          borderRadius: "8px",
          boxShadow: "3px 3px 10px rgba(0,0,0,0.1)", 
          color: "white", 
        },
      },
    },
  },
});

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
        <AppBar position="static" sx={{ boxShadow: "none", padding: "15px 20px" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img 
              src="/images/logo.jpeg" 
              alt="Logo" 
              style={{ 
                width: "250px", 
                borderRadius: "20px", 
                boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)", 
                backgroundColor: "white", 
                padding: "10px" 
              }} 
            />

            <Box 
              sx={{ 
                display: "flex", 
                gap: 3, 
                alignItems: "center", 
                justifyContent: "flex-end",
                marginBottom: "200px", 
                paddingRight: "2px" 
              }}
            >
              <Button variant="contained" color="primary" sx={{ minWidth: "200px" }}>
                <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
                  Varukorg
                </Link>
              </Button>

              {user ? (
                <>
                  <Typography variant="body1" sx={{ fontWeight: "bold", color: "#4A4A4A" }}>
                    {user.displayName}
                  </Typography>
                  <Button 
                    onClick={handleLogout} 
                    variant="contained" 
                    color="primary" 
                    sx={{ minWidth: "200px" }}
                  >
                    Logga ut
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={handleGoogleLogin} 
                  variant="contained" 
                  color="primary" 
                  sx={{ minWidth: "200px" }}
                >
                  Logga in med Google
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 6 }} maxWidth="xl" component="main">
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
