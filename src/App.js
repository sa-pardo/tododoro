import { useState } from "react";
import Pomodoro from "./components/Pomodoro";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [activeTask, setActiveTask] = useState({});
  const [tasks, setTasks] = useState([]);

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
    if (activeTask.id === id) {
      setActiveTask({});
    }
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
      <div className="background"></div>
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
    </>
  );
}

export default App;
