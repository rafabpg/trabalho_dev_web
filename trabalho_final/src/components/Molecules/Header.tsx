import { FaShoppingCart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import Logotipo from "../../assets/images/logotipo.png";
import NavLinkItem from "../Atoms/NavLinkItem";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCartContext } from "../../context/CartContext";

const Header = () => {
  const { isAuthenticated, handleLogout } = useAuthContext();
  const { getTotal, cart } = useCartContext();
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-xl font-bold ">
          <img src={Logotipo} alt="" className="w-12 h-12" />
        </Link>

        <nav className="flex space-x-6">
          <NavLinkItem link="/" children="Lista de Filmes" />
          <NavLinkItem link="/series" children="Lista de Séries" />
          <NavLinkItem link="/criar-media" children="Adicionar uma Mídia" />
        </nav>

        <div className="flex space-x-4 items-center">
          {localStorage.getItem("token") ? (
            <>
              <button
                className="flex items-center hover:text-gray-300"
                onClick={handleLogout}
              >
                <CiLogout size={20} className="mr-1" />
                Logout
              </button>
              <Link
                to="/carrinho"
                className="flex items-center hover:text-gray-300 flex-col"
              >
                <span className="flex">
                  <FaShoppingCart size={20} className="mr-1" />
                  Carrinho
                </span>
                {cart.length > 0 && (
                  <span className="ml-2 text-white">
                    R$ {getTotal().toFixed(2)}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <NavLinkItem link="/login" children="Login" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
