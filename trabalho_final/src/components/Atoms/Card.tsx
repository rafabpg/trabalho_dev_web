import { useState } from "react";
import { Movie, Series } from "../../shared/CatalogInterface";
import { useNavigate } from "react-router-dom";

const Card = (media: Movie | Series) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/media/${media.id}`)
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={media.imageUrl} alt={media.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{media.title}</div>
          <p className="text-gray-700 text-base">{media.description}</p>
          <span className="text-gray-700 text-base">R$ {(media.price).toFixed(2)}</span>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={() => alert("Adicionar ao carrinho")}
          >
            Adicionar ao Carrinho
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={handleNavigate}
          >
            Mostrar Mais Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
