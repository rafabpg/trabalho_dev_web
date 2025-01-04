import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import Card from "../components/Atoms/Card";
import { Movie } from "../shared/CatalogInterface";
import { useCartContext } from "../context/CartContext";

const FilmList = () => {
  const fetchFilms = async ({ pageParam = 0 }) => {
    const response = await fetch(`http://localhost:8080/catalog/movie?page=${pageParam}&size=2`);
    const data = await response.json();
    console.log(data)
    return {
      data: data.content,
      nextPage: data.pageable.pageNumber + 1,
      totalPages: data.totalPages,
    };
  };
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(['infiniteGetData'], fetchFilms, {
    getNextPageParam: (lastPage) => (lastPage.nextPage < lastPage.totalPages ? lastPage.nextPage : false),
  });

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
            {data?.pages.map((page) =>
              page.data.map((film: Movie) => <Card key={film.id} {...film} />)
            )}
          </div>
          <div className="flex justify-center my-4">
            {hasNextPage && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Carregando..." : "Carregar Mais"}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default FilmList;
