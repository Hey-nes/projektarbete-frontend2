import React, { useState } from 'react';

const Habits = ({ habits, setHabits }) => {
    const [sortKey, setSortKey] = useState('');
    const [isAscending, setIsAscending] = useState(true);

    const handleStreakChange = (selectedHabit, change) => {
        const updatedHabits = habits.map((habit) => {
            if (habit === selectedHabit) {
                return { ...habit, streak: Math.max(0, habit.streak + change) };
            }
            return habit;
        });
        setHabits(updatedHabits);
    };

    const toggleSortDirection = () => {
        setIsAscending(!isAscending);
    };

    const sortHabits = (habits) => {
        if (sortKey === 'streak') {
            return [...habits].sort((a, b) => isAscending ? a.streak - b.streak : b.streak - a.streak);
        } else if (sortKey === 'priority') {
            const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return [...habits].sort((a, b) => isAscending 
                ? priorityOrder[a.priority] - priorityOrder[b.priority] 
                : priorityOrder[b.priority] - priorityOrder[a.priority]);
        }
        return habits;
    };

    const sortedHabits = sortHabits(habits);

    return (
        <div>
            <h1>Your Habits</h1>
            <div>
                <button onClick={() => setSortKey('streak')}>Sort by Streak</button>
                <button onClick={() => setSortKey('priority')}>Sort by Priority</button>
                <button onClick={toggleSortDirection}>
                    {isAscending ? 'Sort Ascending' : 'Sort Descending'}
                </button>
            </div>
            {sortedHabits.map((habit) => (
                <div key={habit.title}>
                    <h3>{habit.title}</h3>
                    <p>Streak: {habit.streak}</p>
                    <p>Priority: {habit.priority}</p>
                    <button onClick={() => handleStreakChange(habit, -1)} disabled={habit.streak <= 0}>Decrease Streak</button>
                    <button onClick={() => handleStreakChange(habit, 1)}>Increase Streak</button>
                    <button onClick={() => handleStreakChange(habit, -habit.streak)}>Reset Streak</button>
                </div>
            ))}
        </div>
    );
};

export default Habits;
