import React, { useState } from "react";
import "./NewHabit.css"

const NewHabit = () => {
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState(0);
  const [priority, setPriority] = useState('Låg');
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
      setErrorMessage("Ange titel!");
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
    setPriority('Låg');
    setErrorMessage("");
  };

  return (
    <main>
      <h1>Skapa en ny vana</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form--cont">
          <label htmlFor="">
            <h2>Titel:</h2>
            <input type="text" value={title} onChange={handleTitleChange} placeholder="t.ex Städa" />
          </label>
          <label>
            <h3>Startvärde för streak:</h3>
            <input type="number" value={startValue} onChange={handleStartValueChange} />
          </label>
          <label>
            <h4>Prioritet:</h4>
            <select value={priority} onChange={handlePriorityChange}>
              <option value="Låg">Låg</option>
              <option value="Mellan">Mellan</option>
              <option value="Hög">Hög</option>
            </select>
          </label>
          </div>
          <button type="submit">Skapa vana</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      
      
      {habits.length > 0 && (
        <div>
          <h2>Alla dina vanor:</h2>
          {habits.map((habit, index) => (
            <div key={index}>
              <h3>Vana {index + 1}:</h3>
              <p>Titel: {habit.title}</p>
              <p>Startvärde för streak: {habit.startValue}</p>
              <p>Prioritet: {habit.priority}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default NewHabit;
