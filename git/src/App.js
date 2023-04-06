import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === '') {
      setError('Dont leave Empty!!!!!');
      setUsers([]);
    } else {
      setError('');

      fetch(` https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then(data => {
          setUsers(data.items);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>GitHub Profile Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <a href={user.html_url}>{user.login}</a>
            <img src={user.avatar_url} alt={`${user.login} avatar`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
