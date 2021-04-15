import React, { useState } from 'react';
import GithubImage from './github-mark.png'
import './App.css';

function App() {

  const [search, setSearch] = useState(''); //State hook
  const [userData, setUserData] = useState(); //State hook

  const handleSubmit = (event) => {
      event.preventDefault(); // elimando o refresh da pag
      fetch(`https://api.github.com/users/${search}`) //cliente http
        .then(Response => Response.json()) //convertendo para json
        .then(userResponse => setUserData(userResponse));
      
  }

  console.log(userData);

  const handleChange = (event) => {
      setSearch(event.target.value);

  }

  return (
       
    <div className="container text-center">
      <h1 className="py-5 text-uppercase">Search profile Github </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <div className="input-group">
            <input type="text" className="form-control"
            required value={search} onChange={handleChange}   />
            <span className="input-group-btn">
            <button type="submit" class="btn btn-success">
                 Search
              </button>
            </span>
            </div>
        </div>
      </form>

      <div className="py-3">
        {!userData &&(
          <img src = {GithubImage} className="responsive rounded-circle" 
          alt="" height="200px"/>
        )}

    {userData && (
        <div>
        <img src = {userData.avatar_url} className="responsive rounded-circle" 
          alt="" height="200px"/>
       
       <h1 className="pt-3">
         <a href={userData.html_url} target="_new">
           {userData.name}
           </a>
       </h1>
       <h3>{userData.location}</h3>
       <h3>{userData.bio}</h3>
       <p>
          {userData.blog}
       </p>
        </div>
           )}      
      </div>
    </div>

  );
}

export default App;
