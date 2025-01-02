import React from "react";
import { useParams } from "react-router-dom";
import { Movie, Series } from "../shared/CatalogInterface";
import useGetData from "../hooks/useGetData";
import { AxiosHttpClientAdapter } from "../services/axiosAdapter";
import { ClipLoader } from "react-spinners";

const MediaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: `/catalog/media/${id}`,
  });

  const handleDelete = async () => {};
  const handleAddCart = async () => {};
  const handleEdit = async () => {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  const media = data?.data as Movie | Series;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto rounded overflow-hidden shadow-lg">
        <img className="w-full" src={media.imageUrl} alt={media.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-2">{media.title}</div>
          <p className="text-gray-700 text-base">{media.description}</p>
          <p className="text-gray-700 text-base">
            Personagens: {media.characters.join(", ")}
          </p>
          <p className="text-gray-700 text-base">
            Preço: R$ {media.price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleAddCart}
        >
          Adicionar ao Carrinho
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleEdit}
        >
          Editar
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleDelete}
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default MediaDetails;
