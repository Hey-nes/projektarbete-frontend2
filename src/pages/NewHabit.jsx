import React, { useState } from "react";

const NewHabit = ({ habits, setHabits }) => {
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState(0);
  const [priority, setPriority] = useState('Low');
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
      startValue: parseInt(startValue),
      priority: priority,
      streak: parseInt(startValue),
    };

    setHabits([...habits, newHabit]);

    setTitle('');
    setStartValue(0);
    setPriority('Low');
    setErrorMessage("");
  };

  return (
    <main className="main">
      <h1>Create a new habit</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form--cont">
            <label>
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
                <option value="High">High</option>
              </select>
            </label>
          </div>
          <button className="btn" type="submit">Create new habit</button>
        </form>
      </div>
    </main>
  );
};

export default NewHabit;
