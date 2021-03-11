import { useState } from "react";
import Pomodoro from "./components/Pomodoro";
import Todo from "./components/Todo";

function App() {
  const [activeTask, setActiveTask] = useState({});
  return (
    <>
      <h1>{activeTask.title}</h1>
      <div className="App">
        <div className="left">
          <Pomodoro />
        </div>
        <div className="right">
          <Todo setActiveTask={setActiveTask} />
        </div>
      </div>
      <span className="credits left-credits">Designed by</span>
      <span className="credits right-credits">Sebastian Pardo</span>
    </>
  );
}

export default App;
