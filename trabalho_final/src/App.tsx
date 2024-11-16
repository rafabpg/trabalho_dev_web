import { QueryClientProvider } from "react-query";
import AppRoutes from "./routes/routes";
import { queryClient } from "./services/queryCliente";
import { AuthContext, AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
