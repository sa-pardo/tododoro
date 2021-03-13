import { useState } from "react";
import Pomodoro from "./components/Pomodoro";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [activeTask, setActiveTask] = useState({});
  const [tasks, setTasks] = useState(testTasks);

  const addTask = (event) => {
    event.preventDefault();
    let taskInput = event.target[0].value;
    if (taskInput.length === 0) return;
    event.target[0].value = "";
    let task = {
      id: uuidv4(),
      title: taskInput,
      isCompleted: false,
      isNew: true,
    };
    setTasks([task, ...tasks]);
  };

  const removeTask = (id) => {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const toggleCompletedTask = (selectedTask) => {
    selectedTask.isCompleted = !selectedTask.isCompleted;
    selectedTask.isNew = false;
    setTasks(
      tasks.map((task) => {
        return task.id === selectedTask.id ? selectedTask : task;
      })
    );
  };

  return (
    <>
      <div className="App">
        <div className="left">
          <Pomodoro
            activeTask={activeTask}
            toggleCompletedTask={toggleCompletedTask}
          />
        </div>
        <div className="right">
          <Todo
            setActiveTask={setActiveTask}
            tasks={tasks}
            modifyTask={{
              addTask: addTask,
              removeTask: removeTask,
              toggleCompletedTask: toggleCompletedTask,
            }}
          />
        </div>
      </div>
      <span className="credits left-credits no-select">Designed by</span>
      <span className="credits right-credits no-select">Sebastian Pardo</span>
    </>
  );
}

export default App;

const testTasks = [
  {
    id: uuidv4(),
    title: "Hacer presentacion de Minecraft",
    isCompleted: false,
    isNew: true,
  },
  {
    id: uuidv4(),
    title: "Descripcion de tarea importante",
    isCompleted: true,
    isNew: false,
  },
  {
    id: uuidv4(),
    title: "Tarea facil de hacer sin ninguna importancia",
    isCompleted: true,
    isNew: false,
  },
];
