import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logotipo from "../../assets/images/logotipo.png";
import NavLinkItem from "../Atoms/NavLinkItem";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-xl font-bold ">
          <img src={Logotipo} alt="" className="w-12 h-12" />
        </Link>

        <nav className="flex space-x-6">
          <NavLinkItem link="/" children="Home"/>
          <NavLinkItem link="/filmes" children="Lista de Filmes"/>
          <NavLinkItem link="/series" children="Lista de Séries"/>
          <NavLinkItem link="/criar-midia" children="Criar uma Mídia"/>
        </nav>

        <div className="flex space-x-4 items-center">
          <NavLinkItem link="/login" children="Login" />
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
