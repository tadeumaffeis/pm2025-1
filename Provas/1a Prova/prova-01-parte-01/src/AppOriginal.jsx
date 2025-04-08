import React, { useState } from "react";
import './container.css'


function App() {
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // impede reload da página

    const formData = new FormData(e.target);
    const newEntry = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    setEntries((prev) => [...prev, newEntry]);
    e.target.reset(); // limpa o formulário após o envio
  };

  return (
    <>
      <div className="container">

        <div className="sub-container">
          <div className="header">
            Primeira Prova de PM (Versão Original)
          </div>
        </div>
        <div className="sub-container padding20 margin20">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>

            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />
            </div>

            <input type="submit" value="Submit" className="submit-btn" />
          </form>
        </div>

        <div id="content" className="sub-container">
          {entries.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Password</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{entry.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{entry.email}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{entry.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default App;



