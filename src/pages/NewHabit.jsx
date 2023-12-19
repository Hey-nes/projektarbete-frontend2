import React, { useState } from "react";
import "./NewHabit.css"

const NewHabit = () => {
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState(0);
  const [priority, setPriority] = useState('Low');
  const [habits, setHabits] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStartValueChange = (e) => {
    setStartValue(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setErrorMessage("Enter a title!");
      return;
    }

    const newHabit = {
      title: title,
      startValue: startValue,
      priority: priority,
    };

    setHabits([...habits, newHabit]);

    setTitle('');
    setStartValue(0);
    setPriority('Low');
    setErrorMessage("");
  };

  return (
    <main>
      <h1>Create a new habit</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form--cont">
          <label htmlFor="">
            <h2>Title:</h2>
            <input type="text" value={title} onChange={handleTitleChange} placeholder="Clean room etc." />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </label>
          <label>
            <h3>Startvalue for streak:</h3>
            <input type="number" value={startValue} onChange={handleStartValueChange} />
          </label>
          <label>
            <h4>Priority:</h4>
            <select value={priority} onChange={handlePriorityChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          </div>
          <button type="submit">Create new habit</button>
        </form>
      </div>
      
      
      {habits.length > 0 && (
        <div>
          <h2>All your habits:</h2>
          {habits.map((habit, index) => (
            <div key={index}>
              <h3>Habit {index + 1}:</h3>
              <p>Title: {habit.title}</p>
              <p>Startvalue for streak: {habit.startValue}</p>
              <p>Priority: {habit.priority}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default NewHabit;
