import "./App.css";
import { Routes, Route } from "react-router-dom";

import SignIn from "./routes/auth/SignIn";
import HomeDirector from "./routes/director/HomeDirector";
import HomeOperator from "./routes/operator/HomeOperator";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import ProductOperator from "./routes/operator/ProductOperator";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Sign-in stays accessible always */}
        <Route path="/" element={<SignIn />} />

        {/* Protected routes with Navbar */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/operator/home" element={<HomeOperator />} />
            <Route path="/operator/product" element={<ProductOperator />} />
            
            <Route path="/director/home" element={<HomeDirector />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
