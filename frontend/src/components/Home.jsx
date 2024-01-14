import React, { useState, useEffect } from 'react';
import RepoCard from './RepoCard';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const Home = () => {
  const [instance, setInstance] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    const appSettings = {
      databaseURL: "https://gitformed-ab03a-default-rtdb.asia-southeast1.firebasedatabase.app/"
    };

    const app = initializeApp(appSettings);
    const database = getDatabase(app);
    const gitformedinDB = ref(database, "user");

    const fetchData = (snapshot) => {
      if (snapshot.exists()) {
        const users = Object.entries(snapshot.val() || {});
        setInstance(users);
      } else {
        console.log('No data in the database');
      }
    };

    const errorData = (error) => {
      console.error("Error fetching data:", error);
    };

    const unsubscribe = onValue(gitformedinDB, fetchData, errorData);

    return () => unsubscribe();
  }, []);

  const handleWatchButtonClick = (index) => {
    console.log(`Watch button clicked for item at index ${index}`);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortInstance = () => {
    if (sortOption === 'repoName') {
      return instance.slice().sort((a, b) => a[1].title.localeCompare(b[1].title));
    } else if (sortOption === 'date') {
      return instance.slice().sort((a, b) => new Date(b[1].creationDateTime) - new Date(a[1].creationDateTime));
    } else if (sortOption === 'watchers') {
      return instance.slice().sort((a, b) => b[1].watchers - a[1].watchers);
    } else {
      return instance;
    }
  };

  return (
    <div className='p-5'>
      <h1 className='text-center'>Welcome to GitFormed</h1>
      <p className='text-center'>A powerful version controlling app</p>

      <div className="mb-3">
        <label htmlFor="sortOptions" className="form-label">Sort By:</label>
        <select
          id="sortOptions"
          className="form-select"
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Select Sorting Option</option>
          <option value="repoName">Repository Name (Alphabetical Order)</option>
          <option value="date">Date Wise</option>
          <option value="watchers">Number of Watchers</option>
        </select>
      </div>

      {sortInstance().slice(0, 10).map((obj, index) => (
        <div key={index} className='p-5'>
          <RepoCard
            userName={obj[1].user}
            repoName={obj[1].title}
            repoDescription={obj[1].description}
            watchers={obj[1].watchers}
            creationDateTime={obj[1].creationDateTime}
            onButtonClick={() => handleWatchButtonClick(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
