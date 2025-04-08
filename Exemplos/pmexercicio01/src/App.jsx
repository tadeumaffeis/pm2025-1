import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Container from "./components/container/Container.jsx";
import Course from "./components/forms/course/Course.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container width="200px" height="100px">
      <Course title="Curso" />
    </Container>
  );
}

export default App;
