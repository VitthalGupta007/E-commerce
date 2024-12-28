import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Register from './Pages/Registration/Register';
import ProtectedPage from './Components/ProtectedPage';
import Loader from './Components/Loader';
import { useSelector } from 'react-redux';
import Admin from './Pages/Admin/Admin';
import ProductInfo from './Pages/ProductInfo/ProductInfo';
import AboutUs from './Pages/About/AboutUs';

function App() {
  const { isLoading } = useSelector((state) => state.loaders);
  return (
    <div>
      {isLoading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedPage>
                <AboutUs />
              </ProtectedPage>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedPage>
                <ProductInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
