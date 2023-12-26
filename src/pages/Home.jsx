import React, { useState, useEffect } from "react";
import { Link, json } from "react-router-dom";

const Home = () => {
  const [recentFriends, setRecentFriends] = useState([]);

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
    const lastFiveFriends = storedFriends.slice(-5);
    setRecentFriends(lastFiveFriends);
  }, []);

  return (
    <main className="main">
      <h1>Habitify - Organize Your Life</h1>
      <h2>Your Habits: </h2>
      <Link to="/newHabit">
        <button>All Habits</button>
      </Link>
      <h3>Your Tasks: </h3>
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
