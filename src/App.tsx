import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import SignIn from "./routes/auth/SignIn";
import HomeDirector from "./routes/director/HomeDirector";
import HomeOperator from "./routes/operator/HomeOperator";

import ProductOperator from "./routes/operator/ProductOperator";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route element={<ProtectedRoute />}>
          {/* operator */}
          <Route path="/operator/home" element={<HomeOperator />} />
          <Route path="/operator/product" element={<ProductOperator />} />

          {/* director */}
          <Route path="/director/home" element={<HomeDirector />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
