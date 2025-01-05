import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Movie } from "../shared/CatalogInterface";
import useGetData from "../hooks/useGetData";
import { AxiosHttpClientAdapter } from "../services/axiosAdapter";
import { ClipLoader } from "react-spinners";
import useDeleteData from "../hooks/useDeleteData";
import useUpdateData from "../hooks/usePutData";
import FormField from "../components/Atoms/FormField";
import { MovieSchema, MovieSchemaType } from "../schemas/movieSchema";
import Chip from "../components/Atoms/CategoryChip";
import { CategoryInterface } from "../shared/CategoryInterface";
import { useCartContext } from "../context/CartContext";
import { useNotification } from "../hooks/useNotification";

const MediaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: `/catalog/movie/${id}`,
  });
  const { mutate: deleteData } = useDeleteData();
  const { mutateAsync: updateData } = useUpdateData();

  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MovieSchemaType>({
    resolver: zodResolver(MovieSchema),
    defaultValues: {
      title: "",
      description: "",
      year: new Date().getFullYear(),
      price: 0,
      imageUrl: "",
      characters: [],
      duration: 0,
      categoryIds: [],
    },
  });

  const { data: categoryData, isLoading: loadingCategory } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: "/category",
  });
  const handleDelete = async () => {
    deleteData({
      httpClient: new AxiosHttpClientAdapter(),
      url: `/catalog/movie/${id}`,
    });
    navigate("/");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    const movie = data?.data as Movie;
    console.log(movie);
    if (movie) {
      setValue("title", movie.title);
      setValue("description", movie.description);
      setValue("year", movie.year);
      setValue("price", movie.price);
      setValue("imageUrl", movie.imageUrl);
      setValue("characters", movie.characters);
      setValue("duration", movie.duration);
      setCharacters(movie.characters);
      setCategories(movie.categoryIds);
    }
  };

  const toggleCategory = (categoryId: string) => {
    let updatedCategories: string[];
    if (categories.includes(categoryId)) {
      updatedCategories = categories.filter((cat) => cat !== categoryId);
    } else {
      updatedCategories = [...categories, categoryId];
    }
    setCategories(updatedCategories);
    setValue("categoryIds", updatedCategories);
  };
  const addCharacter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.currentTarget.value;
      if (value && !characters.includes(value)) {
        setCharacters([...characters, value]);
        setValue("characters", [...characters, value]);
        event.currentTarget.value = "";
      }
    }
  };

  const onSubmit: SubmitHandler<MovieSchemaType> = async (formData) => {
    await updateData({
      httpClient: new AxiosHttpClientAdapter(),
      url: `/catalog/movie/${id}`,
      data: formData,
    });
    setIsEditing(false);
    navigate(`/media/${id}`);
  };
  const { showSuccess, showError } = useNotification();
  const { addToCart } = useCartContext();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  const movie = data?.data as Movie;

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto p-4"
        >
          <FormField
            label="Título"
            type="text"
            id="title"
            placeholder="Digite o título"
            register={register("title")}
            error={errors.title?.message}
          />
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="description"
              placeholder="Digite a descrição"
              {...register("description")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <FormField
            label="Ano"
            type="number"
            id="year"
            placeholder="Digite o ano"
            register={register("year", { valueAsNumber: true })}
            error={errors.year?.message}
          />
          <FormField
            label="Preço"
            type="string"
            id="price"
            placeholder="Digite o preço"
            register={register("price", { valueAsNumber: true })}
            error={errors.price?.message}
          />
          <FormField
            label="URL da Imagem"
            type="text"
            id="imageUrl"
            placeholder="Digite a URL da imagem"
            register={register("imageUrl")}
            error={errors.imageUrl?.message}
          />
          <div className="mb-4">
            <label
              htmlFor="characters"
              className="block text-sm font-medium text-gray-700"
            >
              Personagens
            </label>
            <input
              type="text"
              id="characters"
              placeholder="Digite os personagens e pressione Enter"
              onKeyDown={addCharacter}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.characters ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.characters && (
              <p className="mt-1 text-sm text-red-600">
                {errors.characters.message}
              </p>
            )}
            <ul>
              {characters.map((character, index) => (
                <li key={index} className="mt-1 text-sm text-gray-600">
                  {character}
                </li>
              ))}
            </ul>
          </div>
          <FormField
            label="Duração"
            type="number"
            id="duration"
            placeholder="Digite a duração"
            register={register("duration", { valueAsNumber: true })}
            error={errors.duration?.message}
          />
          <div className="mb-4">
            <label
              htmlFor="categoryIds"
              className="block text-sm font-medium text-gray-700"
            >
              Categorias
            </label>
            <div className="flex flex-wrap">
              {categoryData?.data?.content?.map(
                (category: CategoryInterface) => (
                  <Chip
                    key={category.id}
                    label={category.nome}
                    selected={categories.includes(category.id)}
                    onSelect={() => toggleCategory(category.id)}
                  />
                )
              )}
            </div>
            {errors.categoryIds && (
              <p className="mt-1 text-sm text-red-600">
                {errors.categoryIds.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Atualizar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="mt-4 ml-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
          <img
            className="w-full h-96 object-cover"
            src={movie.imageUrl}
            alt={movie.title}
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-4">{movie.description}</p>
            <p className="text-gray-700 mb-2">
              <strong>Personagens:</strong> {movie.characters.join(", ")}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Ano:</strong> {movie.year}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Duração:</strong> {movie.duration} minutos
            </p>
            <p className="text-gray-900 font-bold text-xl mb-4">
              Preço: R$ {movie.price.toFixed(2)}
            </p>
            {categoryData?.data?.content?.map((category: CategoryInterface) => (
              <button
                type="button"
                className={`px-3 py-1 border rounded-full m-1 pointer-events-none bg-blue-500 text-white font-bold`}
              >
                {category.nome}
              </button>
            ))}
          </div>
          <div className="p-6 border-t flex justify-between space-x-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                showSuccess("Produto adicionado ao carrinho com sucesso");
                addToCart({
                  id: movie.id,
                  title: movie.title,
                  description: movie.description,
                  imageUrl: movie.imageUrl,
                  price: movie.price,
                  mediaType: "MOVIE",
                  duration: movie.duration,
                  characters: movie.characters,
                  categoryIds: movie.categoryIds,
                  year: movie.year,
                  isAvailable: true
                });
              }}
            >
              Adicionar ao Carrinho
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEditClick}
            >
              Editar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaDetails;
