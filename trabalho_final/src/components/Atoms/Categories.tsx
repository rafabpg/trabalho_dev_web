import React from "react";
import useGetData from "../../hooks/useGetData";
import { AxiosHttpClientAdapter } from "../../services/axiosAdapter";
import { CategoryInterface } from "../../shared/CategoryInterface";

const Categories = ({ onSelectCategory }) => {
  const { data, isLoading, error } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: "/category",
  });

  if (isLoading) {
    return <div>Carregando categorias...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar categorias</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categorias</h2>
      <ul>
        <li  className="mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => onSelectCategory("", "")}
          >
            Todos
          </button>
        </li>
        {data!.data.content.map((category: CategoryInterface) => (
          <li key={category.id} className="mb-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => onSelectCategory(category.id, category.nome)}
            >
              {category.nome}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
