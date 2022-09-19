import Addtodo from "./components/Addtodo";
import GetTodo from "./components/GetTodo";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <Title />
      <Addtodo />
      <GetTodo/>
    </div>
  );
}

export default App;
