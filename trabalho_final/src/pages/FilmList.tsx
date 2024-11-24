import React, { useState } from "react";
import useGetData from "../hooks/useGetData";
import { AxiosHttpClientAdapter } from "../services/axiosAdapter";
import Card from "../components/Atoms/Card";
import { ClipLoader } from "react-spinners";
import { Movie } from "../shared/CatalogInterface";

const FilmList = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: "/catalog/movie",
    page,
    size: 2,
  });

  const totalPages = data ? data.data.totalPages : 1;

  return (
    <>
      <div className="text-center my-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Filmes</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center">
            {data!.data.content.map((film: Movie) => (
              <Card key={film.id} {...film} />
            ))}
          </div>
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
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={page === totalPages - 1}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default FilmList;
