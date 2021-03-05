import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import circle from "../assets/circulo.svg";

function Todo(props) {
  const [tasks, setTasks] = useState(testTasks);
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="Todo">
      <h2 className="todo-header">To-Do</h2>

      <ul className="task-list">
        <li className="task">
          <form onSubmit={addTask}>
            {isFocused ? (
              <span className="material-icons-round add-icon circle-size">
                add
              </span>
            ) : (
              <span className="material-icons-outlined circle-icon circle-size">
                fiber_manual_record
              </span>
            )}
            <input
              type="text"
              id="task-input"
              placeholder="Add Task"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </form>
        </li>
        {tasks.sort(compareByBooleans).map((task) => {
          return (
            <li key={task.id} className="task">
              {task.isCompleted ? (
                <>
                  <div
                    className="task-done circle-size"
                    onClick={() => toggleCompletedTask(task)}
                  >
                    <img className="task-checker" src={circle} alt="Circle" />
                  </div>
                  <p
                    className="task-title task-title-done"
                    onClick={() => props.setActiveTask(task)}
                  >
                    {task.title}
                  </p>
                </>
              ) : task.isNew ? (
                <>
                  <div
                    className="circle-size"
                    onClick={() => toggleCompletedTask(task)}
                  >
                    <img className="task-checker" src={circle} alt="Circle" />
                  </div>
                  <p
                    className="task-title"
                    onClick={() => props.setActiveTask(task)}
                  >
                    {task.title}
                  </p>
                </>
              ) : (
                <>
                  <div
                    className="circle-size circle-not-done"
                    onClick={() => toggleCompletedTask(task)}
                  >
                    <img className="task-checker" src={circle} alt="Circle" />
                  </div>
                  <p
                    className="task-title"
                    onClick={() => props.setActiveTask(task)}
                  >
                    {task.title}
                  </p>
                </>
              )}
              <span
                className="material-icons-outlined trash-icon"
                onClick={() => removeTask(task.id)}
              >
                delete
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

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

const compareByBooleans = (a, b) => {
  return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
};

export default Todo;
