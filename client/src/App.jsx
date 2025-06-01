import Landing from "./pages/Landing";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal,cyan,grey } from "@mui/material/colors";
import { Route,Routes, BrowserRouter as Router } from "react-router-dom";

import NavBar from "./components/NavBar";
import Adopt from "./pages/Adopt";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import Products from "./pages/Products";
import About from "./pages/About"


const theme = createTheme({
  palette: {
    primary: {
      light: teal[300],  
      main: teal[500],   
      dark: teal[700],   
      contrastText: '#fff',
    },
    secondary: {
      light: cyan[400],
      main: grey[400],
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/"  element={<Landing/>}/>
         {/**<Route path="/contact"  element={<ContactPage/>}/> */} 
          <Route path="/adopt"  element={<Adopt/>}/>
          <Route path="/services"  element={<Services/>}/>
          <Route path="/products"  element={<Products/>}/>
          <Route path="/about"  element={<About/>}/>
        </Routes>
        <Footer/>
      </Router>
    
    </ThemeProvider>
  );
}

export default App