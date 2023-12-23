import { useState } from "react";

const Tasks = ({ data, onDelete, onEdit }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);

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
      <ul>
        {data
          .filter((task) => !completedTasks.includes(task))
          .map((task) => (
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
                {task.time} hour
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
                  <strong>Title: </strong>
                  {task.title}
                </li>
                <li>
                  <strong>Description: </strong>
                  {task.description}
                </li>
                <li>
                  <strong>Estimated time to complete: </strong>
                  {task.time} hour
                </li>
                <li>
                  <strong>Task type: </strong>
                  {task.type}
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
