import React, { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import Tasks from "./pages/Tasks";
import NewHabit from "./pages/NewHabit";
import Habits from "./pages/Habits";
import Friends from "./pages/Friends";

const App = () => {
  const [habits, setHabits] = useState([]); 

  return (
    <>
      <nav>
        <ul>
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/newhabit">New Habit</Link>
          </li>
          <li>
            <Link to="/habits">Habits</Link>
          </li>
          <li>
            <Link to="/friends">Friends</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newtask" element={<NewTask />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/newhabit" element={<NewHabit habits={habits} setHabits={setHabits} />} />
        <Route path="/habits" element={<Habits habits={habits} setHabits={setHabits} />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
};

export default App;

