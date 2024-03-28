import { IFilter, useToDos } from "../../../hooks/ToDos";

const Header = () => {
  const { missingTodos, filter, changeFilter } = useToDos();

  return (
    <div className="header">
      <h6>{missingTodos} tarefas em falta</h6>

      <div>
        <label>Filtrar por</label>
        <select
          name="filters"
          defaultValue={filter}
          onChange={(event) => changeFilter(event.target.value as IFilter)}
        >
          <option value="all">Todas</option>
          <option value="active">Ativo</option>
          <option value="completed">Completas</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
