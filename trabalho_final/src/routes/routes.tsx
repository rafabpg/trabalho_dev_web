import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutTemplate from "../layout/LayoutTemplate";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useAuthContext } from "../hooks/useAuthContext";
import NotFoundPage from "../pages/NotFoundPage";
import CreateMedia from "../pages/CreateMedia";
import FilmList from "../pages/FilmList";
import SeriesList from "../pages/SeriesList";
import MediaDetails from "../pages/MediaDetails";
import PrivateRoute from "./PrivateRoutes";
import CartPage from "../pages/CartPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutTemplate />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/" element={<FilmList />} />
          <Route path="/series" element={<SeriesList />} />
          <Route path="/media/:id" element={<MediaDetails />} />
          <Route element={<PrivateRoute />}>
            <Route path="/criar-media" element={<CreateMedia />} />
            <Route path="/carrinho" element={<CartPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
