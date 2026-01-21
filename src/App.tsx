import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import SignIn from "./routes/auth/SignIn";
import Help from "./routes/Help";

import HomeDirector from "./routes/director/HomeDirector";
import HomeOperator from "./routes/operator/HomeOperator";
import ProductOperator from "./routes/operator/ProductOperator";
import CategoryOperator from "./routes/operator/CategoryOperator";
import EsimCategory from "./routes/operator/EsimCategory";
import TransactionsOperator from "./routes/operator/TransactionsOperator";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route element={<ProtectedRoute />}>
          {/* operator */}
          <Route path="/operator/home" element={<HomeOperator />} />
          <Route path="/operator/product" element={<ProductOperator />} />
          <Route path="/operator/products" element={<CategoryOperator />} />
          <Route path="/operator/esim" element={<EsimCategory />} />
          <Route path="/operator/transactions" element={<TransactionsOperator />} />
          
          {/* director */}
          <Route path="/director/home" element={<HomeDirector />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
