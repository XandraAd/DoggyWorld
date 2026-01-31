import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, cyan, grey } from "@mui/material/colors";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Client pages
import Landing from "./pages/Client/Landing";
import Adopt from "./pages/Client/Adopt";
import Services from "./pages/Client/Services";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
import ProductDetails from "./pages/Client/ProductDetails";
import Blog from "./pages/Client/Blog";
import BlogDetails from "./components/BlogDetails";

// Admin pages
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/ProductPage";
import AdminBlogs from "./pages/Admin/BlogPage";

// Route guard
import ProtectedRoute from "./components/ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: { light: teal[300], main: teal[500], dark: teal[700], contrastText: "#fff" },
    secondary: { light: cyan[400], main: grey[400], dark: "#ba000d", contrastText: "#000" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          {/* Public (Client) Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />

          {/* Admin Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
<Route
  path="/admin/products"
  element={
    <ProtectedRoute>
      <AdminProducts />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/blogs"
  element={
    <ProtectedRoute>
      <AdminBlogs />
    </ProtectedRoute>
  }
/>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
