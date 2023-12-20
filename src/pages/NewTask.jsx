import { useState } from "react";
import "../css/NewTask.css";

const NewTask = () => {
  const [tasks, setTasks] = useState([]);
  const addTask = () => {};
  const getTask = () => {
    fetch("https://www.boredapi.com/api/activity/")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  };

  return (
    <div className="taskWrapper">
      <h1>Create a New Task</h1>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" placeholder={tasks ? tasks.activity : ""}/>
      <label htmlFor="description">Description:</label>
      <input type="text" name="description" />
      <label htmlFor="time">Estimated Time:</label>
      <input type="text" name="time" />
      <label htmlFor="type">Type of Task:</label>
      <select name="type" id="type">
        <option value="" disabled selected>
          Select type of task
        </option>
        <option value="chore">Home chore</option>
        <option value="friends">Activity with Friends</option>
        <option value="work">Work task</option>
      </select>
      <button onClick={addTask}>Add task</button>
      <h2>Don't Know What to Do?</h2>
      <button onClick={getTask}>Press this button to get a random task</button>
      <h3>Your tasks:</h3>
    </div>
  );
};

export default NewTask;
