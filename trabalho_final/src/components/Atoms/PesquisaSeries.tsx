import { FormEvent, useRef } from "react";
import { useSeriesStore } from "../../context/SeriesStore";

const PesquisaSeries = () => {
  const setNome = useSeriesStore((s) => s.setNome);
  const setPagina = useSeriesStore((s) => s.setPagina);

  const tratarNome = (nome: string) => {
    setNome(nome);
    setPagina(0);
  };

  const nomeRef = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    tratarNome(nomeRef.current!.value);
  };

  return (
    <form className="flex mb-4" onSubmit={submit}>
      <input
        ref={nomeRef}
        type="text"
        className="flex-grow border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:border-blue-500"
        placeholder="Pesquisar séries..."
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-lg"
      >
        Pesquisar
      </button>
    </form>
  );
};

export default PesquisaSeries;
