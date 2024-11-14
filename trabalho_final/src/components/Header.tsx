import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logotipo from "../assets/images/logotipo.png";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-xl font-bold">
          <img src={Logotipo} alt="" className="w-12 h-12" />
        </Link>

        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/filmes" className="hover:text-gray-300">
            Lista de Filmes
          </Link>
          <Link to="/series" className="hover:text-gray-300">
            Lista de Séries
          </Link>
          <Link to="/criar-midia" className="hover:text-gray-300">
            Criar uma Mídia
          </Link>
        </nav>

        <div className="flex space-x-4 items-center">
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
          <Link
            to="/carrinho"
            className="flex items-center hover:text-gray-300"
          >
            <FaShoppingCart size={20} className="mr-1" />
            Carrinho
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
