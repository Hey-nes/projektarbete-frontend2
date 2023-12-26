import { useState, useEffect } from "react";
import { sortItems } from "../utilities/sortingUtility";

const getValueForSorting = (task, criteria) => {
  switch (criteria) {
    case "title":
      return task.title.toLowerCase();
    case "time":
      return task.time.toLowerCase();
    default:
      return "";
  }
};

const Tasks = ({ data, onDelete, onEdit }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedIncompletedTasks, setSortedIncompletedTasks] = useState([]);

  useEffect(() => {
    const tasksToSort = data.filter((task) => !completedTasks.includes(task));
    const filteredTasks = typeFilter
      ? tasksToSort.filter((task) => task.type === typeFilter)
      : tasksToSort;

    const sortedTasks = sortItems(
      filteredTasks,
      sortCriteria,
      sortOrder,
      getValueForSorting
    );

    setSortedIncompletedTasks(sortedTasks);
  }, [data, completedTasks, sortCriteria, sortOrder, typeFilter]);

  const handleToggleCompletion = (task) => {
    if (task.completed) {
      setCompletedTasks(completedTasks.filter((t) => t !== task));
      setIncompletedTasks([...incompletedTasks, task]);
    } else {
      setCompletedTasks([...completedTasks, task]);
      setIncompletedTasks(incompletedTasks.filter((t) => t !== task));
    }
  };

  const handleToggleUnfinished = (task) => {
    setCompletedTasks(completedTasks.filter((t) => t !== task));
    setIncompletedTasks([...incompletedTasks, task]);
  };

  const handleDelete = (task) => {
    onDelete(task);
    setCompletedTasks(completedTasks.filter((t) => t !== task));
  };

  const handleEdit = (task) => {
    onEdit(task);
    setIncompletedTasks((prevIncompletedTasks) =>
      prevIncompletedTasks.filter((t) => t !== task)
    );
  };

  return (
    <div>
      <label htmlFor="type">Filter by type: </label>
      <select
        name="type"
        id="type"
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="relaxation">relaxation</option>
        <option value="recreational">recreational</option>
        <option value="social">social</option>
        <option value="education">education</option>
        <option value="busywork">busywork</option>
        <option value="charity">charity</option>
        <option value="diy">diy</option>
        <option value="cooking">cooking</option>
        <option value="music">music</option>
      </select>
      <hr></hr>
      <button onClick={() => setSortCriteria("title")}>Sort by Title</button>
      <button onClick={() => setSortCriteria("time")}>Sort by Time</button>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Toggle Sort Order (
        {sortOrder === "asc" ? "Ascending Order" : "Descending Order"})
      </button>
      <ul>
        {sortedIncompletedTasks.map((task) => (
          <div key={task.title}>
            <li>
              <strong>Title: </strong>
              {task.title}
            </li>
            <li>
              <strong>Description: </strong>
              {task.description}
            </li>
            <li>
              <strong>Estimated time to complete: </strong>
              {task.time} hour(s)
            </li>
            <li>
              <strong>Task type: </strong>
              {task.type}
            </li>
            <button onClick={() => handleToggleCompletion(task)}>
              {task.completed ? "Mark as unfinished" : "Mark as finished"}
            </button>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task)}>Delete</button>
          </div>
        ))}
      </ul>
      {completedTasks.length > 0 && (
        <div>
          <h3>Completed tasks:</h3>
          <ul>
            {completedTasks.map((task) => (
              <div key={task.title}>
                <li>
                  <strong>{task.title}</strong>
                </li>
                <button onClick={() => handleToggleUnfinished(task)}>
                  Mark as unfinished
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tasks;
