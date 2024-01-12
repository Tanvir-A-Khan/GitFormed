import React, { useState, useEffect } from 'react';
import RepoCard from './RepoCard';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const Home = () => {
  const [instance, setInstance] = useState([]);

  useEffect(() => {
    const appSettings = {
      databaseURL: "https://gitformed-ab03a-default-rtdb.asia-southeast1.firebasedatabase.app/"
    };

    const app = initializeApp(appSettings);
    const database = getDatabase(app);
    const gitformedinDB = ref(database, "user");

    const fetchData = (snapshot) => {
      if (snapshot.exists()) {
        const users = Object.entries(snapshot.val());
        setInstance(users);
        users.forEach((item) => {
          console.log(item[1].title);
          console.log(item[1].user);
          console.log(item[1].description);
        });
      } else {
        console.log('No data in the database');
      }
    };

    const errorData = (error) => {
      console.error("Error fetching data:", error);
    };

    // Set up the listener when the component mounts
    const unsubscribe = onValue(gitformedinDB, fetchData, errorData);

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <div className=' p-5'>
      <h1 className='text-center'>Welcome to GitFormed</h1>
      <p className='text-center'>A powerful version controlling app</p>

      {instance.map((obj, index) => (
        <div key={index} className='p-5'>
          <RepoCard
            userName={obj[1].user}
            repoName={obj[1].title}
            repoDescription={obj[1].description}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
