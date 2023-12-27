import React, { useState, useEffect } from "react";
import { Link, json } from "react-router-dom";

const Home = () => {
  const [recentFriends, setRecentFriends] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const storedFriends = localStorage.getItem("friends")
      ? JSON.parse(localStorage.getItem("friends"))
      : [];
    const lastFiveFriends = storedFriends.slice(-5);
    setRecentFriends(lastFiveFriends);

    const storedTasks = localStorage.getItem("incompletedTasks")
      ? JSON.parse(localStorage.getItem("incompletedTasks"))
      : [];
    const lastThreeTasks = storedTasks.slice(-3);
    setRecentTasks(lastThreeTasks);
  }, []);

  return (
    <main className="main">
      <h1>Habitify - Organize Your Life</h1>
      <h2>Your Habits: </h2>
      <Link to="/habits">
        <button>All Habits</button>
      </Link>
      <h3>Your Tasks: </h3>
      <ul>
        {recentTasks.map((task) => (
          <li key={task.title}>{task.title}</li>
        ))}
      </ul>
      <Link to="/newTask">
        <button>All Tasks</button>
      </Link>
      <h4>Last 5 Friends Added: </h4>
      <ul>
        {recentFriends.map((friend) => (
          <li key={friend.login.uuid}>
            {friend.name.first} {friend.name.last}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
