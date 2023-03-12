import React from "react";
import "./App.scss";
import { GymTable } from "./components/Table";

function App() {
  return (
    <div className="App">
      <h1>Gym Manager</h1>
      <GymTable className="gym-table" />
    </div>
  );
}

export default App;
