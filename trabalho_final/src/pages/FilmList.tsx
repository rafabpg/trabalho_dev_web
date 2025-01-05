import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import Card from "../components/Atoms/Card";
import { Movie } from "../shared/CatalogInterface";
import InfiniteScroll from "react-infinite-scroll-component";
import Categories from "../components/Atoms/Categories";
import { useParams } from "react-router-dom";

const fetchFilms = async ({ pageParam = 0, queryKey }) => {
  const [_, categoryId] = queryKey;
  const url = categoryId
    ? `http://localhost:8080/category/${categoryId}?page=${pageParam}&size=2`
    : `http://localhost:8080/catalog/movie?page=${pageParam}&size=2`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return {
    data: data.content,
    nextPage: data.pageable.pageNumber + 1,
    totalPages: data.totalPages,
  };
};


const primeiraLetraMaiuscula = (palavra: string) => {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1);
};

const FilmList = () => {
  const { nomeCategoria } = useParams();
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: nomeCategoria || "",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery(
    ["infiniteGetData", selectedCategory.id],
    fetchFilms,
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextPage < lastPage.totalPages ? lastPage.nextPage : null,
    }
  );

  const handleSelectCategory = (id, name) => {
    setSelectedCategory({ id, name });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Erro: {error.message}</div>
    );
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <Categories onSelectCategory={handleSelectCategory} />
      </div>
      <div className="w-3/4">
        <div className="text-center my-4">
          <h1 className="text-2xl font-bold mb-4">
            {selectedCategory.name
              ? `Filmes na Categoria: ${primeiraLetraMaiuscula(selectedCategory.name)}`
              : "Lista de Filmes"}
          </h1>
        </div>
        <InfiniteScroll
          style={{ height: "100vh", overflow: "auto" }}
          dataLength={
            data
              ? data.pages.reduce((total, page) => total + page.data.length, 0)
              : 0
          }
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="flex justify-center items-center my-4">
              <ClipLoader size={50} color={"#123abc"} loading={true} />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Não há mais Filmes</b>
            </p>
          }
        >
          <div className="flex flex-wrap justify-center">
            {data?.pages.map((page) =>
              page.data.map((film: Movie) => (
                <Card key={film.id} {...film} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default FilmList;
