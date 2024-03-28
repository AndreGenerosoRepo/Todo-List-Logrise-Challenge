import { useToDos } from "../../../hooks/ToDos";
import Content from "./Content";

const Contents = () => {
  const { todos } = useToDos();

  return (
    <div className="contents">
      {todos.map((todo) => (
        <Content key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Contents;
