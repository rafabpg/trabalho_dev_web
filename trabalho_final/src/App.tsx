import { QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/routes";
import { queryClient } from "./services/queryCliente";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
