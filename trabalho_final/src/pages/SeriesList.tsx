import React, { useState } from "react";
import { AxiosHttpClientAdapter } from "../services/axiosAdapter";
import useGetData from "../hooks/useGetData";
import { ClipLoader } from "react-spinners";
import useDeleteData from "../hooks/useDeleteData";
import Spinner from "../components/Atoms/Spinner";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const SeriesList = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data, isLoading } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: `/catalog/series?query=${query}`,
    page,
    size: 5,
  });
  const { mutate: deleteData } = useDeleteData();
  const totalPages = data ? data.data.totalPages : 1;
  const handleSearch = () => {
    setPage(0);
    setQuery(searchQuery);
  };
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await sleep(2000);
    deleteData({
      httpClient: new AxiosHttpClientAdapter(),
      url: `/catalog/series/${id}`,
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Pesquisar série"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Pesquisar
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Imagem</th>
                <th className="py-2 px-4 border-b">Título</th>
                <th className="py-2 px-4 border-b">Descrição</th>
                <th className="py-2 px-4 border-b">Ano</th>
                <th className="py-2 px-4 border-b">Preço</th>
                <th className="py-2 px-4 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data!.data.content.map((series) => (
                <tr key={series.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {series.id}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <img
                      src={series.imageUrl}
                      alt={series.title}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {series.title}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {series.description}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {series.year}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {series.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(series.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex justify-center items-center"
                    >
                      {deletingId === series.id ? (
                        <>
                          
                          <Spinner /> Deletar 
                        </>
                      ) : (
                        "Deletar"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={5}
                  className="py-2 px-4 border-b text-center font-bold"
                >
                  Total
                </td>
                <td
                  colSpan={2}
                  className="py-2 px-4 border-b text-center font-bold"
                >
                  {data!.data.content
                    .reduce((total, series) => total + series.price, 0)
                    .toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div className="flex justify-center items-center p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Anterior
        </button>
        <span className="text-gray-700 mx-2">
          Página {page + 1} de {totalPages}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default SeriesList;
