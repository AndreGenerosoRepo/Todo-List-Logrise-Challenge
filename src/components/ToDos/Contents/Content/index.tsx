import { FiTrash } from "react-icons/fi";

import { ITodo, useToDos } from "../../../../hooks/ToDos";

interface IContentProps {
  todo: ITodo;
}

const Content = ({ todo }: IContentProps) => {
  const { changeTodoComplete, changeTodoText, removeTodo } = useToDos();

  return (
    <button key={todo.id} type="button" className="container">
      <input
        type="checkbox"
        defaultChecked={todo.isCompleted}
        onChange={(event) => changeTodoComplete(todo.id, event.target.checked)}
      />
      <input
        type="text"
        defaultValue={todo.text}
        onChange={(event) => changeTodoText(todo.id, event.target.value)}
        disabled={todo.isCompleted}
      />
      <FiTrash onClick={() => removeTodo(todo.id)} />
    </button>
  );
};

export default Content;
