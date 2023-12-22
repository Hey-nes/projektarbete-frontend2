import { useState } from "react";

const NewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");

  const addTask = () => {
    const newTask = {
      title: title,
      description: description,
      time: time,
      type: type,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setTime("");
    setType("");
  };

  const getTask = () => {
    fetch("https://www.boredapi.com/api/activity/")
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.activity);
        setType(data.type);
      });
  };

  return (
    <main className="main">
      <h1>Create a New Task</h1>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="time">Estimated Time:</label>
      <input
        type="text"
        name="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <label htmlFor="type">Type of Task:</label>
      <select
        name="type"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="" disabled defaultValue>
          Select type of task
        </option>
        <option value="relaxation">relaxation</option>
        <option value="recreatioinal">recreatioinal</option>
        <option value="social">social</option>
        <option value="education">education</option>
        <option value="busywork">busywork</option>
        <option value="charity">charity</option>
        <option value="diy">diy</option>
        <option value="cooking">cooking</option>
        <option value="music">music</option>
      </select>
      <button onClick={addTask}>Add task</button>
      <h2>Don't Know What to Do?</h2>
      <button onClick={getTask}>Press this button to get a random task</button>
      <h3>Your tasks:</h3>
      {tasks.map((task) => (
        <ul key={task.title}>
          <li>
            <strong>Title:</strong> {task.title}
          </li>
          <li>
            <strong>Description:</strong> {task.description}
          </li>
          <li>
            <strong>Estimated time: </strong> {task.time}
          </li>
          <li>
            <strong>Type: </strong> {task.type}
          </li>
        </ul>
      ))}
    </main>
  );
};

export default NewTask;
