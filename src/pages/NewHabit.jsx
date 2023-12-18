import React, { useState } from "react";

const NewHabit = () => {
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState(0);
  const [priority, setPriority] = useState('low');
  const [habits, setHabits] = useState([]); // Lista för att spara vanor

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

    const newHabit = {
      title: title,
      startValue: startValue,
      priority: priority,
    };

    setHabits([...habits, newHabit]); // Lägg till den nya vanan till listan

    setTitle('');
    setStartValue(0);
    setPriority('low');
  };

  return (
    <>
      <h1>Skapa en ny vana</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Titel:
            <input type="text" value={title} onChange={handleTitleChange} placeholder="t.ex Städa" />
          </label>
          <br />
          <label>
            Startvärde för streak:
            <input type="number" value={startValue} onChange={handleStartValueChange} />
          </label>
          <br />
          <label>
            Prioritet:
            <select value={priority} onChange={handlePriorityChange}>
              <option value="low">Låg</option>
              <option value="medium">Mellan</option>
              <option value="high">Hög</option>
            </select>
          </label>
          <br />
          <button type="submit">Skapa vana</button>
        </form>
      </div>
      
      {/* Visa alla skapade vanor */}
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
    </>
  );
};

export default NewHabit;
