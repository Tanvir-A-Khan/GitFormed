import React, { useState } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { useNavigate } from 'react-router-dom';

const CreateRepo = () => {
  const navigate = useNavigate();
  const [repoTitle, setRepoTitle] = useState('');
  const [repoDescription, setRepoDescription] = useState('');

  const appSettings = {
    databaseURL: "https://gitformed-ab03a-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };

  const app = initializeApp(appSettings);
  const database = getDatabase(app);
  const gitformedinDB = ref(database, "user");

  const handleTitleChange = (e) => {
    setRepoTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setRepoDescription(e.target.value);
  };

  const handleWatchButtonClick = () => {
    if (repoTitle !== "" && repoDescription !== "") {
      const currentDate = new Date().toLocaleString();
      const ob = {
        'user': 'user', // Replace with the actual username
        'title': repoTitle,
        'description': repoDescription,
        'watchers': 0, // You may initialize this with the actual number of watchers
        'creationDateTime': currentDate
      };

      push(gitformedinDB, ob);

      navigate('/');
    }
  };

  return (
    <div className="container mt-5 p-5 rounded w-50 m-auto">
      <form>
        <div className="mb-3">
          <label htmlFor="repoTitle" className="form-label">Repo Title</label>
          <input
            type="text"
            className="form-control"
            id="repoTitle"
            value={repoTitle}
            onChange={handleTitleChange}
            placeholder="Enter Repo Title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="repoDescription" className="form-label">Repo Description</label>
          <textarea
            className="form-control"
            id="repoDescription"
            value={repoDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter Repo Description"
          ></textarea>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleWatchButtonClick}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRepo;
