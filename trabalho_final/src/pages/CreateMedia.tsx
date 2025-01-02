import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MediaSchema, MediaSchemaType } from "../schemas/criarMidiaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../components/Atoms/FormField";
import Chip from "../components/Atoms/CategoryChip";
import useGetData from "../hooks/useGetData";
import { AxiosHttpClientAdapter } from "../services/axiosAdapter";
import usePostData from "../hooks/usePostData";

import { CategoryInterface } from "../shared/CategoryInterface";
import { useNotification } from "../hooks/useNotification";

const CreateMedia = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { showSuccess, showError } = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<MediaSchemaType>({
    resolver: zodResolver(MediaSchema),
    mode: "onChange",
    defaultValues: {
      mediaType: "MOVIE",
      isAvailable: true,
    },
  });

  const { data, isLoading } = useGetData({
    httpClient: new AxiosHttpClientAdapter(),
    url: "/category",
  });
  const { mutateAsync } = usePostData();

  const mediaType = watch("mediaType");

  useEffect(() => {
    if (mediaType === "MOVIE") {
      setValue("seasons", undefined);
    } else if (mediaType === "SERIES") {
      setValue("duration", undefined);
    }
  }, [mediaType, setValue]);

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

  const removeUnnecessaryFields = (data: any) => {
    if (data.mediaType === "MOVIE") {
      delete data.seasons;
    } else if (data.mediaType === "SERIES") {
      delete data.duration;
    }
    return data;
  };

  const onSubmit: SubmitHandler<MediaSchemaType> = async (data) => {
    try {
      removeUnnecessaryFields(data);
      const urlString =
        mediaType === "MOVIE" ? "/catalog/movie" : "/catalog/series";
      await mutateAsync({
        httpClient: new AxiosHttpClientAdapter(),
        data,
        url: urlString,
      });
      showSuccess("Mídia adicionada com sucesso.");
      reset();
      setCharacters([]);
      setCategories([]);
    } catch (error) {
      showError("Erro ao adicionar mídia.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
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
          htmlFor="mediaType"
          className="block text-sm font-medium text-gray-700"
        >
          Tipo de Mídia
        </label>
        <select
          id="mediaType"
          {...register("mediaType")}
          defaultValue="MOVIE"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.mediaType ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="MOVIE">Filme</option>
          <option value="SERIES">Série</option>
        </select>
        {errors.mediaType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.mediaType.message}
          </p>
        )}
      </div>
      {!isLoading && data?.data?.content && (
        <div className="mb-4">
          <label
            htmlFor="categoryIds"
            className="block text-sm font-medium text-gray-700"
          >
            Categorias
          </label>
          <div className="flex flex-wrap">
            {data.data.content.map((category: CategoryInterface) => (
              <Chip
                key={category.id}
                label={category.nome}
                selected={categories.includes(category.id)}
                onSelect={() => toggleCategory(category.id)}
              />
            ))}
          </div>
          {errors.categoryIds && (
            <p className="mt-1 text-sm text-red-600">
              {errors.categoryIds.message}
            </p>
          )}
        </div>
      )}
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
      {mediaType === "MOVIE" && (
        <FormField
          label="Duração"
          type="number"
          id="duration"
          placeholder="Digite a duração"
          register={register("duration", { valueAsNumber: true })}
          error={errors.duration?.message}
        />
      )}
      {mediaType === "SERIES" && (
        <FormField
          label="Temporadas"
          type="number"
          id="seasons"
          placeholder="Digite o número de temporadas"
          register={register("seasons", { valueAsNumber: true })}
          error={errors.seasons?.message}
        />
      )}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Adicionar
      </button>
    </form>
  );
};

export default CreateMedia;
