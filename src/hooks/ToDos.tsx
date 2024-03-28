import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { v4 as uuid } from "uuid";

export interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export type IFilter = "all" | "active" | "completed";

interface ToDosContextData {
  todos: ITodo[];
  missingTodos: number;
  filter: IFilter;
  changeFilter: (filter: IFilter) => void;
  addTodo: (createTodo: Pick<ITodo, "text" | "isCompleted">) => void;
  removeTodo: (todoId: string) => void;
  changeTodoComplete: (todoId: string, checked: boolean) => void;
  changeTodoText: (todoId: string, text: string) => void;
  clearCompleteTodos: () => void;
}

interface IToDosProviderProps {
  children: React.ReactNode;
}

const ToDosContext = createContext<ToDosContextData>({} as ToDosContextData);

const ToDosProvider = ({ children }: IToDosProviderProps) => {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const storageTodos = localStorage.getItem("Todos");

    if (storageTodos) {
      return JSON.parse(storageTodos) as unknown[] as ITodo[];
    }

    return [
      {
        id: uuid(),
        text: "Estado da terefa completa",
        isCompleted: true,
      },
      {
        id: uuid(),
        text: "Levar o lixo",
        isCompleted: false,
      },
      {
        id: uuid(),
        text: "Ir passear o cão",
        isCompleted: false,
      },
    ];
  });
  const [filter, setFilter] = useState<IFilter>("all");

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const todosFiltered = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => todo.isCompleted === false);
      case "completed":
        return todos.filter((todo) => todo.isCompleted === true);
      default:
        return todos;
    }
  }, [filter, todos]);

  const missingTodos = useMemo(() => {
    return todosFiltered.filter((todos) => todos.isCompleted === false).length;
  }, [todosFiltered]);

  const changeFilter = useCallback((filter: IFilter) => {
    setFilter(filter);
  }, []);

  const addTodo = useCallback(
    (createTodo: Pick<ITodo, "text" | "isCompleted">) => {
      const todo: ITodo = {
        id: uuid(),
        // text: createTodo.text,
        // isCompleted: createTodo.isCompleted
        ...createTodo,
      };

      setTodos((state) => [...state, todo]);
    },
    []
  );

  const removeTodo = useCallback((todoId: string) => {
    setTodos((state) => state.filter((todo) => todo.id !== todoId));
  }, []);

  const changeTodoComplete = useCallback((todoId: string, checked: boolean) => {
    setTodos((state) =>
      state.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: checked } : todo
      )
    );
  }, []);

  const changeTodoText = useCallback((todoId: string, text: string) => {
    setTodos((state) =>
      state.map((todo) =>
        todo.id === todoId && todo.isCompleted === false
          ? { ...todo, text }
          : todo
      )
    );
  }, []);

  const clearCompleteTodos = useCallback(() => {
    setTodos((state) => state.filter((todo) => todo.isCompleted === false));
  }, []);

  return (
    <ToDosContext.Provider
      value={{
        todos: todosFiltered,
        missingTodos,
        filter,
        changeFilter,
        addTodo,
        removeTodo,
        changeTodoComplete,
        changeTodoText,
        clearCompleteTodos,
      }}
    >
      {children}
    </ToDosContext.Provider>
  );
};

function useToDos(): ToDosContextData {
  const context = useContext(ToDosContext);

  if (!context) {
    throw new Error("useToDos must be used within an ToDosProvider");
  }

  return context;
}

export { ToDosProvider, useToDos };
