import { useState } from "react";
import "../css/Friends.css"

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [gender, setGender] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const addFriend = () => {
    fetch("https://randomuser.me/api")
      .then((res) => res.json())
      .then((data) => {
        const newFriend = { ...data.results[0], showMore: false };
        setFriends([...friends, newFriend]);
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

  const filterFriends = () => {
    return friends.filter((friend) => {
      const age = friend.dob.age;
      const genderMatch = !gender || friend.gender === gender;
      const ageMatch = (!minAge || age >= minAge) && (!maxAge || age <= maxAge);

      return genderMatch && ageMatch;
    });
  };

  const sortFriends = (friends, criteria, order) => {
    const sortedFriends = [...friends];

    sortedFriends.sort((a, b) => {
      const valueA = getValueForSorting(a, criteria);
      const valueB = getValueForSorting(b, criteria);

      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedFriends;
  };

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

  return (
    <main className="main">
      <h1>My friends</h1>
      <h2>Filter</h2>
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

      <h2>Sort</h2>
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
      {sortFriends(filterFriends(), sortCriteria, sortOrder).map((friend) => (
        <div key={friend.login.uuid}>
          <div className="friend" onClick={() => handleShowMore(friend)}>
            <h3>
              {friend.name.first} {friend.name.last}
            </h3>
            <img src={friend.picture.large} alt="profile picture" />
          </div>
          {friend.showMore && (
            <div className="friendInfo">
              <p>E-mail: {friend.email}</p>
              <p>Date of birth: {friend.dob.date}</p>
              <p>Gender: {friend.gender}</p>
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

export default Friends;
