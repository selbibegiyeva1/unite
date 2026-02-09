import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

import SignIn from "./routes/auth/SignIn";
const Help = lazy(() => import("./routes/Help"));

const HomeDirector = lazy(() => import("./routes/director/HomeDirector"));
const HomeOperator = lazy(() => import("./routes/operator/HomeOperator"));
const ProductOperator = lazy(() => import("./routes/operator/ProductOperator"));
const CategoryOperator = lazy(() => import("./routes/operator/CategoryOperator"));
const EsimCategory = lazy(() => import("./routes/operator/EsimCategory"));
const TransactionsOperator = lazy(() => import("./routes/operator/TransactionsOperator"));

const TransactionsDirector = lazy(() => import("./routes/director/TransactionsDirector"));
const TransactionsDirectorTopup = lazy(() => import("./routes/director/transactions/Topup"));
const TransactionsDirectorPurchase = lazy(() => import("./routes/director/transactions/Purchase"));
const ReportsDirector = lazy(() => import("./routes/director/ReportsDirector"));
const ReportsDirectorHistory = lazy(() => import("./routes/director/reports/History"));
const ReportsDirectorRewards = lazy(() => import("./routes/director/reports/Rewards"));

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
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
              <Route path="/director/transactions" element={<TransactionsDirector />}>
                <Route index element={<Navigate to="topup" replace />} />
                <Route path="topup" element={<TransactionsDirectorTopup />} />
                <Route path="purchase" element={<TransactionsDirectorPurchase />} />
              </Route>
              <Route path="/director/payouts" element={<ReportsDirector />}>
                <Route index element={<Navigate to="history" replace />} />
                <Route path="history" element={<ReportsDirectorHistory />} />
                <Route path="rewards" element={<ReportsDirectorRewards />} />
              </Route>
              <Route path="/help" element={<Help />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
