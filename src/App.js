import { useState } from "react";
import Todo from "./components/Todo";

function App() {
  const [activeTask, setActiveTask] = useState({});
  return (
    <>
      <h1>{activeTask.title}</h1>
      <div className="App">
        <Todo setActiveTask={setActiveTask} />
      </div>
    </>
  );
}

export default App;
