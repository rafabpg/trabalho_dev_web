import { QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/routes";
import { queryClient } from "./services/queryCliente";
import {  AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
