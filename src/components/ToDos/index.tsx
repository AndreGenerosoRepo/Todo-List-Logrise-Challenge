import Header from "./Header";
import Contents from "./Contents";

import "./index.scss";
import { useToDos } from "../../hooks/ToDos";

const ToDos = () => {
  const { clearCompleteTodos } = useToDos();

  return (
    <div className="container-todos">
      <Header />
      <Contents />

      <button type="button" className="cleaner" onClick={clearCompleteTodos}>
        Limpar tarefas completas
      </button>
    </div>
  );
};

export default ToDos;
