import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";
import MainQuiz from "./MainQuiz";


function App() {
  return (
     
    <div className="App">
      <MainQuiz />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);