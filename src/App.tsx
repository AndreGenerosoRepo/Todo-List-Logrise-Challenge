import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import ToDos from "./components/ToDos";

function App() {
  return (
    <div className="main">
      <div className="container-base">
        <div className="container">
          <Header />
          <AddTodo />
          <ToDos />
        </div>
      </div>

      <footer>
        <p>
          <span>Nota:</span> Drag and drop não está a funcionar :')
        </p>
      </footer>
    </div>
  );
}

export default App;
