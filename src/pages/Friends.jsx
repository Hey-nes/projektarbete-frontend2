import { useState, useEffect } from "react";
import { sortItems } from "../utilities/sortingUtility";

const getValueForSorting = (friend, criteria) => {
  switch (criteria) {
    case "firstName":
      return friend.name.first.toLowerCase();
    case "lastName":
      return friend.name.last.toLowerCase();
    case "age":
      return friend.dob.age;
    default:
      return "";
  }
};

const Friends = () => {
  const [friends, setFriends] = useState(() => {
    const storedFriends = JSON.parse(localStorage.getItem("friends"));
    return storedFriends || [];
  });
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("");
  const [sortCriteria, setSortCriteria] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedFriends, setSortedFriends] = useState([]);

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem("friends"));
    if (storedFriends) {
      setFriends(storedFriends);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("friends", JSON.stringify(friends));
      console.log("Friends saved to local storage:", friends);
    } catch (error) {
      console.error("Error saving friends to local storage", error);
    }

    const filteredFriends = friends.filter((friend) => {
      const age = friend.dob.age;
      const genderMatch = !gender || friend.gender === gender;
      const ageMatch = (!minAge || age >= minAge) && (!maxAge || age <= maxAge);

      return genderMatch && ageMatch;
    });

    const sortedFriends = sortItems(
      filteredFriends,
      sortCriteria,
      sortOrder,
      getValueForSorting
    );
    setSortedFriends(sortedFriends);
  }, [friends, gender, minAge, maxAge, sortCriteria, sortOrder]);

  const addFriend = () => {
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((data) => {
        const newFriend = { ...data.results[0], showMore: false };
        setFriends([...friends, newFriend]);
        console.log("Updated friends:", friends);
      })
      .catch((error) => {
        console.error("Error fetching friend", error);
      });
  };

  const handleShowMore = (clickedFriend) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend === clickedFriend
          ? { ...friend, showMore: !friend.showMore }
          : friend
      )
    );
  };

  const clearFriends = () => {
    localStorage.removeItem("friends");
    setFriends([]);
  }

  return (
    <main className="main">
      <h2>Your Friends</h2>
      <h3>Filter</h3>
      <label htmlFor="gender">Gender: </label>
      <select
        name="gender"
        id="gender"
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label htmlFor="minAge">Minimum Age</label>
      <input
        type="number"
        name="minAge"
        id="minAge"
        value={minAge}
        onChange={(e) => setMinAge(e.target.value)}
      />

      <label htmlFor="maxAge">Maximum Age</label>
      <input
        type="number"
        name="maxAge"
        id="maxAge"
        value={maxAge}
        onChange={(e) => setMaxAge(e.target.value)}
      />

      <h4>Sort</h4>
      <button onClick={() => setSortCriteria("firstName")}>
        Sort by First Name
      </button>
      <button onClick={() => setSortCriteria("lastName")}>
        Sort by Last Name
      </button>
      <button onClick={() => setSortCriteria("age")}>Sort by Age</button>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Toggle Sort Order (
        {sortOrder === "asc" ? "Ascending Order" : "Descending Order"})
      </button>

      <button onClick={addFriend}>Add Friend</button>
      <button onClick={clearFriends}>Clear Friends</button>
      {sortedFriends.map((friend) => (
        <div key={friend.login.uuid}>
          <div className="friend" onClick={() => handleShowMore(friend)}>
            <h5>
              {friend.name.first} {friend.name.last}
            </h5>
            <img src={friend.picture.large} alt="profile picture" />
          </div>
          {friend.showMore && (
            <div>
              <ul>
                <li>
                  <strong>E-mail: </strong>
                  {friend.email}
                </li>
                <li>
                  <strong>Date of birth: </strong>
                  {friend.dob.date}
                </li>
                <li>
                  <strong>Gender: </strong> {friend.gender}
                </li>
              </ul>
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

export default Friends;
