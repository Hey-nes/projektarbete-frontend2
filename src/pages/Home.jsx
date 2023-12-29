import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ habits }) => {
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

    const topHabits = habits
        .slice()
        .sort((a, b) => {
            const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        })
        .slice(0, 3);

    return (
        <main className="main">
            <h1>Habitify - Organize Your Life</h1>
            
            <h2>Your Habits: </h2>
            {topHabits.map((habit) => (
                <div className='habitCard' key={habit.title}>
                    <h3>{habit.title}</h3>
                    <p>Priority: {habit.priority}</p>
                </div>
            ))}
            <Link to="/habits">
                <button className='btn'>All Habits</button>
            </Link>
            
            <h3>Your Tasks: </h3>
            <ul>
                {recentTasks.map((task) => (
                    <li key={task.title}>{task.title}</li>
                ))}
            </ul>
            <Link to="/newTask">
                <button className='btn'>All Tasks</button>
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
