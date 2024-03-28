import { useCallback, useState } from "react";

import "./index.scss";
import { useToDos } from "../../hooks/ToDos";

const AddTodo = () => {
  const { addTodo } = useToDos();
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const text = input.trim();

      if (text.length > 0) {
        addTodo({
          text,
          isCompleted: checked,
        });
        setInput("");
        setChecked(false);
      }
    },
    [addTodo, checked, input]
  );

  return (
    <form onSubmit={handleSubmit} className="container-add">
      <h6>Criar uma nova tarefa</h6>

      <button type="button" className="container add">
        <input
          type="checkbox"
          id="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
        <input
          type="text"
          placeholder="Escreva tarefa..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </button>

      {/* <button type="submit" /> */}
    </form>
  );
};

export default AddTodo;
