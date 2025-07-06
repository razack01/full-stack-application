
import Login from './pages/Login'
 import '../src/App.css'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route,useLocation,Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './pages/PrivateRoute';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import ProductListing from './containers/ProductListing';
import ProductDetails from './containers/ProductDetails';
import BuyProduct from './containers/BuyProduct';

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute><EditProfile/></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductListing /></PrivateRoute>} />
        <Route path="/product/:productId" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
        <Route path="/buy-product" element={<PrivateRoute><BuyProduct /></PrivateRoute>} />
      </Routes>
     </>
  );
}
export default App;

