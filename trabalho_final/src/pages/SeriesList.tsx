import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Spinner from "../components/Atoms/Spinner";
import PesquisaSeries from "../components/Atoms/PesquisaSeries";
import { AxiosHttpClientAdapter } from "../services/axiosAdapter";
import useGetData from "../hooks/useGetData";
import { useSeriesStore } from "../context/SeriesStore";
import useDeleteData from "../hooks/useDeleteData";
import SortOrder from "../assets/icons/sort-order-16.png";
import SortOrderUp from "../assets/icons/sort-order-up-16.png";
import SortOrderDown from "../assets/icons/sort-order-down-16.png";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SeriesList = () => {
  const {
    pagina,
    tamanho,
    filteredSeries,
    setPagina,
    setSeries,
    setSort,
    sortField,
    sortOrder,
    deletingId,
    setDeletingId,
  } = useSeriesStore();

  const { data, isLoading } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: "/catalog/series",
  });
  const { mutate: deleteData } = useDeleteData();

  useEffect(() => {
    if (data) {
      setSeries(data.data.content);
    }
  }, [data, setSeries]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await sleep(2000);
    deleteData({
      httpClient: new AxiosHttpClientAdapter(),
      url: `/catalog/series/${id}`,

    });
  };

  const startIndex = pagina * tamanho;
  const paginatedSeries = filteredSeries.slice(
    startIndex,
    startIndex + tamanho
  );

  const totalPages = Math.max(1, Math.ceil(filteredSeries.length / tamanho)); 
  const getSortIcon = (field: string) => {
    if (sortField !== field) return SortOrder;
    return sortOrder === "asc" ? SortOrderUp : SortOrderDown;
  };

  return (
    <div className="p-4">
      <PesquisaSeries />

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Imagem</th>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={() => setSort("title")}
                >
                  <div className="flex items-center">
                    Título
                    <img src={getSortIcon("title")} alt="Ordenar" className="ml-2 w-4 h-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left">Descrição</th>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={() => setSort("year")}
                >
                  <div className="flex items-center">
                    Ano
                    <img src={getSortIcon("year")} alt="Ordenar" className="ml-2 w-4 h-4" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={() => setSort("price")}
                >
                  <div className="flex items-center">
                    Preço
                    <img src={getSortIcon("price")} alt="Ordenar" className="ml-2 w-4 h-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSeries.map((series) => (
                <tr key={series.id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b text-gray-700">{series.id}</td>
                  <td className="py-3 px-4 border-b">
                    <img
                      src={series.imageUrl}
                      alt={series.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-4 border-b text-gray-700">{series.title}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{series.description}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{series.year}</td>
                  <td className="py-3 px-4 border-b text-gray-700">
                    {series.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleDelete(series.id)}
                      className="bg-red-500 flex hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
              <tr className="bg-gray-100">
                <td colSpan={5} className="py-3 px-4 text-center font-semibold">
                  Total
                </td>
                <td colSpan={2} className="py-3 px-4 text-right font-semibold">
                  {filteredSeries
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

      {filteredSeries.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setPagina(Math.max(pagina - 1, 0))}
            disabled={pagina === 0}
          >
            Anterior
          </button>
          <span className="text-gray-600 font-medium">
            Página {pagina + 1} de {totalPages}
          </span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setPagina(Math.min(pagina + 1, totalPages - 1))}
            disabled={pagina === totalPages - 1}
          >
            Próxima
          </button>
        </div>
      )}
      {filteredSeries.length === 0 && (
        <div className="mt-4 text-center text-gray-600">Nenhuma série disponível</div>
      )}
    </div>
  );
};

export default SeriesList;
