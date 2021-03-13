import React, { useState } from "react";
import Circle from "../assets/circulo.svg";

function Todo(props) {
  const tasks = props.tasks;
  const [isFocused, setIsFocused] = useState(false);
  const { addTask, removeTask, toggleCompletedTask } = props.modifyTask;

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

export const Task = (props) => {
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
        key={task.title + task.isCompleted}
        className={`task-title ${
          task.isCompleted
            ? " task-title-done"
            : task.isNew
            ? ""
            : "task-title-not-done"
        }`}
        onClick={() => {
          if (!task.isCompleted) {
            props.setActiveTask(task);
          }
        }}
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

export const ActiveTask = (props) => {
  const task = props.task;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
      <p className={`task-title${task.isCompleted ? " task-title-done" : ""}`}>
        {task.title}
      </p>
    </div>
  );
};

const compareByBooleans = (a, b) => {
  return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
};

export default Todo;
