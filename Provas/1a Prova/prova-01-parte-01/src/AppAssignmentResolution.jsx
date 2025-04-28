import React, { useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Container } from './components/container/Container.jsx';
import './container.css'
import SubContainer from "./components/container/SubContainer.jsx";

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

    /*
    *  Possiveis soluões para evitar emails duplicados (questão 2)
    *
    *  Cabe ressaltar que existem outras soluões usando outros recursos.
    *  As soluções apresentadas utilizam recursos que foram tratados em aula ou 
    *  que foram tratadas no ano anterior.
    */

    /*
    //
    // Uma solução possível para evitar emails duplicados
    //
    */

    const found = entries.find(entry => entry.email === newEntry.email);
    if (found) {
      alert("Email já cadastrado: " + found.email);
      return;
    }

    /*
    //
    // Outra solução possível para evitar emails duplicados
    //
    const found = entries.some(entry => entry.email === newEntry.email);
    if (found) {
      alert("Email já cadastrado: " + newEntry.email);
      return;
    }
    */

    /*
    //
    // Outra solução possível para evitar emails duplicados
    //

    let found = false;
    for (let i=0; i < entries.length; i++) {
      if (entries[i].email === newEntry.email) {
        alert("Email já cadastrado: " + newEntry.email);
        found = true;
        return;
      }
    }

    if (found) {
      return;
    }
    */

    setEntries((prev) => [...prev, newEntry]);
    e.target.reset(); // limpa o formulário após o envio
  };
  return (
    <Container className="container">
      <SubContainer className="sub-container">
        <div className="header">
          Primeira Prova de PM (Resolução)
        </div>
      </SubContainer>
      <SubContainer className="sub-container padding20 margin20">
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
      </SubContainer>

      <SubContainer id="content" className="sub-container">
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
      </SubContainer>
    </Container>
  )
}

export default App;



