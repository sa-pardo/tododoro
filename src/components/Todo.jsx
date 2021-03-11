import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Circle from "../assets/circulo.svg";

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
    <>
      <div className="Todo">
        <h2 className="todo-header">To-Do</h2>
        <ul className="todo-list">
          <li className="task">
            <TaskInput
              addTask={addTask}
              isFocusedState={[isFocused, setIsFocused]}
            />
          </li>
          {tasks.sort(compareByBooleans).map((task) => {
            return (
              <li key={task.id} className="task">
                <Task
                  task={task}
                  toggleCompletedTask={toggleCompletedTask}
                  setActiveTask={props.setActiveTask}
                  removeTask={removeTask}
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* <span className="right-credits">Sebastian Pardo</span> */}
    </>
  );
}

const TaskInput = (props) => {
  const [isFocused, setIsFocused] = props.isFocusedState;
  return (
    <form className="todo-form" onSubmit={props.addTask}>
      <span
        className={`circle-size center-flex ${
          isFocused
            ? "material-icons-round add-icon"
            : "material-icons-outlined circle-icon"
        }`}
      >
        {isFocused ? "add" : "fiber_manual_record"}
      </span>
      <input
        type="text"
        className="task-input no-border"
        placeholder="Add Task"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </form>
  );
};

const Task = (props) => {
  const task = props.task;
  return (
    <>
      <picture
        className={`circle-size ${
          task.isCompleted ? "task-done" : task.isNew ? "" : "task-not-done"
        }`}
      >
        <img
          className="pointer no-select"
          onClick={() => props.toggleCompletedTask(task)}
          src={Circle}
          alt="Circle"
        />
      </picture>
      <p
        className={`task-title ${task.isCompleted && "task-title-done"}`}
        onClick={() => props.setActiveTask(task)}
      >
        {task.title}
      </p>
      <span
        className="material-icons-outlined pointer no-select trash-icon"
        onClick={() => props.removeTask(task.id)}
      >
        delete
      </span>
    </>
  );
};

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
